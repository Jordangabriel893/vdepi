import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as fileSaver from 'file-saver';
import { NotifierService } from 'angular-notifier';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  loading = true;
  queryField = new FormControl();
  results:any;
  arrematanteSearch;
  arrematantesComLetraMinuscula;

  lotes;
  loteSetado;
  listaFiltradaPorLote;
  filtroLotes;
  usuarios: any;

  sub: Subscription[] = [];

  constructor(
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
  ) {
   this.sub.push(
    this.restangular.one("admin/leilao").get({PageSize:100}).subscribe((response) => {
      this.leiloes = response.data
      this.setLeilao(this.leiloes[0].id, this.leiloes[0].nome);
    })
   )
   this.sub.push(
    this.restangular.one("usuario").get().subscribe((response) => {
      this.usuarios = response.data;

    })
   )

   }

  ngOnInit() {

  }

  setLeilao(id, nome){
    this.nomeLeilao = nome
    this.sub.push(
      this.restangular.one(`leilao/${id}/arrematantes`).get().subscribe((response) => {
      this.loading = false;
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
    if(this.queryField.value) {
      let value = this.queryField.value.replace('.', '').replace('-', '').replace('/', '').toLowerCase();

      this.arremantantesFiltrados =
        this.arrematantes.filter(x => x.nome.toLowerCase().includes(value) ||
                                  x.documento.replace('.', '').replace('-', '').replace('/', '').includes(value) ||
                                  x.email.toLowerCase().includes(value));
    }
  }
  goUsuario(nome, email){
    const usuario = this.usuarios.find(x => x.nomeCompleto == nome )
    this.router.navigate(['/update-usuarios', usuario.usuarioId]);
  }
  goLote(id){
    this.router.navigate(['/update-lotes', id]);
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
// objLote.lote.numeroLote.includes(value
