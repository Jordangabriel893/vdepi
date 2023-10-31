import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-atualizar-lote-campo',
  templateUrl: './atualizar-lote-campo.component.html',
  styleUrls: ['./atualizar-lote-campo.component.scss'],
})
export class AtualizarLoteCampoComponent implements OnInit {
  formulario: FormGroup;
  id;
  categorias: [];
  tipos: [];
  tiposValidacao: [];

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.restangular
      .all('loteCampo')
      .get(this.id)
      .subscribe((dados) => {
        //console.log(dados.data);
        this.updateForm(dados.data);
      });
  }

  onSubmit() {
    this.restangular
      .all('loteCampo')
      .customPUT(this.formulario.value, this.id)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Tipo de lote atualizado com sucesso'
          );
          this.router.navigate(['/lote-campo']);
        },
        (error) => {
          this.notifierService.notify('error', 'Erro ao criar o tipo de lote!');

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }

  getCategorias() {
    this.restangular
      .one('categoria')
      .get()
      .subscribe((res) => {
        this.categorias = res.data
          .filter((x) => x.categoriaPaiId === null)
          .sort((a, b) => a.descricao.localeCompare(b.descricao));
      });
  }

  getTipos() {
    this.restangular
      .one('loteCampo/tipoCampo')
      .get()
      .subscribe((res) => {
        this.tipos = res.data;
      });
  }

  getTiposValidacao() {
    this.restangular
      .one('loteCampo/validacoes')
      .get()
      .subscribe((res) => {
        this.tiposValidacao = res.data;
      });
  }

  updateForm(dados) {
    this.getCategorias();
    this.getTipos();
    this.getTiposValidacao();

    this.formulario = this.formBuilder.group({
      tipoCampoId: [dados.tipoCampoId, Validators.required],
      categoriaId: [dados.categoriaId, Validators.required],
      descricao: [dados.descricao, Validators.required],
      tamanho: [dados.tamanho, Validators.required],
      formatacao: [dados.formatacao],
      tipoCampoValidacaoId: [dados.tipoCampoValidacaoId, []],
      ordemExibicao: [dados.orcemExibicao || 0],
      destaqueSite: [dados.destaqueSite],
    });
  }

  verificaValidTouched(campo) {
    if (this.formulario.value) {
      return (
        !this.formulario.get(campo).valid && this.formulario.get(campo).touched
      );
    }
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) };
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
