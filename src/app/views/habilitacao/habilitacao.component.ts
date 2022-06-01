import { Component, OnInit, TemplateRef } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-habilitacao',
  templateUrl: './habilitacao.component.html',
  styleUrls: ['./habilitacao.component.scss']
})
export class HabilitacaoComponent implements OnInit {
  formulario: FormGroup
  filtroLeilao:FormGroup
  habilitacao: any
  //modal
  openPopup: boolean = true
  isCollapsed = false;
  message = 'expanded';
  modalRef: BsModalRef;
  solicitacaoHabilitacaoId: any
  solicitacaoHabilitacaoIdDesabilitar:any
  posicaoI:any
  leiloes
  filtrado= []
  documentosUsuario:any
  loading = true;

  constructor(
    private restangular: Restangular,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location  ) {
    this.formulario = this.formBuilder.group({
      limiteCredito:[null, Validators.required],
      observacao:[null],

    })
    this.filtroLeilao = this.formBuilder.group({
      leilao:[null]
    })
  }

  ngOnInit() {
    this.restangular.one("habilitacao").get().subscribe((response) => {
      this.habilitacao = response.data;
      this.loading = false;
    },
    () => this.loading = false);

    this.restangular.one("leilao", '').get({ PageSize: 100 }).subscribe((response) => {
      this.leiloes = response.data;

      this.filtroLeilao.get('leilao').setValue(response.data[0].nome);
      this.filtrarPorLeilao();
    })

  }

  //submit
  aprovarSolicitacao(solicitacaoHabilitacaoId, i) {
    this.documentosUsuario = this.habilitacao[i]
    this.documentosUsuario.habilitado = true
    this.restangular.all(`habilitacao/${solicitacaoHabilitacaoId}/aprovar`).post(this.documentosUsuario)
    .subscribe(a =>{
      this.notifierService.notify('success', 'Solicitação Aprovada com sucesso');
      setTimeout(()=>{location.reload()}, 3000)
    },
      error => {
        this.notifierService.notify('error', 'Erro ao solicitar aprovação');
      });
  }

    //submit
  reprovarSolicitacao() {

    this.restangular.all(`habilitacao/${this.solicitacaoHabilitacaoIdDesabilitar}/reprovar`).post()
    .subscribe(a => {
      this.notifierService.notify('success', 'Reprovado com sucesso');
      setTimeout(()=>{location.reload()}, 3000)

    },
      error => {
        this.notifierService.notify('error', 'Erro ao solicitar reprovação');
      });
  }

  aprovarLimiteDeCredito(){
    this.documentosUsuario = this.habilitacao[this.posicaoI]
    this.solicitacaoHabilitacaoId = this.habilitacao[this.posicaoI].solicitacaoHabilitacaoId
    this.documentosUsuario.limiteCredito = this.formulario.value.limiteCredito
    this.documentosUsuario.observacao = this.formulario.value.observacao
    this.documentosUsuario.habilitado = true
    this.restangular.all(`habilitacao/${this.solicitacaoHabilitacaoId}/aprovar`).post(this.documentosUsuario).subscribe(a =>{
      this.notifierService.notify('success', 'Limite Aprovado com sucesso');
      setTimeout(()=>{location.reload()}, 3000)
    },
      error => {
        this.notifierService.notify('error', 'Erro ao aprovar Limite de Crédito');
      });
  }

  //modal
  openModal(template: TemplateRef<any>, i, solicitacaoHabilitacaoId) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg'});
    this.documentosUsuario = this.habilitacao[i]
    this.posicaoI = i
    this.solicitacaoHabilitacaoIdDesabilitar = solicitacaoHabilitacaoId
  }

  collapsed(): void {
    this.message = 'collapsed';
  }

  collapses(): void {
    this.message = 'collapses';
  }

  expanded(): void {
    this.message = 'expanded';
  }

  expands(): void {
    this.message = 'expands';
  }

  getTipoRegra(tipoRegra) {
    let regra = '';
    switch(tipoRegra){
      case 'TEL':
        regra = 'Telefone';
        break;
      case 'EMAIL':
        regra = 'Email';
        break;
      case 'DOC':
          regra = 'Documentos';
          break;
    }

    return regra;
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  downloadFile(arquivoId) {
    this.restangular.one(`Arquivo/${arquivoId}/download`).get()
    .subscribe((resp) => {
      window.open(resp.data.urlArquivo);
    })
  }

  filtrarPorLeilao(){
    const filtro = this.habilitacao.filter(x => x.leilao.nome === this.filtroLeilao.value.leilao)
    this.filtrado = filtro
  }
}
