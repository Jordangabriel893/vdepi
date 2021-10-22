import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-comitentes',
  templateUrl: './comitentes.component.html',
  styleUrls: ['./comitentes.component.scss']
})
export class ComitentesComponent implements OnInit {
  comitente
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("comitente").get().subscribe((response) => {
      console.log(response.data)
     this.comitente = response.data
      
    })
   }

  ngOnInit() {
  }

}
