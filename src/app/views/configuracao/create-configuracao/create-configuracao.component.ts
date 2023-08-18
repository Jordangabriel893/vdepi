import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-create-configuracao',
  templateUrl: './create-configuracao.component.html',
  styleUrls: ['./create-configuracao.component.scss']
})
export class CreateConfiguracaoComponent implements OnInit {
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
    private localeService: BsLocaleService
  ) {
    localeService.use('pt-br');
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
   }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      diaSemana: [null, Validators.required],
      horaInicio: [null, Validators.required],
      horaFinal: [null, Validators.required],
      limiteDia: [null, Validators.required],
      localLoteId: [null, Validators.required],
      numeroAtendentes: [null, Validators.required],
      tempoAtendimento: [null, Validators.required],
    })
    this.sub.push(
      this.restangular.one('local').get().subscribe(
        dados => {
          this.localLotes = dados.data
        }
      )
    )

  }
  onSubmit() {
      this.restangular.all('agendamento/Configuracao').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Configuração criada com sucesso');
      this.router.navigate(['/configuracao']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar configuracao!');

        Object.keys(this.formulario.controls).forEach((campo) => {
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      })
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
