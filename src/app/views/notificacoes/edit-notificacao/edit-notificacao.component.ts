import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-edit-notificacao',
  templateUrl: './edit-notificacao.component.html',
  styleUrls: ['./edit-notificacao.component.scss']
})
export class EditNotificacaoComponent implements OnInit {
  id;
  empresas: any;
  formulario:FormGroup;
  status: any;
  minDate: Date;
  listaContato;
  tipoMeioNotifi;
  tipoDeNotifi;
  templateNotifi;
  leilao;
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,

  ) {
    localeService.use('pt-br');
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.restangular.one('marketing/ListaContato').get().subscribe(
      dados =>{
        this.listaContato= dados.data

      }
    )
    this.restangular.one('marketing/tipoNotificacao').get().subscribe(
      dados =>{
        this.tipoDeNotifi= dados.data

      }
    )
    this.restangular.one('marketing/tipoMeioNotificacao').get().subscribe(
      dados =>{
        this.tipoMeioNotifi= dados.data

      }
    )
    this.restangular.one('marketing/templateNotificacao').get().subscribe(
      dados =>{
        this.templateNotifi= dados.data
      }
    )
    this.restangular.one('leilao').get().subscribe(
      dados =>{
        this.leilao= dados.data
        console.log(dados.data)
      }
    )
    this.restangular.all('marketing/notificacao').get(this.id).subscribe(dados => {
      this.updateForm(dados.data)
      console.log(dados.data)
    })



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

    this.restangular.all('marketing/notificacao').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Notificação editado com sucesso');
      this.router.navigate(['/notificacoes']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar notificação!');
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
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
  updateForm(dados) {

    this.formulario = this.formBuilder.group({
      notificacaoId: [dados.notificacaoId, Validators.required],
      titulo: [dados.titulo, Validators.required],
      tipoMeioNotificacaoId: [dados.tipoMeioNotificacaoId, Validators.required],
      tipoNotificacaoId: [dados.tipoNotificacaoId, Validators.required],
      listaContatoId: [dados.listaContatoId, Validators.required],
      leilaoId: [dados.leilaoId, Validators.required],
      templateId: [dados.templateId, Validators.required],
      ativo: true


    })
  }

  desativar(){
    this.restangular.all('marketing/notificacao/Desativar').customPUT( '',this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Notificação desativada com sucesso');
      this.router.navigate(['/listacontatos']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao desativar notificação!');

      });
  }
}
