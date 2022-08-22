import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectLeilao
  sub: Subscription[] = [];
  leiloes;
  nomeLeilao:any = 'Leilões';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,) {
    this.sub.push(
      this.restangular.one('admin/leilao').get().subscribe(
        dados =>{
          this.leiloes = dados.data
        }
      )
    )
  }

  ngOnInit() {

  }

  setLeilao(idLeilao) {
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

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }

}
