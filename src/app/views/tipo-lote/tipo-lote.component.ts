import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-tipo-lote',
  templateUrl: './tipo-lote.component.html',
  styleUrls: ['./tipo-lote.component.scss']
})
export class TipoLoteComponent implements OnInit {

  formulario: FormGroup
  loading = true;
  loadingLog = true;
  selectLeilao;
  leiloes: Model.Leilao[];
  tipos;
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
    this.getTipos();
  }

  getTipos(){
    this.loading = true;

    this.restangular.one('/TipoLote').get().subscribe(
      dados => {
        this.tipos = dados.data
        this.loading = false;
      },
      () => this.loading = false
    )
  }

  edit(id) {
    this.router.navigate(['/atualizar-tipo-lote', id], { relativeTo: this.route });
  }

  remove(id) {
    this.confirmationService
      .create('Atenção', 'Deseja realmente remover esse tipo de lote?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.restangular
            .one('TipoLote', id)
            .remove()
            .subscribe(
              (resp) => {
                this.notifierService.notify('success', 'Tipo Removido!');
                this.getTipos();
              },
              () => {
                this.notifierService.notify('error', 'Erro ao remover tipo!');
              }
            );
        }
      });
  }
}
