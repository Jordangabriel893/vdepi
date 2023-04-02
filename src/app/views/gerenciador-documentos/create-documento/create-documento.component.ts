
import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier'
import * as _ from 'lodash';
import * as moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

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
  loadingLotes = false;
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService
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
    // this.sub.push(
    //   this.restangular.one('usuario/perfis').get().subscribe(
    //     dados => {
    //       this.perfis = dados.data
    //     }))
    this.sub.push(
      this.restangular.one('documentoLoteTemplate').get().subscribe(
        dados => {
          this.templates = dados.data
        }))

    this.formulario = this.formBuilder.group({
      leilaoId: [null, [Validators.required]],
      loteId: [null, [Validators.required]],
      tipoDocumentoId: [null, Validators.required],
      tipoAssinatura: ["1"],
      assinantes: this.formBuilder.array([]),
      templateId: [null, [Validators.required]],
    });

    this.formulario.controls.tipoDocumentoId.valueChanges.subscribe((x: number) => {
      const tipoDocumento = this.tipoDocumentos.find(t => t.tipoDocumentoLoteId == x);
      this.createAssinantes(tipoDocumento);
    });
  }

  get assinantes() {
    return this.formulario.controls["assinantes"] as FormArray;
  }

  createAssinantes(tipoDocumento) {
    this.formulario.controls["assinantes"] = this.formBuilder.array([]);
    tipoDocumento.perfis.forEach(x => {
      const assinanteForm = this.formBuilder.group({
        usuarioId: [null, Validators.required],
        perfil: [x.descricao],
        usuarios: [[]]
      });
      this.getUsuarios(x.perfilId, assinanteForm);
      this.assinantes.push(assinanteForm);
    });
  }

  getUsuarios(perfilId: number, fg: FormGroup) {
    this.sub.push(
      this.restangular.one('usuario').get({perfilId: perfilId}).subscribe(
        dados => {
          fg.controls["usuarios"] = dados.data
        }
      )
    )
  }

  onSubmit() {
    this.salvando = true;
    const formulario = {
      leilaoId: parseInt(this.formulario.value.leilaoId),
      loteId: parseInt(this.formulario.value.loteId),
      tipoDocumentoLoteId: parseInt(this.formulario.value.tipoDocumentoId),
      tipoAssinaturaId: parseInt(this.formulario.value.tipoAssinatura),
      assinantes: this.assinantes.value.map(x => x.usuarioId),
      templateId: parseInt(this.formulario.value.templateId),
    }

    Object.keys(this.formulario.controls).forEach((campo)=>{
      const controle = this.formulario.get(campo)
      controle.markAsTouched()
    })


    // if(!this.formulario.valid){
    //   this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
    //   this.salvando = false;
    //   return false;
    // }

    this.restangular.all('DocumentoLote').post(formulario).subscribe(a => {
      this.notifierService.notify('success', 'Documento criado com sucesso');
      this.router.navigate(['/gerenciador-documentos']);
    },
    error => {
      this.notifierService.notify('error', 'Erro ao criar o documento!');
      this.salvando = false;
    });
  }

  setLeilao(){
    this.loadingLotes = true;
    const leilao = this.formulario.value.leilaoId
    this.sub.push(
      this.restangular.one("lote/numeros").get({ leilaoId: leilao, statusId: 5})
      .subscribe(
        dados => {
          this.lotes = dados.data;
          this.hasLotes = true;
          this.loadingLotes = false;
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
