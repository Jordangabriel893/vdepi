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

    this.documentos = [
      {
        documentoId: 1,
        dataCadastro: moment().subtract(5, 'day'),
        numeroLote: 1,
        loteId: 123,
        arrematante: 'LEONARDO LIRA',
        tipoDocumento: 'AUTO DE ARREMATAÇÃO',
        assinantes: [
          'Sergio Mendes',
          'Sandra Farias'
        ],
        statusId: 1,
        status: 'PENDENTE',
        dataAssinatura: moment()
      }
    ];

    this.documentosFiltrados = this.documentos;
  }

  setLeilao(idLeilao){
    this.leilaoId = idLeilao;
    this.loading = true;
    // this.sub.push(
    //   this.restangular.one(`fatura?leilaoId=${idLeilao.id}`).get().subscribe(
    //   dados =>{
    //     this.documentos = dados.data;
    //     this.documentosFiltradas = dados.data;
    //     this.nomeLeilao = idLeilao.nome;
    //     this.loading = false
    //     this.formulario = this.formBuilder.group({
    //       enviarFaturas:this.formBuilder.array(dados.data ? dados.data.map(x => this.formBuilder.group({ faturaId:x.faturaId, valor: false })) : [], Validators.required),
    //       selectAll:[false],
    //       statusControl:[0]
    //     })
    //   }
    // )
    // )
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

      this.documentosFiltrados =
        this.documentos.filter(x => x.nomeArrematante.toLowerCase().includes(value) ||
                                  x.cpfArrematante.includes(value) ||
                                  x.cpfArrematante.replace('.', '').replace('-', '').replace('/', '').includes(value) ||
                                  x.itens.some(i => i.descricao.toLowerCase().includes(value))
                                  );
  }

  filtrarFaturas(){
    const statusControl = this.formulario.value.statusControl
    if(statusControl == '0'){
      this.documentosFiltrados = this.documentos
      return
    }

    this.documentosFiltrados =  this.documentosFiltrados.filter(fatura => fatura.status == statusControl);
  }

  showItensFatura(faturaId){
    this.showItens = faturaId;
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
