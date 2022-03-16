import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { ComponentService } from 'app/_services';
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
  leiloes: Model.Leilao[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private restangular: Restangular,
    private componentService: ComponentService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      leilao:[null],


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
    this.router.navigate(['/edit-listacontatos', id], { relativeTo: this.route });
  }
}
