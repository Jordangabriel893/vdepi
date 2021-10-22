import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  empresa
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("empresa").get().subscribe((response) => {
      console.log(response.data)
     this.empresa = response.data
      
    })
   }

  ngOnInit() {
  }

}
