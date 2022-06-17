import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import * as moment from 'moment';

@Component({
  selector: 'app-update-agenda',
  templateUrl: './update-agenda.component.html',
  styleUrls: ['./update-agenda.component.scss']
})
export class UpdateAgendaComponent implements OnInit {
  empresas: any;
  formulario:FormGroup;
  status: any;
  minDate;
  notificacoes;
  tiposAgenda;
  id;
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
  ) {
    localeService.use('pt-br');
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.formulario = this.formBuilder.group({
      agendaNotificacaoId: [this.id, Validators.required],
      notificacaoId: [null, Validators.required],
      tipoAgendaId: [null, Validators.required],
      dataExecucao: [null, Validators.required],
      dataEncerramento: [null],
      dataUltimaExecucao: [null],
      intervaloMinutos: [null],
      dataCadastro: [null],
    })
    this.restangular.all('marketing/AgendaNotificacao').get(this.id).subscribe(dados => {
      this.updateForm(dados.data);
    }

    )
    this.restangular.one('marketing/notificacao').get().subscribe(
      dados =>{
        this.notificacoes= dados.data

      }
    )
    this.restangular.one('marketing/tipoAgendaNotificacao').get().subscribe(
      dados =>{
        this.tiposAgenda= dados.data
      }
    )

  }
  updateForm(dados) {
    this.formulario.patchValue({
      agendaNotificacaoId: this.id,
      notificacaoId: dados.notificacaoId,
      tipoAgendaId: dados.tipoAgendaId,
      dataExecucao: moment.utc(dados.dataExecucao).local().toDate(),
      dataEncerramento: moment.utc(dados.dataEncerramento).local().toDate(),
      dataUltimaExecucao: moment.utc(dados.dataUltimaExecucao).local().toDate(),
      intervaloMinutos:dados.intervaloMinutos,
      dataCadastro: dados.dataCadastro,
    })
  }
  onSubmit(){
    // console.log(this.formulario.value)
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    this.restangular.all('marketing/AgendaNotificacao').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Agenda editada com sucesso');
      this.router.navigate(['/agenda']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar agenda!');
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
