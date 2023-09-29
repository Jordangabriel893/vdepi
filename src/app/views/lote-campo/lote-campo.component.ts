import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-lote-campo',
  templateUrl: './lote-campo.component.html',
  styleUrls: ['./lote-campo.component.scss']
})
export class LoteCampoComponent implements OnInit {

  formulario: FormGroup
  loading = true;
  loadingLog = true;
  selectLeilao;
  leiloes: Model.Leilao[];
  campos;
  modalRef: BsModalRef;
  tableLog;
  hasLogs = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private notifierService: NotifierService,
  ) {
    this.formulario = this.formBuilder.group({
      leilao: [null]
    })
  }

  ngOnInit() {
    this.getCampos();
  }

  getCampos(){
    this.loading = true;

    this.restangular.one('/LoteCampo').get().subscribe(
      dados => {
        this.campos = dados.data
        this.loading = false;
      },
      () => this.loading = false
    )
  }

  edit(id) {
    this.router.navigate(['/atualizar-lote-campo', id], { relativeTo: this.route });
  }

  remove(id) {
    this.confirmationService
      .create('Atenção', 'Deseja realmente remover esse campo?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.restangular
            .one('LoteCampo', id)
            .remove()
            .subscribe(
              (resp) => {
                this.notifierService.notify('success', 'Campo Removido!');
                this.getCampos();
              },
              () => {
                this.notifierService.notify('error', 'Erro ao remover campo!');
              }
            );
        }
      });
  }
}
