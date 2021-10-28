import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.restangular.one("categoria").get().subscribe((response) => {
     this.categorias = response.data
     console.log(response.data)
     this.loading = false;
    },
    () => this.loading = false)
   }

  ngOnInit() {
  }
  edit(id) {
    console.log(id)
    this.router.navigate(['/update-categorias', id], { relativeTo: this.route });
  }
}
