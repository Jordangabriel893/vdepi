import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-edit-tiponotificacao',
  templateUrl: './edit-tiponotificacao.component.html',
  styleUrls: ['./edit-tiponotificacao.component.scss']
})
export class EditTiponotificacaoComponent implements OnInit {
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
      empresaId: [null, Validators.required],
      statusId: [null, Validators.required],
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
    // return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
