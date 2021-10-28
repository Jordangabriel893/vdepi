import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  empresa
  loading = true;
  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.restangular.one("empresa").get().subscribe((response) => {
     this.empresa = response.data
     this.loading = false;
    },
    () => this.loading = false)
   }

  ngOnInit() {
  }

  edit(id) {
    this.router.navigate(['/update-empresa', id], { relativeTo: this.route });
  }
}
