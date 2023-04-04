import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-gerenciador-documentos',
  templateUrl: './gerenciador-documentos.component.html',
  styleUrls: ['./gerenciador-documentos.component.scss']
})
export class GerenciadorDocumentosComponent implements OnInit, OnDestroy {
  formulario: FormGroup
  documentos;
  loading;
  sub: Subscription[] = [];
  nomeLeilao:any = 'Leilões';
  enviando = false;
  queryField = new FormControl();
  documentosFiltrados = [];
  showItens;
  leilao;
  blockchainInfo;
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private restangular: Restangular,
    private formBuilder: FormBuilder) { }

   ngOnInit() {
     this.formulario =  this.formBuilder.group({
      selectAll:[false],
      enviarFaturas:this.formBuilder.array([]),
      statusControl:[null]
    })
  }

  setLeilao(leilao){
    this.leilao = leilao;
    this.buscarDocumentos();
  }

  buscarDocumentos() {
    this.loading = true;
    this.sub.push(
      this.restangular.one(`documentoLote`).get({leilaoId: this.leilao.id}).subscribe(
        dados =>{
          this.documentos = dados.data;
          this.documentosFiltrados = dados.data;
        this.loading = false;
        }
      )
    )
  }

  refresh() {
    this.documentosFiltrados = null;
    this.buscarDocumentos();
  }

  mostrarInfoBlockchain(template: TemplateRef<any>, blockchain) {
    this.blockchainInfo = blockchain;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg'});
  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.documentosFiltrados);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Faturas');

    /* save to file */
    XLSX.writeFile(wb, 'Faturas.xlsx');
  }

  onSearch(){
      let value = this.queryField.value.toLowerCase();

      this.documentosFiltrados = this.documentos.filter(x => x.arrematante.toLowerCase().includes(value));
  }

  filtrarDocumentos(){
    const form = this.formulario.value
    if(form.statusControl == 0){
      this.documentosFiltrados = this.documentos
    }else{
      this.documentosFiltrados = this.documentos.filter(doc => doc.statusId == form.statusControl);
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
