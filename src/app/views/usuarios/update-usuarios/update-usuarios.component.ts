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
  public mask: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>
  public maskRg: Array<string | RegExp>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private cepService: ConsultaCepService,
  ) {
    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]
    this.maskRg = [ /\d/,/\d/, '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/ ]
    this.formulario = this.formBuilder.group({
      usuarioId: [null, Validators.required],
      nomeCompleto: [null, [Validators.required, Validators.minLength(3)]],
      numeroDocumento: [null, [Validators.required, Validators.minLength(6)]],
      dataNascimento: [null],
      telefoneCelular: [null, [Validators.required, Validators.minLength(3)]],
      telefoneConvencional: [null],
      telefoneWhatsapp: [null],
      genero: [null],
      tipoPessoa: [null,[Validators.required]],
      endereco: this.formBuilder.group({
        enderecoId: [null, Validators.required],
        cep: [null, [Validators.required]],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        logradouro:[null, Validators.required]
      }),
      email:[null,[Validators.required, Validators.email]],
      ativo: [null,[Validators.required]],
      perfilId:[null],
      rg: [null, Validators.required],
      dataEmissao: [null],
      orgaoEmissor: [null],
      emailConfirmado: [null],
    })
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
   this.restangular.all('usuario').get( this.id).subscribe(dados => {
     this.updateForm(dados.data)
   })
  }

  onSubmit() {
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return
    }
    this.restangular.all('usuario').customPUT(this.formulario.value,  this.id ).subscribe(a => {
      this.notifierService.notify('success', 'Usuário atualizado com sucesso');
      this.router.navigateByUrl('/usuarios');
    },
    error => {
      this.notifierService.notify('error', 'Erro ao atualizar o usuário!');
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
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
      usuarioId: dados.usuarioId,
      nomeCompleto: dados.nomeCompleto,
      numeroDocumento: dados.numeroDocumento,
      dataNascimento: moment.utc(dados.dataNascimento).local().toDate(),
      telefoneCelular: dados.telefoneCelular,
      telefoneConvencional: dados.telefoneConvencional,
      telefoneWhatsapp: dados.telefoneWhatsapp,
      genero: dados.genero,
      tipoPessoa: dados.tipoPessoa,
      endereco: {
        enderecoId: dados.endereco ? dados.endereco.enderecoId : 0,
        cep: dados.endereco ? dados.endereco.cep : '',
        numero: dados.endereco ? dados.endereco.numero : '',
        complemento: dados.endereco ? dados.endereco.complemento : '',
        bairro: dados.endereco ? dados.endereco.bairro : '',
        cidade: dados.endereco ? dados.endereco.cidade : '',
        estado: dados.endereco ? dados.endereco.estado : '',
        logradouro: dados.endereco ? dados.endereco.logradouro : ''
      },
      email: dados.email,
      ativo: dados.ativo,
      perfilId: dados.perfilId,
      rg: dados.rg,
      dataEmissao: moment.utc(dados.dataEmissao).local().toDate(),
      orgaoEmissor: dados.orgaoEmissor,
      emailConfirmado: dados.emailConfirmado,
    })

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
