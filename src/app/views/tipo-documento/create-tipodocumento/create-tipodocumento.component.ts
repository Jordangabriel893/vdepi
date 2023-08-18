import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { Restangular } from 'ngx-restangular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-tipodocumento',
  templateUrl: './create-tipodocumento.component.html',
  styleUrls: ['./create-tipodocumento.component.scss'],
})
export class CreateTipodocumentoComponent implements OnInit {
  formulario: FormGroup;
  perfis = [];
  fieldTextType: boolean;
  hasAssinatura = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private cepService: ConsultaCepService
  ) {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      possuiAssinatura: [false],
      perfis: [[]],
    });
  }

  ngOnInit() {
    this.restangular
      .one('usuario/perfis')
      .get()
      .subscribe((resp: any) => {
        this.perfis = resp.data;
      });
  }

  onSubmit() {
    if (!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      });
      this.notifierService.notify(
        'error',
        'Preencha todos os campos obrigatórios'
      );
      return;
    }
    if (
      this.formulario.value.possuiAssinatura == true &&
      this.formulario.value.perfis.length < 1
    ) {
      this.notifierService.notify('error', 'Selecione um assinante!');
      return;
    }
    this.restangular
      .all('/TipoDocumentoLote')
      .post(this.formulario.value)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Tipo de documento criado com sucesso'
          );
          this.router.navigateByUrl('/tipodocumento');
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao criar o tipo de documento!'
          );

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }
  changeAssinatura() {
    this.hasAssinatura = this.formulario.value.possuiAssinatura;
  }
  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
    };
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
