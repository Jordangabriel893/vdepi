import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as moment from 'moment';
import { ConsultaCepService } from '../shared/consulta-cep/consulta-cep.service';
import { FormValidations } from '../shared/form-validation/form-validations';
@Component({
  selector: 'app-update-usuarios',
  templateUrl: './update-usuarios.component.html',
  styleUrls: ['./update-usuarios.component.scss']
})
export class UpdateUsuariosComponent implements OnInit {
  formulario:FormGroup
  id:any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private cepService: ConsultaCepService,    
  ) {
    this.formulario = this.formBuilder.group({
      nomeCompleto: [null, Validators.required],
      numeroDocumento: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      telefone: [null,[Validators.required]],
      genero: [null,[Validators.required]],
      tipoPessoa: [null,[Validators.required]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required,  FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        logradouro:[null, Validators.required],
        apelido:[null, Validators.required],
        pontoReferencia:[null, Validators.required],
        enderecoPrincipal:[true]
      }),
      email:[null,[Validators.required, Validators.email]],
      senha: [null,[Validators.required]],
      ativo: [null,[Validators.required]],
      identityId:["null"],
      returnUrl:["null"],
      perfil:this.formBuilder.group({
        descricao:[null],
        escopos:[null],
      })
    })
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
   console.log(this.id )
   this.restangular.all('usuario').get( this.id).subscribe(dados => {
     
     console.log(dados.data),
     this.updateForm(dados.data)
   })
  }

  onSubmit(){

    console.log(this.formulario.value)
    console.log(this.id)
    this.restangular.all('usuario').customPUT(this.formulario.value,  this.id ).subscribe(a => {
      this.notifierService.notify('success', 'Usuário alterado com sucesso');
      this.router.navigateByUrl('/usuarios');
    },
    error => {
      this.notifierService.notify('error', 'Erro ao atualizar o usuário!');
    })
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }
  populaDadosForm(dados) {
    // this.formulario.setValue({});

    this.formulario.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }
  updateForm(dados) {
    this.formulario.patchValue({
      nomeCompleto: dados.nomeCompleto,
      numeroDocumento: dados.numeroDocumento,
      dataNascimento: moment(dados.dataNascimento).format("YYYY-MM-DD"),
      telefone: dados.telefone,
      genero: dados.genero,
      tipoPessoa: dados.tipoPessoa,
      endereco: {
        cep: dados.cep,
        numero: dados.numero,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.cidade,
        logradouro: dados.logradouro,
        apelido: dados.apelido,
        pontoReferencia: dados.pontoReferencia,
        

        },
      email: dados.email,
      senha: dados.senha,
      ativo: dados.ativo,
      identityId: dados.identityId,
      perfil: {
      descricao: dados.perfil.descricao,
      escopos:dados.perfil.escopos
      }
      
    })
    
  }

  

}
