import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as moment from 'moment';
import { ConsultaCepService } from '../shared/consulta-cep/consulta-cep.service';
import { FormValidations } from '../shared/form-validation/form-validations';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-create-usuarios',
  templateUrl: './create-usuarios.component.html',
  styleUrls: ['./create-usuarios.component.scss']
})
export class CreateUsuariosComponent implements OnInit {
  formulario:FormGroup
  public mask: Array<string | RegExp>
  public maskData: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>
  public maskRg: Array<string | RegExp>

  empresas = [];
  comitentes = [];
  leiloeiros = [];
  perfis = [];
  fieldTextType: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private cepService: ConsultaCepService,
  ) {
    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskData = [/\d/,/\d/,'/', /\d/, /\d/, '/', /\d/,/\d/,/\d/,/\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]
    this.maskRg = [ /\d/,/\d/, '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/ ]
    this.formulario = this.formBuilder.group({
      nomeCompleto: [null, [Validators.required, Validators.minLength(3)]],
      numeroDocumento: [null, [Validators.required, Validators.minLength(6)]],
      dataNascimento: [null],
      telefoneCelular: [null, [Validators.required, Validators.minLength(3)]],
      telefoneConvencional: [null],
      telefoneWhatsapp: [null],
      genero: [null],
      tipoPessoa: ['PF',[Validators.required]],
      endereco: this.formBuilder.group({
        cep: [null],
        numero: [null],
        complemento: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
        logradouro:[null]
      }),
      email:[null,[Validators.required, Validators.email]],
      senha: [null, Validators.required],
      ativo: [true,[Validators.required]],
      perfis:[[], Validators.required],
      empresas:[[]],
      comitentes:[[]],
      leiloeiros:[[]],
      rg: [null],
      dataEmissao: [null],
      orgaoEmissor: [null],
      emailConfirmado: [true],
    })
   }

  ngOnInit() {
    forkJoin([
      this.restangular.one("empresa").get().pipe(),
      this.restangular.one("leiloeiro").get().pipe(),
      this.restangular.one("comitente").get().pipe(),
      this.restangular.one("usuario/perfis").get().pipe()
    ]).subscribe((allResp: any[]) => {
      this.empresas = allResp[0].data
      this.leiloeiros = allResp[1].data
      this.comitentes = allResp[2].data
      this.perfis = allResp[3].data
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
    this.restangular.all('usuario/Registrar').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Usuário criado com sucesso');
      this.router.navigateByUrl('/usuarios');
    },
    error => {
      const errors = error.data.Errors;
      for(const k in errors) {
        if(k.toLowerCase() === 'exception') {
          this.notifierService.notify('error', 'Erro ao atualizar usuário');
        } else {
          this.notifierService.notify('error', errors[k]);
        }
      }

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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  mostrarQuandoPerfil(...args: string[]) {
    const perfis = this.perfis.filter(x => args.includes(x.descricao)).map(x => x.perfilUsuarioId);
    return this.formulario.controls.perfis.value.some(x => perfis.includes(x));
  }
}
