import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias
  loading = true;
  constructor(
    private restangular: Restangular,
  ) {
    this.restangular.one("categoria").get().subscribe((response) => {
     this.categorias = response.data
     this.loading = false;
    },
    () => this.loading = false)
   }

  ngOnInit() {
  }

}
