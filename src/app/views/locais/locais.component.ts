import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.component.html',
  styleUrls: ['./locais.component.scss']
})
export class LocaisComponent implements OnInit {
  locais
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("local").get().subscribe((response) => {
      console.log(response.data)
     this.locais = response.data
      
    })
   }

  ngOnInit() {
  }

}
