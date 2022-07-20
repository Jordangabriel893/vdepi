import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as fileSaver from 'file-saver';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-arrematantes',
  templateUrl: './arrematantes.component.html',
  styleUrls: ['./arrematantes.component.scss']
})
export class ArrematantesComponent implements OnInit, OnDestroy {
  leiloes;
  nomeLeilao:any = 'Leilões';
  arrematantes;
  arremantantesFiltrados;
  loading = false;
  queryField = new FormControl();
  results:any;
  arrematanteSearch;
  arrematantesComLetraMinuscula;
  loadingLeilao;

  lotes;
  loteSetado;
  listaFiltradaPorLote;
  filtroLotes;
  usuarios: any;
  filtroLeilao

  sub: Subscription[] = [];

  constructor(
    private restangular: Restangular,
    private notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
      this.sub.push(
        this.restangular.one("admin/leilao").get({PageSize:100}).subscribe((response) => {
          this.leiloes = response.data
        })
      )

      this.filtroLeilao = this.formBuilder.group({
        leilao:[0]
      })

      this.queryField.valueChanges.subscribe( x => this.onSearch())
   }

  ngOnInit() {

  }

  filtrarPorLeilao() {
    this.arrematantes = [];
    this.loading = true;
    this.sub.push(
      this.restangular.one(`leilao/${this.filtroLeilao.value.leilao}/arrematantes`).get()
      .subscribe((response) => {
        this.arrematantes = response.data;
        this.arremantantesFiltrados = response.data;
        this.loading = false;
      },
      () => this.loading = false)
    )
  }

  auto(loteId: number, numerolote: number) {
    this.sub.push(
      this.restangular.one(`lote/${loteId}/autoarrematacao`, )
      .withHttpConfig({responseType: 'blob'})
      .get()
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        fileSaver.saveAs(blob, `AutoArrematacao-Lote${numerolote}.pdf`);
      },(error) => {
        this.notifierService.notify('error', 'Não foi possivel fazer o download!')

      })
    )
  }

  nota(loteId: number, numerolote: number) {
    this.sub.push(
      this.restangular.one(`lote/${loteId}/notaarrematacao`, )
      .withHttpConfig({responseType: 'blob'})
      .get()
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        fileSaver.saveAs(blob, `NotaArrematacao-Lote${numerolote}.pdf`);
      },(error) => {
        this.notifierService.notify('error', 'Não foi possivel fazer o download!')

      })
    )
  }

  onSearch(){
      let value = this.queryField.value.replace('.', '').replace('-', '').replace('/', '').toLowerCase();

      this.arremantantesFiltrados =
        this.arrematantes.filter(x => x.nome.toLowerCase().includes(value) ||
                                  x.documento.replace('.', '').replace('-', '').replace('/', '').includes(value) ||
                                  x.email.toLowerCase().includes(value));
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }

  exportAsExcel() {
    this.restangular.one(`leilao/${this.filtroLeilao.value.leilao}/exportararrematantes`, )
    .withHttpConfig({responseType: 'blob'})
    .get()
    .subscribe((response) => {
      const blob = new Blob([response], { type: 'application/xlsx' });
      fileSaver.saveAs(blob, `Arrematantes.xlsx`);
    },(error) => {
      this.notifierService.notify('error', 'Não foi possivel fazer o download!')

    })
  }
}
