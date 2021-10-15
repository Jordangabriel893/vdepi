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

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
    this.restangular.one("lote", '').get({ leilaoId: this.id }).subscribe(
      (lotes) => {
        this.lotes = lotes.data;
        console.log(this.lotes)
      }
    )
    this.restangular.one(`leilao`).get({id:this.id}).subscribe((response) => {
     const leilao =  response.data.filter(x => x.id == this.id)
     console.log(leilao[0])
     this.leilao = leilao[0]
      
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
