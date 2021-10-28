import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import * as moment from 'moment';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-update-empresa',
  templateUrl: './update-empresa.component.html',
  styleUrls: ['./update-empresa.component.scss']
})
export class UpdateEmpresaComponent implements OnInit {

  formulario:FormGroup
  empresa
  id

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
    private route: ActivatedRoute,

  ) { 
    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]

    this.restangular.one("empresa").get().subscribe((response) => {
      this.id = this.route.snapshot.params['id']
      const empresa = response.data
      console.log(empresa)
      let empresaCorrespondente = empresa.filter(x =>x.empresaId == this.id )
      this.updateForm(empresaCorrespondente)
      console.log(empresaCorrespondente)
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
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return
    }
    this.restangular.all('empresa').customPUT(this.formulario.value,  this.id ).subscribe(a => {
      this.notifierService.notify('success', 'Empresa alterada com sucesso');
      // this.router.navigateByUrl('/empresa');
    },
    error => {
      this.notifierService.notify('error', 'Erro ao atualizar a empresa!');
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
    })
  }
  updateForm(dados){
    this.formulario.patchValue({
      ativo:dados[0].ativo,
      cnpj:dados[0].cnpj,
      codigoTributarioMunicipio:dados[0].codigoTributarioMunicipio,
      dataCadastro:dados[0].dataCadastro,
      empresaId:dados[0].empresaId,
      endereco: {
        enderecoId: dados[0].endereco ? dados[0].endereco.enderecoId : 0,
        cep: dados[0].endereco ? dados[0].endereco.cep : '',
        numero: dados[0].endereco ? dados[0].endereco.numero : '',
        complemento: dados[0].endereco ? dados[0].endereco.complemento : '',
        bairro: dados[0].endereco ? dados[0].endereco.bairro : '',
        cidade: dados[0].endereco ? dados[0].endereco.cidade : '',
        estado: dados[0].endereco ? dados[0].endereco.estado : '',
        logradouro: dados[0].endereco ? dados[0].endereco.logradouro : ''
      },
      grupoEconomico:dados[0].grupoEconomico,
      grupoEconomicoId:dados[0].grupoEconomicoId,
      inscricaoEstadual:dados[0].inscricaoEstadual,
      inscricaoMunicipal:dados[0].inscricaoMunicipal,
      nomeFantasia:dados[0].nomeFantasia,
      razaoSocial:dados[0].razaoSocial,
      telefone:dados[0].telefone,
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
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return {'has-error': this.verificaValidTouched(campo) }
  }

}
