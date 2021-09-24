import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { AuthenticationService } from '../../../_services/index';
import * as Model from '../../_models/model'

@Component({
  selector: 'app-update-leilao',
  templateUrl: './update-leilao.component.html'
})
export class UpdateLeilaoComponent implements OnInit {

  user;
  orgaos: Model.Orgao[];
  divisoes: Model.Divisao[];
  autoridades: Model.Autoridade[];
  loading: boolean = false;
  agent;
  agentId: number;
  clientes = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private restangular: Restangular,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef)
  {
    this.user = this.authService.getUser();
    this.agent = new Model.Agente();

    this.restangular.all("orgao")
      .getList()
      .subscribe((orgaos: Model.Orgao[]) => {
        this.orgaos = orgaos;
      });

    this.restangular.all("divisao")
      .getList()
      .subscribe((divisoes: Model.Divisao[]) => {
        this.divisoes = divisoes;
      });

    this.restangular
      .one("cliente/usuario", this.user.id)
      .getList('',
        {
          flag_virtual: true
        }).subscribe(c => {
          this.clientes = c.map(x => { return { id_cliente: x.id_cliente, nome: x.nome } });
        });

    this.route.params.subscribe(p => {
      this.agentId = +p['id'];
    });

  }

  ngOnInit() {
    this.restangular.one('agente', this.agentId).get().subscribe(a => {
      this.agent = a;
      this.selectOrgao();
    });
  }

  selectOrgao() {
    this.loading = true;
    this.restangular.all("autoridade")
      .getList({ ids_orgao: this.agent.orgao_emissor_id })
      .subscribe((autoridades: Model.Autoridade[]) => {
        this.autoridades = autoridades;
        this.loading = false;
      });
  }

  save() {

    this.agent.usuario_alteracao_id = this.user.id;

    this.agent.put()
      .subscribe(a => {
        this.notifierService.notify('success', 'Agente atualizado');
        this.router.navigateByUrl('/agents');
      },
        error => {
          this.notifierService.notify('error', 'Erro ao atualizar Agente!');
        });
  }

}
