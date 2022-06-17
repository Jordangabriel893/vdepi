import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {
  comitente
  loading = true;
  constructor(
    private restangular: Restangular,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.restangular.one("comitente").get().subscribe((response) => {
     this.comitente = response.data
     this.loading = false;
    },
    () => this.loading = false)
   }

  ngOnInit() {
  }
  edit(id) {

    this.router.navigate(['/update-comitente', id], { relativeTo: this.route });
  }

}
