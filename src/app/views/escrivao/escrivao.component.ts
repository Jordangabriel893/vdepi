import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-escrivao',
  templateUrl: './escrivao.component.html',
  styleUrls: ['./escrivao.component.scss']
})
export class EscrivaoComponent implements OnInit {

  escrivaes: any;
  loading = true;
  modalRef: BsModalRef;
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
    this.restangular.one('judicial/escrivao').get().subscribe((response) => {
      this.escrivaes = response.data;
      this.loading = false;
    },
    () => this.loading = false);
  }

  edit(id) {
    this.router.navigate(['/update-escrivao', id], { relativeTo: this.route });
  }

  remove(id){
    this.confirmationService.create('Atenção!', 'Deseja realmente excluir este registro?')
    .subscribe((ans: ResolveEmit) => {
      if (ans.resolved) {
        this.restangular.one('judicial/escrivao', id).remove().subscribe((response) => {
          this.notifierService.notify('success', 'Registro excluído com sucesso!');
          this.ngOnInit();
        },
        (error) => {
          this.notifierService.notify('error', 'Não foi possível excluir o registro!');
        });
      }
    });
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }

}
