import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {
  contas
  loading = true;
  constructor(
    private restangular: Restangular,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.restangular.one("conta").get().subscribe((response) => {
     this.contas = response.data
     this.loading = false;
    },
    () => this.loading = false)

   }

  ngOnInit() {
  }
  edit(id) {

    this.router.navigate(['/update-conta', id], { relativeTo: this.route });
  }

}
