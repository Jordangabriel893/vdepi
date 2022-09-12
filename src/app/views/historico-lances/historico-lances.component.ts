import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
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
  loading = false;
  ehLeilaoEncerrado = false
  lanceVencedorAtual
  constructor(
    private restangular: Restangular,
    private notifierService: NotifierService,
  ) {
    this.restangular.one("admin/leilao").get({PageSize:100}).subscribe((response) => {
      this.leiloes = response.data
      //const id = this.leiloes[0].id
      //this.setLeilao(id , this.leiloes[0].nome);
      //this.isStatusEncerrado(id)
    })
   }

  ngOnInit() {
  }

  setLeilao(id, nome){
    this.lotes = []
    this.lances = []
    this.idLote = null;
    this.leilaoNome = nome
    this.isStatusEncerrado(id)
    this.restangular.one("lote/numeros", '').get({ leilaoId: id }).subscribe(
      (lotes) => {
        this.loading = false;
        this.lotes = lotes.data
      }

    )
  }

  setLotes(id, numeroLote){
    this.loading = true;
    this.lances = [];
    this.idLote = numeroLote
    this.restangular.one(`lote/${id}/lances`).get({ PageSize:500 }).subscribe((response) => {
      this.lances = response.data
      this.loading = false;
    },
    () => this.loading = false)
  }

  isStatusEncerrado(id)
  {
    const leilao = this.leiloes.filter( x => x.id == id)
    this.ehLeilaoEncerrado =  leilao[0].status.toString().toUpperCase() == 'ENCERRADO'
  }


  gravarLanceVencedor(lanceId:number){
    this.restangular.all(`lote/${lanceId}/LanceVencedor`).post({lanceId: lanceId }).subscribe(a =>{
      this.notifierService.notify('success', 'Novo Lance Vencedor Cadastrado com Sucesso');
    },
      error => {
        this.notifierService.notify('error', 'Erro ao Gravar Novo Lance Vencedor ');
      });
  }

}
