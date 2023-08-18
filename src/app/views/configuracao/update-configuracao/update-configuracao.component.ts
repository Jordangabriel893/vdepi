import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-update-configuracao',
  templateUrl: './update-configuracao.component.html',
  styleUrls: ['./update-configuracao.component.scss']
})
export class UpdateConfiguracaoComponent implements OnInit {
  empresas: any;
  formulario: FormGroup;
  status: any;
  minDate;
  notificacoes;
  tiposAgenda;
  agendaNotificacao;
  sub: Subscription[] = [];
  id: any;
  loading = false;
  dataLote: any;
  lotes: any;
  lotesBase = [];
  localLotes = [];
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
  ) {
    localeService.use('pt-br');
    this.id = this.route.snapshot.params['id']
   }

  ngOnInit() {
    this.sub.push(
      this.restangular.one('local').get().subscribe(
        dados => {
          this.localLotes = dados.data
        }
      )
    )
    this.sub.push( this.restangular.all('agendamento/configuracao').get(this.id).subscribe(dados => {
      const config = dados.data
        this.formulario = this.formBuilder.group({
          configuracaoAgendamentoId: [config.configuracaoAgendamentoId],
          diaSemana: [config.diaSemana, Validators.required],
          horaInicio: [moment.utc(config.horaInicio).local().toDate(), Validators.required],
          horaFinal: [moment.utc(config.horaFinal).local().toDate(), Validators.required],
          limiteDia: [config.limiteDia, Validators.required],
          localLoteId: [config.localLoteId, Validators.required],
          numeroAtendentes: [config.numeroAtendentes, Validators.required],
          tempoAtendimento: [config.tempoAtendimento, Validators.required],
      })
    })
    )



  }
  onSubmit() {
    const form = this.formulario.value
    this.restangular.all('agendamento/configuracao/').customPUT(form, form.configuracaoAgendamentoId).subscribe(a => {
      this.notifierService.notify('success', 'Configuração atualizada com sucesso');
      this.router.navigate(['configuracao'])
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar o configuração!');
      });
  }
  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) }
  }
  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => {s.unsubscribe()})
  }
}
