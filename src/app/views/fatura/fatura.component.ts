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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,) {

    this.sub.push(
      this.restangular.one("fatura/faturas").get().subscribe((response) => {
        this.faturas = response.data
        console.log(response.data)
        this.loading = false
      })
    )
  }

  ngOnInit() {

  }

  edit(id) {
    this.router.navigate(['/update-leilao', id], { relativeTo: this.route });
  }


  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }

}
