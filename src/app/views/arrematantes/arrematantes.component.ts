import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as fileSaver from 'file-saver';
import { NotifierService } from 'angular-notifier';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-arrematantes',
  templateUrl: './arrematantes.component.html',
  styleUrls: ['./arrematantes.component.scss']
})
export class ArrematantesComponent implements OnInit {
  leiloes
  nomeLeilao:any = 'Leilões'
  arrematantes
  loading = true;
  queryField = new FormControl();
  results:any;
  arrematanteSearch;
  arrematantesComLetraMinuscula;

  lotes;
  loteSetado;
  listaFiltradaPorLote;
  filtroLotes;

  constructor(
    private restangular: Restangular,
    private notifierService: NotifierService
  ) {
    this.restangular.one("leilao").get({PageSize:100}).subscribe((response) => {
      this.leiloes = response.data
      this.setLeilao(this.leiloes[0].id, this.leiloes[0].nome);
    })
   }

  ngOnInit() {
  }
  setLeilao(id, nome){
    this.nomeLeilao = nome
    this.restangular.one(`leilao/${id}/arrematantes`).get().subscribe((response) => {
      this.loading = false;
      const arrematante = response.data
      this.filtroLotes = response.data
      this.arrematantes = response.data
      this.arrematantes.forEach(element => {
        element.nome =  element.nome.toLowerCase();

      });
      this.arrematantes.sort( (a, b )=>{
        if (a.nome > b.nome) {
          return 1;
        }
        if (a.nome < b.nome) {
          return -1;
        }
        return 0;
      })
      console.log(this.arrematantes)
      this.lotes = this.arrematantes.map(x => x.lote)
      // console.log(this.lotes)
      this.arrematantesComLetraMinuscula = this.arrematantes;
      this.loading = false;
    },
    () => this.loading = false)

  }
  setLote(lote:any){
    this.loteSetado = lote.descricao
    this.listaFiltradaPorLote =   this.filtroLotes.filter(x => x.loteId == lote.loteId)
    this.arrematantes = this.listaFiltradaPorLote

  }
  auto(loteId: number, numerolote: number) {
    this.restangular.one(`lote/${loteId}/autoarrematacao`, )
    .withHttpConfig({responseType: 'blob'})
    .get()
    .subscribe((response) => {
      console.log(response);
      const blob = new Blob([response], { type: 'application/pdf' });
      fileSaver.saveAs(blob, `AutoArrematacao-Lote${numerolote}.pdf`);
    },(error) => {
      this.notifierService.notify('error', 'Não foi possivel fazer o download do comprovante!')

    })
  }

  nota(loteId: number, numerolote: number) {
    this.restangular.one(`lote/${loteId}/notaarrematacao`, )
    .withHttpConfig({responseType: 'blob'})
    .get()
    .subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      fileSaver.saveAs(blob, `NotaArrematacao-Lote${numerolote}.pdf`);
    },(error) => {
      this.notifierService.notify('error', 'Não foi possivel fazer o download do comprovante!')

    })
  }
  onSearch(){
    let value = this.queryField.value
    //se o usaurio nao digitou nada e a busca é diferente de vazio
    const arrematanteComLetraMinuscula = this.arrematantesComLetraMinuscula
    arrematanteComLetraMinuscula.forEach(element => {
      element.nome =  element.nome.toLowerCase();
      element.email =  element.email.toLowerCase();
      element.lote.numeroLote = element.lote.numeroLote.toString()
    });
    let filtraValorPorNome = arrematanteComLetraMinuscula.filter(objNome => objNome.nome.includes(value))
    let filtraValorPorEmail = arrematanteComLetraMinuscula.filter(objEmail => objEmail.email.includes(value))
    let filtraValorPorDocumento = arrematanteComLetraMinuscula.filter(objDocumento => objDocumento.documento.includes(value))
    let filtraValorPorLote = arrematanteComLetraMinuscula.filter(objLote => objLote.lote.numeroLote.includes(value))
    if (value && (value = value.trim()) !== '') {
        let arraySearch = [...filtraValorPorNome, ...filtraValorPorEmail, ...filtraValorPorDocumento, ...filtraValorPorLote]
        this.arrematanteSearch = arraySearch
  }
  }
}
// objLote.lote.numeroLote.includes(value
