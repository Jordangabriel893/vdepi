import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { ComponentService } from '../../_services/index';
import * as Model from '../_models/model'

@Component({
  selector: 'app-leilao',
  templateUrl: './leilao.component.html'
})
export class LeilaoComponent implements OnInit {

  leiloes: Model.Leilao[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private restangular: Restangular,
    private componentService: ComponentService,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.restangular.one("leilao", '').get().subscribe((response) => {
        this.leiloes = response.data;

      });
  }

  edit(id) {
    this.router.navigate(['/update-leilao', id], { relativeTo: this.route });
  }

  verLotes(id){
    this.router.navigate(['/lotes', id]);

  }

}
