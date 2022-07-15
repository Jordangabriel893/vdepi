import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit, OnDestroy {
  formulario: FormGroup
  loading = true;
  selectLeilao;
  agendas;
  leiloes: Model.Leilao[];
  sub: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      leilao:[null],


    })
   }


  ngOnInit() {
    this.sub.push(
      this.restangular.one('marketing/agendaNotificacao').get().subscribe(
      dados =>{

        this.agendas= dados.data
        this.loading = false;
      },
      () => this.loading = false
    )
    )


  }
  edit(id) {
    this.router.navigate(['/update-agenda', id], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
