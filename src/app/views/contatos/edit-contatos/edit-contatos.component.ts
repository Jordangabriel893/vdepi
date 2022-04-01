import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-edit-contatos',
  templateUrl: './edit-contatos.component.html',
  styleUrls: ['./edit-contatos.component.scss']
})
export class EditContatosComponent implements OnInit {

  minDate;
  formulario:FormGroup
  empresa
  gruposEconomico;
  id;

  public mask: Array<string | RegExp>
  public maskTelefoneFixo: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private cepService: ConsultaCepService,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params['id']
    localeService.use('pt-br');
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskTelefoneFixo = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]

    this.restangular.one("GrupoEconomico").get().subscribe((response) => {
      this.gruposEconomico = response.data
    })
    this.formulario = this.formBuilder.group({
      contatoId:[this.id],
      email: [null, Validators.required],
      primeiroNome: [null, Validators.required],
      ultimoNome: [null, Validators.required],
      listaContatoId: [0, Validators.required],
      cep: [null],
      uf: [null],
      bairro: [null],
      cidade: [null],
      logradouro: [null],
      complemento:[null],
      numero:[null],
      telefoneWhatsapp: [null],
      telefoneConvencional: [null],
      telefoneCelular: [null, Validators.required],
    })
  }

  ngOnInit() {
    this.restangular.all('marketing/contato').get(this.id).subscribe(dados => {
      this.updateForm(dados.data);
      console.log(dados.data)
    })

  }
  onSubmit(){
    console.log(this.formulario.value)
    this.restangular.all('marketing/contato').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Contato criado com sucesso');
      this.router.navigate(['/contatos']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar o contato!');

        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  consultaCEP() {
    const cep = this.formulario.get('cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }
  populaDadosForm(dados) {
    // this.formulario.setValue({});

    this.formulario.patchValue({

        logradouro: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf

    });
  }
  updateForm(dados) {

    this.formulario.patchValue({
      email: dados.email,
      primeiroNome: dados.primeiroNome,
      ultimoNome: dados.ultimoNome,
      listaContatoId:dados.listaContatoId,
      cep: dados.cep,
      uf: dados.uf,
      bairro: dados.bairro,
      cidade: dados.cidade,
      logradouro: dados.logradouro,
      numero: dados.numero,
      telefoneWhatsapp: dados.telefoneWhatsapp,
      telefoneConvencional:dados.telefoneConvencional,
      telefoneCelular: dados.telefoneCelular,
      ativo:dados.ativo
    })
  }
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return {'has-error': this.verificaValidTouched(campo) }
  }
  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
  desativar(){
    this.restangular.all('marketing/contato/Desativar').customPUT( '',this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Contato desativado com sucesso');
      this.router.navigate(['/listacontatos']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao desativar contato!');

      });
  }
}
