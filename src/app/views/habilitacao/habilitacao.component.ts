import { Component, OnInit, TemplateRef } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-habilitacao',
  templateUrl: './habilitacao.component.html',
  styleUrls: ['./habilitacao.component.scss']
})
export class HabilitacaoComponent implements OnInit {
  formulario: FormGroup
  habilitacao: any
  //modal
  openPopup: boolean = true
  isCollapsed = false;
  message = 'expanded';
  modalRef: BsModalRef;
  solicitacaoHabilitacaoId: any
  posicaoI:any

  documentosUsuario:any

  constructor(
    private restangular: Restangular,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      limiteCredito:[null, Validators.required],
      observacao:[null]
    })
  }

  ngOnInit() {
    this.restangular.one("habilitacao").get().subscribe((response) => {
      console.log(response.data)
      this.habilitacao = response.data;
    });
  }
  //submit
  aprovar(solicitacaoHabilitacaoId, i) {
    this.documentosUsuario = this.habilitacao[i]
    this.documentosUsuario.habilitado = true
    this.restangular.all(`habilitacao/${solicitacaoHabilitacaoId}/aprovar`).post(this.documentosUsuario).subscribe(a =>console.log(a) )
  }
  aprovarLimiteDeCredito(){
    this.documentosUsuario = this.habilitacao[this.posicaoI]
    this.solicitacaoHabilitacaoId = this.habilitacao[this.posicaoI].solicitacaoHabilitacaoId
    this.documentosUsuario.limiteCredito = this.formulario.value.limiteCredito
    this.documentosUsuario.observacao = this.formulario.value.observacao
    this.documentosUsuario.habilitado = true
    console.log(this.documentosUsuario)
    this.restangular.all(`habilitacao/${this.solicitacaoHabilitacaoId}/aprovar`).post(this.documentosUsuario).subscribe(a =>console.log(a) )
  }

  //modal
  openModal(template: TemplateRef<any>, i) {
    this.modalRef = this.modalService.show(template);
    this.documentosUsuario = this.habilitacao[i]
    this.posicaoI = i
  }

  collapsed(): void {
    this.message = 'collapsed';
  }

  collapses(): void {
    this.message = 'collapses';
  }

  expanded(): void {
    this.message = 'expanded';
  }

  expands(): void {
    this.message = 'expands';
  }

 

}
