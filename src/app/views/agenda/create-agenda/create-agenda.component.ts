import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-agenda',
  templateUrl: './create-agenda.component.html',
  styleUrls: ['./create-agenda.component.scss']
})
export class CreateAgendaComponent implements OnInit, OnDestroy {
  empresas: any;
  formulario:FormGroup;
  status: any;
  minDate;
  notificacoes;
  tiposAgenda;
  agendaNotificacao;
  sub: Subscription[] = [];
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
      notificacaoId: [null, Validators.required],
      tipoAgendaId: [null, Validators.required],
      intervaloMinutos: [null],
      dataExecucao:[null, Validators.required],
      dataEncerramento:[null],
    })
    this.sub.push(
      this.restangular.one('marketing/notificacao').get().subscribe(
        dados =>{
          this.notificacoes= dados.data
        }
      )
    )
    this.sub.push(
      this.restangular.one('marketing/AgendaNotificacao').get().subscribe(
      dados =>{
        this.agendaNotificacao = dados.data
      }
    ))
    this.sub.push(
      this.restangular.one('marketing/tipoAgendaNotificacao').get().subscribe(
        dados =>{
          this.tiposAgenda= dados.data
        }
      )
    )

  }
  onSubmit(){
      this.restangular.all('marketing/agendaNotificacao').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Agenda criada com sucesso');
      this.router.navigate(['/agenda']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar agenda!');

        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      })
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
  ngOnDestroy(): void {
    this.sub.forEach(s => {s.unsubscribe()
    console.log('foi')})
  }
}
