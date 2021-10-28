import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-update-comitente',
  templateUrl: './update-comitente.component.html',
  styleUrls: ['./update-comitente.component.scss']
})
export class UpdateComitenteComponent implements OnInit {
  formulario:FormGroup
  comitente
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
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params['id']

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]

    this.restangular.one("comitente", this.id).get().subscribe((response) => {
      this.updateForm(response.data);
     })

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
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }
    this.restangular.all('comitente').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Comitente editado com sucesso');
      this.router.navigate(['/comitente']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar o Comitente!');
        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  updateForm(dados){
    this.formulario.patchValue({
      cnpj:dados.cnpj,
      ativo:dados.ativo,
      comitenteId:dados.comitenteId,
      dataCadastro:dados.dataCadastro,
      nome:dados.nome,
      razaoSocial:dados.razaoSocial,
    })
  }
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return {'has-error': this.verificaValidTouched(campo) }
  }

}
