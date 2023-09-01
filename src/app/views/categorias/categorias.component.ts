import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit, OnDestroy {
  categorias
  loading = true;
  sub: Subscription[] = [];
  constructor(
    private restangular: Restangular,
    private router: Router,
    private route: ActivatedRoute,
  ) {
   this.sub.push(
    this.restangular.one('categoria').get().subscribe((response) => {
      this.categorias = response.data
      this.loading = false;
     },
     () => this.loading = false)
   )
   }

  ngOnInit() {
  }
  edit(id) {
    this.router.navigate(['/update-categorias', id], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
