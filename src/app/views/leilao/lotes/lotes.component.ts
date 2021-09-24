import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private restangular: Restangular,
  ) {
    this.id = this.route.snapshot.params['id']
    this.restangular.one("lote", '').get({ leilaoId: this.id }).subscribe(
      (lotes) => {
        
        for(let i=0; i < lotes.data.length; i++){
          lotes.data[i].loteJudicial 
          if(lotes.data[i].loteJudicial == false ){
            lotes.data[i].loteJudicial = 'Não'
          }else{
            lotes.data[i].loteJudicial = 'Sim'

          }

        }
        console.log(lotes.data.loteJudicial)
        this.lotes = lotes.data;
        console.log(this.lotes)
        
      }
    )

  }

  ngOnInit() {

  }

}
