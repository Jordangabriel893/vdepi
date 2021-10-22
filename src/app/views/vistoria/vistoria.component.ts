import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-vistoria',
  templateUrl: './vistoria.component.html',
  styleUrls: ['./vistoria.component.scss']
})
export class VistoriaComponent implements OnInit {
  vistoria
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("vistoria").get().subscribe((response) => {
      console.log(response.data)
     this.vistoria = response.data
      
    })
   }

  ngOnInit() {
  }

}
