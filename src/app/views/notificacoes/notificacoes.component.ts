import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit {
  formulario: FormGroup
  loading = true;
  loadingLog = true;
  selectLeilao;
  leiloes: Model.Leilao[];
  notificacoes;
  modalRef: BsModalRef;
  tableLog;
  hasLogs = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
  ) {
    this.formulario = this.formBuilder.group({
      leilao: [null]
    })
   }

  ngOnInit() {
    this.restangular.one('/Marketing/Notificacao').get().subscribe(
      dados => {
        this.notificacoes = dados.data
        this.loading = false;
      },
      () => this.loading = false
    )
  }

  edit(id) {
    this.router.navigate(['/update-notificacoes', id], { relativeTo: this.route });
  }
  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
  navigateLog(notificacao) {
    this.router.navigate(['/log-notificacoes', notificacao.notificacaoId], { relativeTo: this.route });
}
}
