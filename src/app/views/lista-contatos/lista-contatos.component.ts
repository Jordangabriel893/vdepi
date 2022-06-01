import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})
export class ListaContatosComponent implements OnInit {
  formulario: FormGroup
  loading = true;
  selectLeilao;
  listas;
  leiloes: Model.Leilao[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      leilao:[null]
    })
   }

  ngOnInit() {

    this.restangular.one('marketing/listacontato').get().subscribe(
      dados =>{
        this.listas= dados.data
        this.loading = false;
      },
      () => this.loading = false
    )

  }
  edit(id) {
    this.router.navigate(['/edit-listacontatos', id], { relativeTo: this.route });
  }
}
