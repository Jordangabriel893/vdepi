import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-atualizar-tipo-lote',
  templateUrl: './atualizar-tipo-lote.component.html',
  styleUrls: ['./atualizar-tipo-lote.component.scss']
})
export class AtualizarTipoLoteComponent implements OnInit {

  formulario: FormGroup;
  id;
  categorias: [];
  regras: [];

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.restangular
      .all('TipoLote')
      .get(this.id)
      .subscribe((dados) => {
        this.updateForm(dados.data);
      });
  }

  onSubmit() {
    this.restangular
      .all('tipoLote')
      .customPUT(this.formulario.value, this.id)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Tipo de lote atualizado com sucesso'
          );
          this.router.navigate(['/tipo-lote']);
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao criar o tipo de lote!'
          );

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }

  getCategorias() {
    this.restangular.one('categoria').get().subscribe((res) => {
      this.categorias = res.data;
    });
  }

  getRegras() {
    this.restangular.one('habilitacao/regras').get().subscribe((res) => {
      this.regras = res.data;
    });
  }


  updateForm(dados) {
    this.getCategorias();
    this.getRegras();

    this.formulario = this.formBuilder.group({
      descricao: [dados.descricao, Validators.required],
      categoriaId: [dados.categoriaId, Validators.required],
      regraHabilitacaoId: [dados.regraHabilitacaoId, Validators.required],
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
