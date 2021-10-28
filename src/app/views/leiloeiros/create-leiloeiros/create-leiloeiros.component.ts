import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { Restangular } from 'ngx-restangular';
import * as moment from 'moment';

@Component({
  selector: 'app-create-leiloeiros',
  templateUrl: './create-leiloeiros.component.html',
  styleUrls: ['./create-leiloeiros.component.scss']
})
export class CreateLeiloeirosComponent implements OnInit {
  formulario:FormGroup
  leiloeiros
  public mask: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>
  
  constructor( 
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private cepService: ConsultaCepService
  ) { 
    this.restangular.one("leiloeiro").get().subscribe((response) => {
      this.leiloeiros = response.data
      console.log(this.leiloeiros)
     })
    

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]

    this.formulario = this.formBuilder.group({
      dataCadastro:[moment().format()],
      ativo:[null, Validators.required],    
      pessoaId:[0],  
      comissao:[null, Validators.required],
      pessoa: this.formBuilder.group({
        dataNascimento:[null, Validators.required],
        documentos:[],
        enderecos:[null, Validators.required],
        genero:[null, Validators.required],
        nomeCompleto:[null, Validators.required],
        pessoaId:[0],
        telefone:[null,Validators.required],
        tipoPessoa:[null,Validators.required]
      })
    })
  }

  ngOnInit() {
  }
  onSubmit(){
    // console.log(this.formulario.value)
    // this.restangular.all('local').post(this.formulario.value).subscribe(a => {
    //   this.notifierService.notify('success', 'Local Criado com sucesso');
    //   this.router.navigate(['/local']);
    // },
    //   error => {
    //     this.notifierService.notify('error', 'Erro ao criar o Local!');

    //     Object.keys(this.formulario.controls).forEach((campo)=>{
    //       const controle = this.formulario.get(campo)
    //       controle.markAsTouched()
    //     })
    //   });
  }
  
  // consultaCEP() {
  //   const cep = this.formulario.get('endereco.cep').value;

  //   if (cep != null && cep !== '') {
  //     this.cepService.consultaCEP(cep)
  //     .subscribe(dados => this.populaDadosForm(dados));
  //   }
  // }
  // populaDadosForm(dados) {
  //   this.formulario.patchValue({
  //     endereco: {
  //       logradouro: dados.logradouro,
  //       complemento: dados.complemento,
  //       bairro: dados.bairro,
  //       cidade: dados.localidade,
  //       estado: dados.uf
  //     }
  //   });
  // }
  // verificaValidTouched(campo){
  //   return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  // }

  // aplicaCssErro(campo){
  //   return {'has-error': this.verificaValidTouched(campo) }
  // }
}
