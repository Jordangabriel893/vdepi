import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-status-lote',
  templateUrl: './status-lote.component.html',
  styleUrls: ['./status-lote.component.scss']
})
export class StatusLoteComponent implements OnInit {
  statusLote
  loading = true;
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("loteStatus").get().subscribe((response) => {
     this.statusLote = response.data
     this.loading = false;
    },
    () => this.loading = false)
   }
  ngOnInit() {
  }

}
