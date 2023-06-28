import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios:any;
  usuariosFiltrados;
  loading = true;
  queryField = new FormControl();
  modalRef: BsModalRef;
  formulario: FormGroup;
  usuarioBloqueado: number;
  sub: Subscription[] = [];

  constructor(
    private restangular: Restangular,
    private modalService: BsModalService,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.formulario = this.formBuilder.group({
      motivo:[null, Validators.required],
    })
  }

  ngOnInit() {
    this.restangular.one("usuario").get().subscribe((response) => {
      this.usuarios = response.data;
      this.usuariosFiltrados = response.data;
      this.loading = false;
    },
    () => this.loading = false);

    this.queryField.valueChanges.subscribe(() => {
      this.onSearch();
    })
  }
  edit(id) {
    this.router.navigate(['/update-usuarios', id], { relativeTo: this.route });
  }

  modalBloquear(usuarioId: number, template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'})
    this.usuarioBloqueado = usuarioId;
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }

  bloquear(){
    this.sub.push(
      this.confirmationService
        .create("Atenção", "Deseja realmente bloquear o usuário?")
        .subscribe((ans: ResolveEmit) => {
          if (ans.resolved) {

            const body = {
              usuarioId: this.usuarioBloqueado,
              motivo: this.formulario.value.motivo,
            }

            this.sub.push(
              this.restangular
                .all(`usuario/bloquear`)
                .post(body)
                .subscribe(
                  () => {
                    this.notifierService.notify(
                      "success",
                      "Usuario bloqueado com sucesso"
                    );
                    
                    this.formulario.reset();

                    this.usuarios.find(x => x.usuarioId === body.usuarioId).ativo = false
                    
                    this.modalRef.hide();
                  },
                  (e) => {
                    this.notifierService.notify(
                      "error",
                      e.data.Message
                    );

                    this.formulario.reset();
                    
                    this.modalRef.hide();
                  }
                )
            );
          }
        })
    );

    return;
  }

  onSearch() {
    if(this.queryField.value.length > 3) {
      let value = this.queryField.value.toLowerCase();

      this.usuariosFiltrados =
        this.usuarios.filter(x => x.nomeCompleto.toLowerCase().includes(value) ||
                                  (x.numeroDocumento && x.numeroDocumento.replace('.', '').replace('-', '').replace('/', '').includes(value.replace('.', '').replace('-', '').replace('/', ''))) ||
                                  x.email.toLowerCase().includes(value));
    }
    else {
      this.usuariosFiltrados = this.usuarios;
    }
  }

}
