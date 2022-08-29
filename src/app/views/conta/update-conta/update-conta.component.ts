import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-update-conta',
  templateUrl: './update-conta.component.html',
  styleUrls: ['./update-conta.component.scss']
})
export class UpdateContaComponent implements OnInit, OnDestroy {
  context = {
    message: 'Hello there!'
  };
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  id;
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
    private route: ActivatedRoute,
  ) {

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]


  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
   this.sub.push(
    this.restangular.one("conta", this.id).get().subscribe((response) => {
      this.updateForm(response.data)
      })
   )
   this.sub.push( this.restangular.one('empresa').get().subscribe(
      dados =>{
        this.empresas = dados.data
      }
    )
   )
    // this.formulario = this.formBuilder.group({
    //   nome:[null, Validators.required],
    //   email:[null, Validators.required],
    //   senha:[null, Validators.required],
    //   telefone:[null, Validators.required],
    //   endereco: this.formBuilder.group({
    //     enderecoId: [0],
    //     cep: [null],
    //     numero: [null],
    //     complemento: [null],
    //     bairro: [null],
    //     cidade: [null],
    //     estado: [null],
    //     logradouro:[null]
    //   } ),
    //   empresas:[null, Validators.required]
    // })
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

    this.restangular.all('conta').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Conta editada com sucesso');
      this.router.navigate(['/conta']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao editar conta');
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
  updateForm(dados){
    this.formulario = this.formBuilder.group({
      contaId: [this.id],
      nome: [dados.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email:[dados.email,[Validators.required, Validators.email]],
      telefone: [dados.telefone, [Validators.required, Validators.minLength(3)]],
      endereco: this.formBuilder.group({
        enderecoId: [dados.endereco.enderecoId],
            cep: [dados.endereco.cep],
            numero: [dados.endereco.numero],
            complemento: [dados.endereco.complemento],
            bairro: [dados.endereco.bairro],
            cidade: [dados.endereco.cidade],
            estado: [dados.endereco.estado],
            logradouro:[dados.endereco.logradouro]

      }),
      empresas:this.formBuilder.control([...dados.empresas]),
      senha:[null, Validators.required],
      usuarioId:[dados.usuarioId]
    });
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
