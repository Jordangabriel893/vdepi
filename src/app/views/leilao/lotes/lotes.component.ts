import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.scss']
})
export class LotesComponent implements OnInit {
  id: any
  lotes: any
  filtroLotes
  leilao
  descricao
  descricaoTitle
  numeroLote
  loading = true;
  idLote
  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.route.snapshot.params['id']
    this.restangular.one("lote", '').get({ leilaoId: this.id, PageSize:100 }).subscribe(
      (lotes) => {
       this.loading = false;
       const lote = lotes.data
        this.lotes = lote;
        this.filtroLotes = lote
        this.numeroLote = lote.map(x => x.loteId)
        this.descricao = lote.map(x => x.descricao)
        console.log(this.numeroLote)
      },
      () => this.loading = false
    )
    this.restangular.one('leilao', this.id).get().subscribe((response) => {
      this.leilao = response.data
    });

  }

  ngOnInit() {

  }
  create(){
    this.router.navigate(['/create-lotes', this.id], { relativeTo: this.route });
  }
  edit(id) {
    this.router.navigate(['/update-lotes', id], { relativeTo: this.route });
  }
  setLote(item){
    this.idLote = item
    const listaFiltradaPorID = this.filtroLotes.filter(x => x.loteId == item)
    console.log(listaFiltradaPorID)
    this.lotes = listaFiltradaPorID
    this.descricaoTitle=listaFiltradaPorID[0].descricao
  }
  setDescricao(item){
    this.idLote = '' 
    this.descricaoTitle=item
    const listaFiltradaPorID = this.filtroLotes.filter(x => x.descricao == item )
    console.log(listaFiltradaPorID)
    this.lotes = listaFiltradaPorID
  }
}
