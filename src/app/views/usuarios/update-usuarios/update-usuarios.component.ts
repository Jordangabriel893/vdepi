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
  selector: 'app-update-usuarios',
  templateUrl: './update-usuarios.component.html',
  styleUrls: ['./update-usuarios.component.scss']
})
export class UpdateUsuariosComponent implements OnInit {
  formulario:FormGroup
  id:any
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
  loteArrematados = [];
  lances = [];
  bloqueios = [];
  faturas = [];
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
        enderecoId: [null],
        cep: [null],
        numero: [null],
        complemento: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
        logradouro:[null]
      }),
      email:[null,[Validators.required, Validators.email]],
      ativo: [null,[Validators.required]],
      perfis:[[], Validators.required],
      empresas:[[]],
      comitentes:[[]],
      leiloeiros:[[]],
      rg: [null],
      dataEmissao: [null],
      orgaoEmissor: [null],
      emailConfirmado: [null],
    })
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    forkJoin([
      this.restangular.one("empresa").get().pipe(),
      this.restangular.one("leiloeiro").get().pipe(),
      this.restangular.one("comitente").get().pipe(),
      this.restangular.one("usuario/perfis").get().pipe(),
      this.restangular.one("usuario/loteArrematados/" + this.id).get().pipe(),
      this.restangular.one("usuario/lances/" + this.id).get().pipe(),
      this.restangular.one("usuario/bloqueios/" + this.id).get().pipe(),
      this.restangular.one("usuario/faturas/" + this.id).get().pipe()
    ]).subscribe((allResp: any[]) => {
      this.empresas = allResp[0].data
      this.leiloeiros = allResp[1].data
      this.comitentes = allResp[2].data
      this.perfis = allResp[3].data
      this.loteArrematados = allResp[4].data
      this.lances = allResp[5].data
      this.bloqueios = allResp[6].data
      this.faturas = allResp[7].data
    })
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
    this.formulario.patchValue({
      endereco: {
        logradouro: dados.logradouro,
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
      dataNascimento: dados.dataNascimento ? moment.utc(dados.dataNascimento).local().toDate() : '',
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
      perfis: dados.perfis,
      empresas: dados.empresas,
      leiloeiros: dados.leiloeiros,
      comitentes: dados.comitentes,
      rg: dados.rg,
      dataEmissao: dados.dataEmissao ? moment.utc(dados.dataEmissao).local().toDate() : '',
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  mostrarQuandoPerfil(...args: string[]) {
    const perfis = this.perfis.filter(x => args.includes(x.descricao)).map(x => x.perfilUsuarioId);
    return this.formulario.controls.perfis.value.some(x => perfis.includes(x));
  }

  desbloquear(bloqueioId: number){

    const body = {
      bloqueioId
    }

    this.restangular
        .all(`usuario/desbloquear`)
        .post(body)
        .subscribe(
          () => {

            this.notifierService.notify(
              "success",
              "Usuario bloqueado com sucesso"
            );

            this.restangular.one("usuario/bloqueios/" + this.id).get().subscribe(dados => {
              this.bloqueios = dados.data
            })
          },
          (e) => {
            this.notifierService.notify(
              "error",
              e.data.Message
            );
          }
        )
  }
}
