import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-arrematantes',
  templateUrl: './arrematantes.component.html',
  styleUrls: ['./arrematantes.component.scss']
})
export class ArrematantesComponent implements OnInit {
  leiloes
  nomeLeilao:any = 'Leilões'
  arrematantes

  constructor(
    private restangular: Restangular,

  ) {
    this.restangular.one("leilao").get({PageSize:100}).subscribe((response) => {
      console.log(response.data)
      this.leiloes = response.data
    })

   
   }

  ngOnInit() {
  }
  setLeilao(id, nome){
    console.log(id)
    this.nomeLeilao = nome
    this.restangular.one(`leilao/${id}/arrematantes`).get().subscribe((response) => {
      console.log(response.data)
      this.arrematantes = response.data
    })

  }

}
