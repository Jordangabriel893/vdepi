import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-historico-lances',
  templateUrl: './historico-lances.component.html',
  styleUrls: ['./historico-lances.component.scss']
})
export class HistoricoLancesComponent implements OnInit {
  leiloes
  idLeilao
  leilaoNome = 'Leilões'
  idLote:any = ''
  lotes
  lances
  loading = true;
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("leilao").get({PageSize:100}).subscribe((response) => {
      this.leiloes = response.data
      this.setLeilao(this.leiloes[0].id, this.leiloes[0].nome);
    })
   }

  ngOnInit() {
  }
  setLeilao(id, nome){
    this.leilaoNome = nome
    this.restangular.one("lote", '').get({ leilaoId: id, PageSize:100 }).subscribe(
      (lotes) => {
        this.loading = false;
        this.lotes = lotes.data
      }

    )
  }
  setLotes(id, numeroLote){
    this.idLote = numeroLote
    this.restangular.one(`lote/${id}/lances`).get({ PageSize:500 }).subscribe((response) => {
      this.lances = response.data
      this.loading = false;
    },
    () => this.loading = false)
  }
}
