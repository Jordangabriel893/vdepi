import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leilao',
  templateUrl: './leilao.component.html',
  styleUrls: ['./leilao.component.scss']
})
export class LeilaoComponent implements OnInit {
  formulario: FormGroup
  leiloes: Model.Leilao[];
  loading = true;
selectLeilao
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,) {
      this.formulario = this.formBuilder.group({
        leilao:[null]
      })
  }

  ngOnInit() {
    this.restangular.one("leilao", '').get({PageSize:100}).subscribe((response) => {
        this.selectLeilao = response.data
        this.leiloes = response.data;
        console.log(response.data)
        this.loading = false;
      },
      () => this.loading = false);
  }

  edit(id) {
    this.router.navigate(['/update-leilao', id], { relativeTo: this.route });
  }

  verLotes(id){
    this.router.navigate(['/lotes', id]);

  }
  dashboard(id){
    this.router.navigate(['/dashboard', id]);
  }

  buscarLeilao(){
    const filtro = this.selectLeilao.filter(x => x.nome === this.formulario.value.leilao)
    this.leiloes = filtro
  }
}
