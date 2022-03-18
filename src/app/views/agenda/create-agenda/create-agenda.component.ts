import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-create-agenda',
  templateUrl: './create-agenda.component.html',
  styleUrls: ['./create-agenda.component.scss']
})
export class CreateAgendaComponent implements OnInit {
  empresas: any;
  formulario:FormGroup;
  status: any;
  minDate;
  notificacoes;
  tiposAgenda;
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService
  ) {
    localeService.use('pt-br');
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
   }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      agendaNotificacaoId: [null, Validators.required],
      notificacaoId: [null, Validators.required],
      tipoAgendaId: [null, Validators.required],
      dataExecucao: [null, Validators.required],
      dataEncerramento: [null, Validators.required],
      dataUltimaExecucao: [null, Validators.required],
      intervaloMinutos: [null, Validators.required],
      dataCadastro: [null, Validators.required],
    })
    this.restangular.one('marketing/notificacao').get().subscribe(
      dados =>{
        this.notificacoes= dados.data
        console.log(this.notificacoes)
      }
    )
    this.restangular.one('marketing/tipoAgendaNotificacao').get().subscribe(
      dados =>{
        this.tiposAgenda= dados.data
        console.log(this.tiposAgenda)
      }
    )

  }
  onSubmit(){
    this.restangular.all('marketing/agendaNotificacao').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Agenda criada com sucesso');
      this.router.navigate(['/listacontatos']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar agenda!');

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
