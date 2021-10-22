import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("categoria").get().subscribe((response) => {
      console.log(response.data)
     this.categorias = response.data
      
    })
   }

  ngOnInit() {
  }

}
