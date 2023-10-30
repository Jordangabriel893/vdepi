import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-atualizar-tipo-foto',
  templateUrl: './atualizar-tipo-foto.component.html',
  styleUrls: ['./atualizar-tipo-foto.component.scss'],
})
export class AtualizarTipoFotoComponent implements OnInit {
  formulario: FormGroup;
  id;
  categorias: any;

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
      .all('tipoFoto')
      .get(this.id)
      .subscribe((dados) => {
        this.updateForm(dados.data);
      });

    this.getCategorias();
  }

  getCategorias() {
    this.restangular
      .one('categoria')
      .get()
      .subscribe((res) => {
        this.categorias = res.data
          .filter((categoria) => categoria.categoriaPaiId != null)
          .map((x) => {
            return {
              categoriaId: x.categoriaId,
              descricao: x.descricao,
              categoriaPai: x.categoriaPai.descricao,
            };
          });
      });
  }

  onSubmit() {
    this.restangular
      .all('tipoFoto')
      .customPUT(this.formulario.value, this.id)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Tipo de foto atualizado com sucesso'
          );
          this.router.navigate(['/tipo-foto']);
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao atualizar o tipo de foto!'
          );

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }

  updateForm(dados) {
    this.formulario = this.formBuilder.group({
      descricao: [dados.descricao, Validators.required],
      visivelSite: [dados.visivelSite],
      obrigatorio: [dados.obrigatorio],
      vistoria: [dados.vistoria],
      categorias: [
        dados.categorias.map((x) => x.categoriaId),
        Validators.required,
      ],
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
