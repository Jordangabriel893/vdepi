import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-conta',
  templateUrl: './create-conta.component.html',
  styleUrls: ['./create-conta.component.scss']
})
export class CreateContaComponent implements OnInit, OnDestroy  {
  context = {
    message: 'Hello there!'
  };
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  formulario:FormGroup
  empresa
  gruposEconomico;
  empresas;
  sub: Subscription[] = [];

  public mask: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private cepService: ConsultaCepService,
  ) {

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]


  }

  ngOnInit() {

   this.sub.push(
    this.restangular.one('empresa').get().subscribe(
      dados =>{
        //  this.empresas = dados.data
        console.log(dados.data)
        this.empresas = dados.data
      }
    )
   )
    this.formulario = this.formBuilder.group({
      nome:[null, Validators.required],
      email:[null, Validators.required],
      senha:[null, Validators.required],
      telefone:[null, Validators.required],
      ativo:[true],
      endereco: this.formBuilder.group({
        enderecoId: [0],
        cep: [null],
        numero: [null],
        complemento: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
        logradouro:[null]
      } ),
      empresas:[null, Validators.required]
    })
  }
  onSubmit(){
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    this.restangular.all('conta').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Conta criada com sucesso');
      this.router.navigate(['/conta']);
    },
      err => {
        this.notifierService.notify('error', 'Erro ao criar conta');
      });
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
    this.sub.push(
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados))
    )
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
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return {'has-error': this.verificaValidTouched(campo) }
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
