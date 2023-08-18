import { Component, OnInit, TemplateRef } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-habilitacao',
  templateUrl: './habilitacao.component.html',
  styleUrls: ['./habilitacao.component.scss'],
})
export class HabilitacaoComponent implements OnInit {
  formulario: FormGroup;
  filtroLeilao: FormGroup;
  habilitacao: any = null;
  //modal
  openPopup = true;
  modalRef: BsModalRef;
  solicitacaoHabilitacaoId: any;
  solicitacaoHabilitacaoIdDesabilitar: any;
  leiloes;
  filtrado = [];
  documentosUsuario: any;
  loading = false;
  loadingLeilao = true;
  docRecusado = false;

  statusDocs = [
    { id: 0, descricao: 'PENDENTE' },
    { id: 1, descricao: 'ACEITO' },
    { id: 2, descricao: 'REJEITADO' },
  ];

  queryField = new FormControl();
  habilatacoesFiltradas: any;

  constructor(
    private restangular: Restangular,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.formulario = this.formBuilder.group({
      limiteCredito: [null, Validators.required],
      observacao: [null],
    });
    this.filtroLeilao = this.formBuilder.group({
      leilao: [0],
    });
  }

  ngOnInit() {
    this.restangular
      .one('admin/leilao', '')
      .get({ PageSize: 100 })
      .subscribe((response) => {
        this.leiloes = response.data;
        this.loadingLeilao = false;
      });
  }

  //submit
  aprovarSolicitacao(solicitacaoHabilitacaoId) {
    const i = this.habilitacao.findIndex(
      (x) => x.solicitacaoHabilitacaoId === solicitacaoHabilitacaoId
    );
    this.habilitacao[i].habilitado = true;
    this.habilitacao[i].status = 'Habilitado';

    this.restangular
      .all(`habilitacao/${solicitacaoHabilitacaoId}/aprovar`)
      .post(this.habilitacao[i])
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Solicitação Aprovada com sucesso'
          );
        },
        (error) => {
          this.notifierService.notify('error', 'Erro ao solicitar aprovação');
        }
      );
  }

  //submit
  reprovarSolicitacao() {
    const i = this.habilitacao.findIndex(
      (x) =>
        x.solicitacaoHabilitacaoId === this.solicitacaoHabilitacaoIdDesabilitar
    );
    this.habilitacao[i].status = 'Desabilitado';
    this.habilitacao[i].habilitado = false;

    this.restangular
      .all(`habilitacao/${this.solicitacaoHabilitacaoIdDesabilitar}/reprovar`)
      .post()
      .subscribe(
        (a) => {
          this.notifierService.notify('success', 'Reprovado com sucesso');
        },
        (error) => {
          this.notifierService.notify('error', 'Erro ao solicitar reprovação');
        }
      );
  }

  aprovarLimiteDeCredito() {
    const i = this.habilitacao.findIndex(
      (x) => x.solicitacaoHabilitacaoId === this.solicitacaoHabilitacaoId
    );
    this.habilitacao[i].limiteCredito = this.formulario.value.limiteCredito;
    this.habilitacao[i].observacao = this.formulario.value.observacao;
    this.habilitacao[i].habilitado = true;

    this.restangular
      .all(`habilitacao/${this.solicitacaoHabilitacaoId}/aprovar`)
      .post(this.habilitacao[i])
      .subscribe(
        (a) => {
          this.notifierService.notify('success', 'Limite Aprovado com sucesso');
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao aprovar Limite de Crédito'
          );
        }
      );
  }

  //modal
  openModal(template: TemplateRef<any>, solicitacaoHabilitacaoId) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.documentosUsuario = this.habilitacao.find(
      (x) => x.solicitacaoHabilitacaoId === solicitacaoHabilitacaoId
    );
    this.solicitacaoHabilitacaoId = solicitacaoHabilitacaoId;
    this.solicitacaoHabilitacaoIdDesabilitar = solicitacaoHabilitacaoId;
    this.existeRecusado(this.documentosUsuario.documentos);
  }

  verMotivoDaRecusa(template: TemplateRef<any>, solicitacaoId) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.solicitacaoHabilitacaoId = solicitacaoId;
  }

  getObservacao(solicitacaoHabilitacaoId: number): string {
    const item = this.habilitacao.find(
      (x) => x.solicitacaoHabilitacaoId === solicitacaoHabilitacaoId
    );
    return item.observacao || 'Não foi informado nenhum motivo';
  }

  getTipoRegra(tipoRegra) {
    let regra = '';
    switch (tipoRegra) {
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
    if (bytes === 0) { return '0 Bytes'; }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  downloadFile(arquivoId) {
    this.restangular
      .one(`Arquivo/${arquivoId}/download`)
      .get()
      .subscribe((resp) => {
        window.open(resp.data.urlArquivo);
      });
  }

  filtrarPorLeilao(event) {
    this.habilitacao = [];
    this.loading = true;
    if (event != null) {
      this.restangular
        .one('habilitacao')
        .get({ leilaoId: event.id })
        .subscribe(
          (response) => {
            this.habilitacao = response.data;
            this.habilatacoesFiltradas = response.data;
            this.loading = false;
          },
          () => (this.loading = false)
        );
    } else {
      this.habilitacao = [];
      this.loading = false;
    }
  }

  existeRecusado(doc: any[]) {
    if (!doc) { this.docRecusado = false; } else {
      this.docRecusado = doc.some((x) => x.status == true);
    }
  }

  notificarDocumentos(documentosUsuario) {
    const i = this.habilitacao.findIndex(
      (x) => x.solicitacaoHabilitacaoId === this.solicitacaoHabilitacaoId
    );
    this.habilitacao[i].status = 'Rejeitado';
    this.habilitacao[i].habilitado = false;

    this.restangular
      .all(
        `habilitacao/${documentosUsuario.solicitacaoHabilitacaoId}/notificarDoc`
      )
      .post(this.documentosUsuario)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Notificação de documentos rejeitados enviado com sucesso'
          );
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao enviar notificação de documentos Rejeitados'
          );
        }
      );
  }

  onSearch() {
    if (this.queryField.value) {
      const value = this.queryField.value
        .replace('.', '')
        .replace('-', '')
        .replace('/', '')
        .toLowerCase();
      this.habilatacoesFiltradas = this.habilitacao.filter((x) =>
        x.email.toLowerCase().includes(value)
      );
    }
  }
}
