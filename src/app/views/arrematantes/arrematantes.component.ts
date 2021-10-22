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
  loading = true;
<<<<<<< HEAD
=======

>>>>>>> baa6abc05b7d8c422b6c211e7743080a24fe5b87
  constructor(
    private restangular: Restangular,

  ) {
    this.restangular.one("leilao").get({PageSize:100}).subscribe((response) => {
      this.leiloes = response.data
      this.setLeilao(this.leiloes[0].id, this.leiloes[0].nome);
    })


   }

  ngOnInit() {
  }
  setLeilao(id, nome){
    this.nomeLeilao = nome
    this.restangular.one(`leilao/${id}/arrematantes`).get().subscribe((response) => {
<<<<<<< HEAD
=======
      this.loading = false;
>>>>>>> baa6abc05b7d8c422b6c211e7743080a24fe5b87
      this.arrematantes = response.data
      this.loading = false;
    },
    () => this.loading = false)

  }

}
