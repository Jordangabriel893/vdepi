import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-comitentes',
  templateUrl: './comitentes.component.html',
  styleUrls: ['./comitentes.component.scss']
})
export class ComitentesComponent implements OnInit {
  comitente
  loading = true;
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("comitente").get().subscribe((response) => {
     this.comitente = response.data
     this.loading = false;
    },
    () => this.loading = false)
   }

  ngOnInit() {
  }

}
