import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-lances-consolidado',
  templateUrl: './lances-consolidado.component.html',
  styleUrls: ['./lances-consolidado.component.scss']
})
export class LancesConsolidadoComponent implements OnInit {
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
    this.restangular.one(`lote/${id}/lancesConsolidado`).get({ PageSize:500 }).subscribe((response) => {
      this.lances = response.data
      this.loading = false;
    },
    () => this.loading = false)
  }
}
