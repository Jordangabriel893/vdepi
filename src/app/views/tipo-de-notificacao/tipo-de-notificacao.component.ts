import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { ComponentService } from 'app/_services';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'
@Component({
  selector: 'app-tipo-de-notificacao',
  templateUrl: './tipo-de-notificacao.component.html',
  styleUrls: ['./tipo-de-notificacao.component.scss']
})
export class TipoDeNotificacaoComponent implements OnInit {
  formulario: FormGroup
  loading = true;
  selectLeilao;
  tipoDeNotific;
  leiloes: Model.Leilao[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private restangular: Restangular,
    private componentService: ComponentService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      leilao:[null],


    })
   }

  ngOnInit() {
    this.restangular.one('marketing/tipoNotificacao').get().subscribe(
      dados =>{
        this.tipoDeNotific= dados.data
        this.loading = false;
      },
      () => this.loading = false
    )

  }
  edit(id) {
    this.router.navigate(['/update-tiponotificacao', id], { relativeTo: this.route });
  }
}
