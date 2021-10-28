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
  gruposEconomico;

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

    this.id = this.route.snapshot.params['id']
    this.restangular.one("empresa", this.id).get().subscribe((response) => {
      this.updateForm(response.data)
    })

    this.restangular.one("GrupoEconomico").get().subscribe((response) => {
      this.gruposEconomico = response.data
    })

    this.formulario = this.formBuilder.group({
      ativo:[null, Validators.required],
      cnpj:[null, Validators.required],
      codigoTributarioMunicipio:[null],
      empresaId:[0],
      endereco: this.formBuilder.group({
        enderecoId: [0],
        cep: [null, [Validators.required]],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        logradouro:[null, Validators.required]
      }),
      grupoEconomicoId:[0],
      inscricaoEstadual:[null],
      inscricaoMunicipal:[null],
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
      this.router.navigate(['/empresa']);
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
      ativo:dados.ativo,
      cnpj:dados.cnpj,
      codigoTributarioMunicipio:dados.codigoTributarioMunicipio,
      empresaId:dados.empresaId,
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
      grupoEconomicoId:dados.grupoEconomicoId,
      inscricaoEstadual:dados.inscricaoEstadual,
      inscricaoMunicipal:dados.inscricaoMunicipal,
      nomeFantasia:dados.nomeFantasia,
      razaoSocial:dados.razaoSocial,
      telefone:dados.telefone,
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
