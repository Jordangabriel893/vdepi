import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-agendamento',
  templateUrl: './create-agendamento.component.html',
  styleUrls: ['./create-agendamento.component.scss']
})
export class CreateAgendamentoComponent implements OnInit {

  leiloes: any;
  loadingLotes = false;
  formulario: FormGroup;
  lotes = [];
  hasLotes = false;

  constructor(
    private restangular: Restangular,
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private notifierService: NotifierService,
    private router: Router,
  ){
      localeService.use('pt-br');
  }

  sub: Subscription[] = [];

  ngOnInit(): void {
    this.sub.push(
      this.restangular
        .one("admin/leilao")
        .get()
        .subscribe((dados) => {
          this.leiloes = dados.data;
        })
    );
    
    this.formulario = this.formBuilder.group({
      leilaoId: [null, [Validators.required]],
      loteId: [null, [Validators.required]],
      dataAgendamento: [null, [Validators.required]]
    });
  }
  
  setLeilao() {
    this.loadingLotes = true;
    const leilao = this.formulario.value.leilaoId;
    this.sub.push(
      this.restangular
        .one("lote/numeros")
        .get({ leilaoId: leilao, statusId: 5 })
        .subscribe((dados) => {
          this.lotes = dados.data;
          this.hasLotes = true;
          this.loadingLotes = false;
        })
    );
  }

  onSubmit(){
    this.restangular
      .all("agendamento")
      .post(this.formulario.value)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            "success",
            "Agenda criada com sucesso"
          );
          this.router.navigate(["/agendamento"]);
        },
        (error) => {
          this.notifierService.notify("error", "Erro ao criar agenda!");
        }
      );
  }

  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  aplicaCssErroLista(campoArray, campo, i) {
    return { "has-error": this.verificaValidList(campoArray, campo, i) };
  }

  verificaValidList(campoArray, campo, i) {
    var lista = this.formulario.get(campoArray) as FormArray;
    var item = lista.controls[i] as FormGroup;
    return !item.get(campo).valid;
  }

  aplicaCssErro(campo) {
    return { "has-error": this.verificaValidTouched(campo) };
  }

  onValueChange(data, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(data);
  }

  ngOnDestroy(): void {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
