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

    this.formulario = this.formBuilder.group({
      tituloNotificacao: [null, Validators.required],
      tipoNotificacaoId: [null, Validators.required],
      tipoMeioNotificacaoId: [null, Validators.required],
      listaContatoId: [null, Validators.required],
      listagemContatos: [null, Validators.required],
      leilaoId: [null, Validators.required],
      usuarioId: [null, Validators.required],
      dataEnvio: [null, Validators.required],
      ativo: [null, Validators.required],
      templateId: [null, Validators.required],
    })
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


}
