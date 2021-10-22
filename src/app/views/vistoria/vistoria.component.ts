import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-vistoria',
  templateUrl: './vistoria.component.html',
  styleUrls: ['./vistoria.component.scss']
})
export class VistoriaComponent implements OnInit {
  vistoria
  loading = true;
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("vistoria").get().subscribe((response) => {
      console.log(response.data)
     this.vistoria = response.data
     this.loading = false;
    },
    () => this.loading = false)
  
   }

  ngOnInit() {
  }

}
