
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NotifierService } from 'angular-notifier'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormValidations } from 'app/views/usuarios/shared/form-validation/form-validations';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { concat, Observable, of, Subject, Subscription } from 'rxjs';
import { tap, distinctUntilChanged, switchMap, catchError, filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-create-documento',
  templateUrl: './create-documento.component.html',
  styleUrls: ['./create-documento.component.scss']
})
export class CreateDocumentoComponent implements OnInit, OnDestroy {
  lotes = [];
  hasLotes = false;
  tipoDocumentos;
  perfis;
  templates;
  formulario: FormGroup
  loading
  today = moment().utc();
  dataAtual: any;
  minDate: Date;
  leilao: any;
  leiloes:any;
  sub: Subscription[] = [];
  salvando = false;
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private cepService: ConsultaCepService,
  ) {
    localeService.use('pt-br');
  }

  ngOnInit() {
    this.sub.push(
      this.restangular.one('admin/leilao').get().subscribe(
        dados => {
          this.leiloes = dados.data

        }
      )
    )
    this.sub.push(
      this.restangular.one('tipoDocumentoLote').get().subscribe(
        dados => {
          this.tipoDocumentos = dados.data
        }))
    this.sub.push(
      this.restangular.one('usuario/perfis').get().subscribe(
        dados => {
          this.perfis = dados.data
        }))
    this.sub.push(
      this.restangular.one('documentoLoteTemplate').get().subscribe(
        dados => {
          this.templates = dados.data
        }))

    this.formulario = this.formBuilder.group({
      leilaoId: [null, [Validators.required]],
      loteId: [null, [Validators.required]],
      tipoDocumentoId: [null, Validators.required],
      tipoAssinatura: [1, Validators.required],
      assinantes:[[], Validators.required],
      templateId: [null, [Validators.required]],
    })
  }

  onSubmit() {
    this.salvando = true;
    const formulario = {
      leilaoId: parseInt(this.formulario.value.leilaoId),
      loteId: parseInt(this.formulario.value.loteId),
      TipoDocumentoLoteId: parseInt(this.formulario.value.tipoDocumentoId),
      TipoAssinaturaId: parseInt(this.formulario.value.tipoAssinatura),
      assinantes: this.formulario.value.assinantes,
      templateId: parseInt(this.formulario.value.templateId),
    }
    Object.keys(this.formulario.controls).forEach((campo)=>{
      const controle = this.formulario.get(campo)
      controle.markAsTouched()
    })

    if(!this.formulario.valid){
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      this.salvando = false;
      return false;
    }
    this.restangular.all('DocumentoLote').post(formulario).subscribe(a => {
      this.notifierService.notify('success', 'Documento criado com sucesso');
      this.router.navigate(['/gerenciadordocumento']);
    },
    error => {
      this.notifierService.notify('error', 'Erro ao criar o documento!');
    });
  }
  setLeilao(){
    const leilao = this.formulario.value.leilaoId
    this.sub.push(
      this.restangular.one("lote", '').get({ leilaoId: leilao}).subscribe(
        dados => {
          this.lotes = dados.data;
          this.hasLotes = true;
        }
      )
    )
  }
  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErroLista(campoArray, campo, i) {
    return { 'has-error': this.verificaValidList(campoArray, campo, i) }
  }

  verificaValidList(campoArray, campo, i) {
    var lista = this.formulario.get(campoArray) as FormArray;
    var item = lista.controls[i] as FormGroup;
    return !item.get(campo).valid;
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
