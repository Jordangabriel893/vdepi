import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-status-leilao',
  templateUrl: './status-leilao.component.html',
  styleUrls: ['./status-leilao.component.scss']
})
export class StatusLeilaoComponent implements OnInit {
  statusLeilao
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("leilao/status").get().subscribe((response) => {
      console.log(response.data)
     this.statusLeilao = response.data
      
    })
   }
  ngOnInit() {
  }

}
