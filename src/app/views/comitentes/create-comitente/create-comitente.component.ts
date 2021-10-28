import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as moment from 'moment';

@Component({
  selector: 'app-create-comitente',
  templateUrl: './create-comitente.component.html',
  styleUrls: ['./create-comitente.component.scss']
})
export class CreateComitenteComponent implements OnInit {
  formulario:FormGroup
  comitente
  public mask: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]

    this.formulario = this.formBuilder.group({
      cnpj:[null, Validators.required],
      ativo:[null, Validators.required],
      comitenteId:[0],
      nome:[null, Validators.required],
      razaoSocial:[null],
    })
  }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.formulario.value)
    this.restangular.all('comitente').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Comitente Criado com sucesso');
      this.router.navigate(['/comitente']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar o Comitente!');

        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return {'has-error': this.verificaValidTouched(campo) }
  }
}
