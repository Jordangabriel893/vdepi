import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.component.html',
  styleUrls: ['./locais.component.scss']
})
export class LocaisComponent implements OnInit {
  locais
  loading = true;
  constructor(
    private restangular: Restangular,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.restangular.one("local").get().subscribe((response) => {
     this.locais = response.data
     console.log(this.locais)
     this.loading = false;
    },
    () => this.loading = false)
   }

  ngOnInit() {
  }

  edit(id) {
    console.log(id)
    this.router.navigate(['/update-local', id], { relativeTo: this.route });
  }

}
