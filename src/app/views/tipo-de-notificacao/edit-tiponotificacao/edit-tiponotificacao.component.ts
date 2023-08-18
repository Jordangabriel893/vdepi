import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-edit-tiponotificacao',
  templateUrl: './edit-tiponotificacao.component.html',
  styleUrls: ['./edit-tiponotificacao.component.scss']
})
export class EditTiponotificacaoComponent implements OnInit {
  id;
  empresas: any;
  formulario: FormGroup;
  status: any;

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
  ) {

   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.formulario = this.formBuilder.group({
      tipoNotificacaoId: [this.id],
      descricao: [null, Validators.required],

    })
    this.restangular.all('marketing/TipoNotificacao').get(this.id).subscribe(dados => {
      this.updateForm(dados.data);
    }

    )

  }
  onSubmit() {
    if (!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    this.restangular.all('marketing/TipoNotificacao').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Tipo de notificação editado com sucesso');
      this.router.navigate(['/tiponotificacao']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar tipo de notificação!');
        Object.keys(this.formulario.controls).forEach((campo) => {
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  verificaValidTouched(campo) {
    // return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }

  updateForm(dados) {

    this.formulario.patchValue({
      descricao: dados.descricao,
      tipoNotificacaoId: dados.tipoNotificacaoId
    })
  }
  desativar() {
    this.restangular.all('marketing/TipoNotificacao/Desativar').customPUT( '', this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Tipo de notificação desativada com sucesso');
      this.router.navigate(['/tiponotificacao']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao desativar tipo de notificação!');

      });
  }
}
