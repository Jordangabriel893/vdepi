import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as moment from 'moment';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';

@Component({
  selector: 'app-create-empresa',
  templateUrl: './create-empresa.component.html',
  styleUrls: ['./create-empresa.component.scss']
})
export class CreateEmpresaComponent implements OnInit {

  formulario:FormGroup
  empresa

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
    this.restangular.one("empresa").get().subscribe((response) => {
      this.empresa = response.data
      console.log(this.empresa)
     })
    this.formulario = this.formBuilder.group({
      ativo:[null, Validators.required],
      cnpj:[null, Validators.required],
      codigoTributarioMunicipio:[null, Validators.required],
      dataCadastro:[moment().format()],
      empresaId:[0],
      endereco: this.formBuilder.group({
        enderecoId: [0],
        cep: [null, [Validators.required]],
        numero: [null, Validators.required],
        complemento: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        logradouro:[null, Validators.required]
      }),
      grupoEconomico:[null, Validators.required],
      grupoEconomicoId:[0],
      inscricaoEstadual:[null, Validators.required],
      inscricaoMunicipal:[null, Validators.required],
      nomeFantasia:[null, Validators.required],
      razaoSocial:[null, Validators.required],
      telefone:[null, Validators.required],
    })
  }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.formulario.value)
    this.restangular.all('empresa').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Empresa criada com sucesso');
      this.router.navigate(['/empresa']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar a empresa!');

        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
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
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return {'has-error': this.verificaValidTouched(campo) }
  }
}
