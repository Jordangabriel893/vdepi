import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-leiloeiros',
  templateUrl: './leiloeiros.component.html',
  styleUrls: ['./leiloeiros.component.scss']
})
export class LeiloeirosComponent implements OnInit {
  loading = true;
  leiloeiros
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("leiloeiro").get().subscribe((response) => {
     this.leiloeiros = response.data
     this.loading = false;
    },
    () => this.loading = false)
   }

  ngOnInit() {
  }

}
