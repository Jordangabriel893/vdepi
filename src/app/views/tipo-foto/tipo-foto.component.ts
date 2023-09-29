import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-tipo-foto',
  templateUrl: './tipo-foto.component.html',
  styleUrls: ['./tipo-foto.component.scss']
})
export class TipoFotoComponent implements OnInit {

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
    this.getCampos();
  }

  getCampos(){
    this.loading = true;

    this.restangular.one('/TipoFoto').get().subscribe(
      dados => {
        this.tipos = dados.data
        this.loading = false;
      },
      () => this.loading = false
    )
  }

  edit(id) {
    this.router.navigate(['/atualizar-tipo-foto', id], { relativeTo: this.route });
  }

  remove(id) {
    this.confirmationService
      .create('Atenção', 'Deseja realmente remover esse tipo?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.restangular
            .one('TipoFoto', id)
            .remove()
            .subscribe(
              (resp) => {
                this.notifierService.notify('success', 'Tipo Removido!');
                this.getCampos();
              },
              () => {
                this.notifierService.notify('error', 'Erro ao remover tipo!');
              }
            );
        }
      });
  }
}
