import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-leilao',
  templateUrl: './leilao.component.html',
  styleUrls: ['./leilao.component.scss'],
})
export class LeilaoComponent implements OnInit {
  formulario: FormGroup;
  leiloes: Model.Leilao[];
  loading = true;
  selectLeilao;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private restangular: Restangular,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      leilao: [null],
    });

    this.listarLeiloes();
  }

  ngOnInit() {}

  listarLeiloes() {
    this.restangular
      .all('admin')
      .one('leilao')
      .get()
      .subscribe(
        (response) => {
          this.selectLeilao = response.data;
          this.leiloes = response.data;
          this.loading = false;
        },
        () => (this.loading = false)
      );
  }

  edit(id) {
    this.router.navigate(['/update-leilao', id], { relativeTo: this.route });
  }

  verLotes(id) {
    this.router.navigate(['/lotes', id]);
  }

  dashboard(id) {
    this.router.navigate(['/dashboard', id]);
  }

  buscarLeilao(event) {
    if (event == null) {
      this.leiloes = this.selectLeilao;
    } else {
      const filtro = this.selectLeilao.filter((x) => x.nome === event.nome);
      this.leiloes = filtro;
    }
  }

  finalizar(id) {
    this.restangular
      .all('leilao/' + id + '/Encerrar')
      .post()
      .subscribe(
        () => {
          this.notifierService.notify('success', 'Leilão Encerrado!');
          this.listarLeiloes();
        },
        (error) => {
          console.log(error.data.Message);
          this.notifierService.notify('error', error.data.Message);
        }
      );
  }
}
