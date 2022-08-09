import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
import * as Model from '../_models/model'

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.scss']
})
export class FaturaComponent implements OnInit, OnDestroy {
  formulario: FormGroup
  faturas;
  loading = true;
  selectLeilao
  sub: Subscription[] = [];
  leiloes;
  nomeLeilao:any = 'Leilões';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,) {

    this.sub.push(
      this.restangular.one("fatura/faturas").get().subscribe((response) => {

        console.log(response.data)
        this.loading = false
      })
    )
    this.sub.push(
      this.restangular.one('admin/leilao').get().subscribe(
        dados =>{
          this.leiloes= dados.data
        }
      )
      )
  }

  ngOnInit() {

  }
  setLeilao(id, nome){
    console.log(id)
    this.sub.push(
      this.restangular.one(`fatura/${id}/faturas`).get().subscribe(
      dados =>{
        console.log(dados.data)
        this.faturas = dados.data
      }
    )
    )
  }

  edit(id) {
    this.router.navigate(['/update-leilao', id], { relativeTo: this.route });
  }


  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }

}
