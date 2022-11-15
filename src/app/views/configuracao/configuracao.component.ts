import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoComponent implements OnInit {
  loading = true;
  configuracoes;
  constructor(
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private router: Router,
    private restangular: Restangular,
    private route: ActivatedRoute,
  ) {

   }

   ngOnInit() {
    this.restangular.one('agendamento/configuracao').get().subscribe(
      dados =>{
        this.configuracoes= dados.data
        this.loading = false;
      }
    )
  }
  edit(id) {
    this.router.navigate(['/update-configuracao', id], { relativeTo: this.route });
  }


}
