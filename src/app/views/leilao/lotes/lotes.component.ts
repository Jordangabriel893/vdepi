import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.scss']
})
export class LotesComponent implements OnInit {
  id: any
  lotes: any
  leilao
  loading = true;

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.route.snapshot.params['id']
    this.restangular.one("lote", '').get({ leilaoId: this.id, PageSize:100 }).subscribe(
      (lotes) => {
       this.loading = false;
        this.lotes = lotes.data;
      },
      () => this.loading = false
    )
    this.restangular.one('leilao', this.id).get().subscribe((response) => {
      this.leilao = response.data
    });

  }

  ngOnInit() {

  }
  create(){
    this.router.navigate(['/create-lotes', this.id], { relativeTo: this.route });
  }
  edit(id) {
    this.router.navigate(['/update-lotes', id], { relativeTo: this.route });
  }
}
