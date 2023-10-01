import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { BsModalService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-juizo',
  templateUrl: './juizo.component.html',
  styleUrls: ['./juizo.component.scss']
})
export class JuizoComponent implements OnInit {

  registros: any;
  loading = true;
  formulario: FormGroup;
  sub: Subscription[] = [];

  constructor(
    private restangular: Restangular,
    private modalService: BsModalService,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      motivo: [null, Validators.required],
    })
  }

  ngOnInit() {
    this.restangular.one('judicial/juizo').get().subscribe((response) => {
      this.registros = response.data;
      this.loading = false;
    },
    () => this.loading = false);
  }

  edit(id) {
    this.router.navigate(['/update-juizo', id], { relativeTo: this.route });
  }

  delete(id){
    this.confirmationService
    .create('Atenção', 'Deseja realmente remover esse registro?')
    .subscribe((ans: ResolveEmit) => {
      if (ans.resolved) {

        this.sub.push(
          this.restangular
            .one(`judicial/juizo`, id)
            .remove()
            .subscribe(
              () => {
                this.notifierService.notify(
                  'success',
                  'Registro excluido com sucesso'
                );

                this.registros = this.registros.filter((item) => item.juizoId !== id);
              },
              (e) => {
                this.notifierService.notify(
                  'Erro ao excluir registro',
                  e.data.Message
                );
              }
            )
        );
      }
    })
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }

}
