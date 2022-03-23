import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Restangular } from 'ngx-restangular';
import { NotifierService } from 'angular-notifier';
import {  Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create-notificacao',
  templateUrl: './create-notificacao.component.html',
  styleUrls: ['./create-notificacao.component.scss']
})
export class CreateNotificacaoComponent implements OnInit {
  empresas: any;
  formulario:FormGroup;
  status: any;
  minDate: Date;
  listaContato;
  tipoMeioNotifi;
  tipoDeNotifi;
  templateNotifi;
  leilao;
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
      tituloNotificacao: [null, Validators.required],
      tipoNotificacaoId: [null, Validators.required],
      tipoMeioNotificacaoId: [null, Validators.required],
      listaContatoId: [null, Validators.required],
      listagemContatos: [null, Validators.required],
      leilaoId: [null, Validators.required],
      usuarioId: [null, Validators.required],
      dataEnvio: [null, Validators.required],
      ativo: [null, Validators.required],
      templateId: [null, Validators.required],
    })
    this.restangular.one('marketing/ListaContato').get().subscribe(
      dados =>{
        this.listaContato= dados.data
        console.log(this.listaContato)
      }
    )
    this.restangular.one('marketing/tipoNotificacao').get().subscribe(
      dados =>{
        this.tipoMeioNotifi= dados.data
      }
    )
    this.restangular.one('marketing/tipoMeioNotificacao').get().subscribe(
      dados =>{
        this.tipoDeNotifi= dados.data
      }
    )
    this.restangular.one('marketing/templateNotificacao').get().subscribe(
      dados =>{
        this.templateNotifi= dados.data
      }
    )
    this.restangular.all('leilao').one('status').get().subscribe(
      dados =>{
        this.leilao= dados.data
      }
    )

  }
  onSubmit(){

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
