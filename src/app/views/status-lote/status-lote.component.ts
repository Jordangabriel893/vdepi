import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-status-lote',
  templateUrl: './status-lote.component.html',
  styleUrls: ['./status-lote.component.scss']
})
export class StatusLoteComponent implements OnInit {
  statusLote
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("loteStatus").get().subscribe((response) => {
      console.log(response.data)
     this.statusLote = response.data
      
    })
   }
  ngOnInit() {
  }

}
