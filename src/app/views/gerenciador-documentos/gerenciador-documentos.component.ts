import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

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
  leilaoId;
  siteUrl = environment.siteUrl;
  enviando = false;
  queryField = new FormControl();
  documentosFiltrados = [];
  showItens;
  constructor(
    private restangular: Restangular,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder) { }

   ngOnInit() {
     this.formulario =  this.formBuilder.group({
      selectAll:[false],
      enviarFaturas:this.formBuilder.array([]),
      statusControl:[null]
    })
  }

  setLeilao(idLeilao){
    this.leilaoId = idLeilao;
    this.loading = true;
    this.sub.push(
      this.restangular.one(`documentoLote/${idLeilao.id}`).get().subscribe(
      dados =>{
        this.documentos = dados.data;
        this.documentosFiltrados = dados.data;
       this.loading = false;
      }
    )
    )
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
      this.documentosFiltrados =  this.documentos
    }else{
      this.documentosFiltrados =  this.documentos.filter(doc => doc.statusId == form.statusControl);
    }
  }

  showItensFatura(faturaId){
    this.showItens = faturaId;
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
