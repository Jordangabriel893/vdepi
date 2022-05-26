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
  leiloes;
  nomeLeilao:any = 'Leilões';
  arrematantes;
  arremantantesFiltrados;
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
      this.arrematantes = response.data;
      this.arremantantesFiltrados = response.data;
      this.loading = false;
    },
    () => this.loading = false)
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
      this.notifierService.notify('error', 'Não foi possivel fazer o download!')

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
      this.notifierService.notify('error', 'Não foi possivel fazer o download!')

    })
  }

  onSearch(){
    if(this.queryField.value) {
      let value = this.queryField.value.replace('.', '').replace('-', '').replace('/', '').toLowerCase();

      this.arremantantesFiltrados =
        this.arrematantes.filter(x => x.nome.toLowerCase().includes(value) ||
                                  x.documento.replace('.', '').replace('-', '').replace('/', '').includes(value) ||
                                  x.email.toLowerCase().includes(value));
    }
  }
}
// objLote.lote.numeroLote.includes(value
