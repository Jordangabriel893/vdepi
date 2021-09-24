import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { AuthenticationService } from '../../../_services/index';
import * as Model from '../../_models/model'

@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html'
})
export class CreateCategoriaComponent implements OnInit {

  user;
  orgaos: Model.Orgao[];
  divisoes: Model.Divisao[];
  autoridades: Model.Autoridade[];
  loading: boolean = false;
  agent: Model.Agente;
  clientes = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private restangular: Restangular,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef) {


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

  }

  ngOnInit() {
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

  sugereLogin() {

    var tamanho = this.agent.nome.indexOf(' ') == -1 ? this.agent.nome.length : this.agent.nome.indexOf(' ');

    this.agent.login = this.agent.nome.substr(0, tamanho);
    this.agent.login = this.agent.login.toUpperCase();
  }

  save() {

    this.agent.usuario_cadastro_id = this.user.id;

    this.restangular.all("agente").post(this.agent)
      .subscribe(a => {
        this.notifierService.notify('success', 'Agente Criado com sucesso');
        this.router.navigateByUrl('/agents');
      },
        error => {
          this.notifierService.notify('error', 'Erro ao criar o Agente!');
        });
  }

}
