import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { Restangular } from 'ngx-restangular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-tipodocumento',
  templateUrl: './edit-tipodocumento.component.html',
  styleUrls: ['./edit-tipodocumento.component.scss']
})
export class EditTipodocumentoComponent implements OnInit {
  formulario:FormGroup
  templates = [];
  perfis = [];
  fieldTextType: boolean;
  hasAssinatura = false;
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private cepService: ConsultaCepService,
    
  ) {
    this.id = this.route.snapshot.params['id']
    this.formulario = this.formBuilder.group({
      tipoDocumentoLoteId:[this.id],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      possuiAssinatura: [false],
      templateId: [null, [Validators.required]],
      perfis:[[]],
    })
   }

  ngOnInit() {
    forkJoin([
      this.restangular.one("documentoLoteTemplate").get().pipe(),
      this.restangular.one("usuario/perfis").get().pipe(),
      this.restangular.one(`tipoDocumentoLote/${this.id}`).get().pipe(),
    ]).subscribe((allResp: any[]) => {
      this.templates = allResp[0].data
      this.perfis = allResp[1].data
      this.updateForm(allResp[2].data);
    })

  }

  onSubmit() {
    if(this.formulario.value.possuiAssinatura == true && this.formulario.value.perfis.length < 1){
      this.notifierService.notify('error', 'Selecione um assinante!');
      return
    }
    this.restangular.all('/TipoDocumentoLote').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Tipo de documento editado com sucesso');
      this.router.navigate(['/tipodocumento']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao editar o tipo de documento!');

        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      })
  }

  updateForm(dados) {
    this.hasAssinatura = dados.possuiAssinatura;
    this.formulario.patchValue({
      tipoDocumentoLoteId:dados.tipoDocumentoLoteId,
      nome: dados.nome,
      possuiAssinatura: dados.possuiAssinatura,
      templateId: dados.templateId,
      perfis:dados.perfis.map(perfil => perfil.perfilId),
    })
  }
  changeAssinatura(){
    this.hasAssinatura = this.formulario.value.possuiAssinatura
  }
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return{
      'has-error': this.verificaValidTouched(campo),

    }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
