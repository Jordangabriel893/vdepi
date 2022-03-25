import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-create-tipomeionotificacao',
  templateUrl: './create-tipomeionotificacao.component.html',
  styleUrls: ['./create-tipomeionotificacao.component.scss']
})
export class CreateTipomeionotificacaoComponent implements OnInit {
  empresas: any;
  formulario:FormGroup;
  status: any;

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService
  ) {

   }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      descricao: [null, Validators.required],

    })
  }
  onSubmit(){
    this.restangular.all('marketing/tipoMeioNotificacao').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Tipo meio notificação criada com sucesso');
      this.router.navigate(['/tipomeionotificao']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar tipo meio notificação!');

        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
