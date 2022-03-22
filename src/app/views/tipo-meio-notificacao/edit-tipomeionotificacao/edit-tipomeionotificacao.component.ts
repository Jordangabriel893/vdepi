import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-edit-tipomeionotificacao',
  templateUrl: './edit-tipomeionotificacao.component.html',
  styleUrls: ['./edit-tipomeionotificacao.component.scss']
})
export class EditTipomeionotificacaoComponent implements OnInit {
  id;
  empresas: any;
  formulario:FormGroup;
  status: any;

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
  ) {

   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.formulario = this.formBuilder.group({
      descricao: [null, Validators.required],
      statusId: [null, Validators.required],
    })
    this.restangular.all('marketing/tipomeionotificacao').get(this.id).subscribe(dados => {
      this.updateForm(dados.data);
      console.log(dados.data)
    }

    )
    this.restangular.one('empresa').get().subscribe(
      dados =>{
        this.empresas= dados.data
      }
    )
    this.restangular.all('leilao').one('status').get().subscribe(
      dados =>{
        this.status= dados.data
      }
    )

  }
  onSubmit(){
    // console.log(this.formulario.value)
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    this.restangular.all('marketing/tipomeionotificacao').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Tipo de notificação editado com sucesso');
      this.router.navigate(['/tipomeionotificao']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar tipo de notificação!');
        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  verificaValidTouched(campo){
    // return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
  updateForm(dados) {

    this.formulario.patchValue({
      descricao: dados.descricao,
    })
  }
}
