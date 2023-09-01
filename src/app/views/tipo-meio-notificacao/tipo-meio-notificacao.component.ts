import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'

@Component({
  selector: 'app-tipo-meio-notificacao',
  templateUrl: './tipo-meio-notificacao.component.html',
  styleUrls: ['./tipo-meio-notificacao.component.scss']
})

export class TipoMeioNotificacaoComponent implements OnInit {
  formulario: FormGroup
  loading = true;
  selectLeilao;
  tipoMeios;
  leiloes: Model.Leilao[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
  ) { }

  ngOnInit() {
    this.restangular.one('marketing/tipoMeioNotificacao').get().subscribe(
      dados => {
        this.tipoMeios = dados.data
        this.loading = false;
      }
    )
  }
  edit(id) {
    this.router.navigate(['/update-tipomeionotificao', id], { relativeTo: this.route });
  }
}
