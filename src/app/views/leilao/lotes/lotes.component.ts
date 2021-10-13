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

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.route.snapshot.params['id']
    this.restangular.one("lote", '').get({ leilaoId: this.id }).subscribe(
      (lotes) => {
        this.lotes = lotes.data;
        console.log(this.lotes)
      }
    )

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
