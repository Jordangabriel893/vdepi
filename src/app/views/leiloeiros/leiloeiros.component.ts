import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-leiloeiros',
  templateUrl: './leiloeiros.component.html',
  styleUrls: ['./leiloeiros.component.scss']
})
export class LeiloeirosComponent implements OnInit {

  leiloeiros
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("leiloeiro").get().subscribe((response) => {
      console.log(response.data)
     this.leiloeiros = response.data
      
    })
   }

  ngOnInit() {
  }

}
