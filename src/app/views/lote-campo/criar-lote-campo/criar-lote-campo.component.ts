import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-criar-lote-campo',
  templateUrl: './criar-lote-campo.component.html',
  styleUrls: ['./criar-lote-campo.component.scss'],
})
export class CriarLoteCampoComponent implements OnInit {
  formulario: FormGroup;
  categorias: [];
  categoriasAgrupadas: any[] = [];
  tipos: [];
  tiposValidacao: [];

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      tipoCampoId: [null, Validators.required],
      categoriaId: [null, Validators.required],
      descricao: [null, Validators.required],
      tamanho: [null, Validators.required],
      formatacao: [null],
      tipoCampoValidacaoId: [null, []],
      ordemExibicao: [0],
      destaqueSite: [false],
    });
  }

  ngOnInit() {
    this.getCategorias();
    this.getTipos();
    this.getTiposValidacao();
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

  onSubmit() {
    this.restangular
      .all('loteCampo')
      .post(this.formulario.value)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Tipo de lote criado com sucesso'
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

  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) };
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
