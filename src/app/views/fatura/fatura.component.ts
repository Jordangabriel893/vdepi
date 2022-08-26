import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
import * as Model from '../_models/model'

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.scss']
})
export class FaturaComponent implements OnInit, OnDestroy {
  formulario: FormGroup
  faturas;
  loading;
  sub: Subscription[] = [];
  nomeLeilao:any = 'Leilões';
  leilaoId;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService) {

  }

  ngOnInit() {

  }

  setLeilao(idLeilao) {
    this.leilaoId = idLeilao;
    this.loading = true;
    this.sub.push(
      this.restangular.one(`fatura?leilaoId=${idLeilao.id}`).get().subscribe(
      dados =>{
        this.faturas = dados.data
        this.nomeLeilao = idLeilao.nome;
        this.loading = false
      }
    )
    )
  }

  cancelarFatura(faturaId) {
    this.sub.push(
    this.confirmationService.create('Atenção', 'Deseja realmente cancelar esta fatura?')
        .subscribe((ans: ResolveEmit) => {
          if(ans.resolved) {
            this.sub.push(
              this.restangular.all(`fatura/cancelar/${faturaId}`).post().subscribe(() => {
                this.notifierService.notify('success', 'Fatura Cancelada com sucesso');
                this.setLeilao(this.leilaoId);
              },
              () => {
                this.notifierService.notify('error', 'Erro ao cancelar fatura');
              })
            );
          }
        })
    );


  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }



}
