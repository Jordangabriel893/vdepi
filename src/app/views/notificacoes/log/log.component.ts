import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { PdfService } from 'app/_services/pdf.service';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})

export class LogComponent implements OnInit, OnDestroy {
  id;
  filtro: FormGroup;
  notificacao;
  modalRef: BsModalRef;
  tableLog;
  loading = true;
  sub: Subscription[] = [];
  dataEnvio;
  mensagem;
  logsDefault;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private pdfService: PdfService,
  ) {
    this.id = this.route.snapshot.params['id'];
    this.sub.push(
    this.restangular.all('marketing/notificacao').get(this.id).subscribe(dados => {
      this.notificacao = dados.data.titulo;
    })
    )
    this.sub.push(
    this.restangular.one(`marketing/notificacaoLog`).get({NotificacaoId:this.id}).subscribe(
      dados =>{
        dados.data.map(campos => {
          if(campos.dataAbertura ){
            campos.dataAbertura =  moment(campos.dataAbertura ).format("DD/MM/YYYY")
          }
          if(campos.dataClicado ){
            campos.dataClicado = moment(campos.dataClicado ).format("DD/MM/YYYY")
          }
          if(campos.dataEnvio ){
            campos.dataEnvio = moment(campos.dataEnvio ).format("DD/MM/YYYY")
          }
          return campos
        })
        this.logsDefault = dados.data;
        this.tableLog = dados.data;
        this.dataEnvio = dados.data.map(resp => resp.dataEnvio);
        this.loading = false;
      },
      () => this.loading = false
    )
    )
  }

  ngOnInit() {
    this.filtro =  this.formBuilder.group({
      data:[null],
      email:[null],
    })
  }

  openModal(template: TemplateRef<any>, mensagem) {
    this.mensagem = mensagem;
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  onValueChange(event, campo) {
    this.filtro.get(campo).markAsTouched();
    this.filtro.get(campo).setValue(event);
    this.filtrar();
  }

  filtrar() {
    const data = this.filtro.controls["data"].value;
    let logsFiltrados = this.logsDefault;
    if(data) {
      const dataFormatada = moment(data).format("DD/MM/YYYY");
      logsFiltrados = logsFiltrados.filter(item => moment(item.dataEnvio).format("DD/MM/YYYY") == dataFormatada)
    }
    this.tableLog = logsFiltrados
  }

  onSearch() {
    const email = this.filtro.controls["email"].value
    if(email.length > 3) {
      let value = email.toLowerCase();

      this.tableLog =
        this.logsDefault.filter(x => x.destinatario.toLowerCase().includes(value));
    }
    else {
      this.tableLog = this.logsDefault;
    }
  }
  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableLog);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Logs');

    /* save to file */
    XLSX.writeFile(wb, 'Logs.xlsx');
}

exportAsPDF() {
  let columns = [
    { title: "Email ", dataKey: "destinatario" },
    { title: "Entregue", dataKey: "entregue" },
    { title: "Data Envio", dataKey: "dataEnvio" },
    { title: "Aberto", dataKey: "aberto" },
    { title: "Data Abertura", dataKey: "dataAbertura" },
    { title: "Clicado", dataKey: "clicado" },
    { title: "Data Clicado", dataKey: "dataClicado" },
    { title: "Erro", dataKey: "erro" },
    { title: "Mensagem Erro", dataKey: "mensagemErro" },
  ];

  const columStyles = {
    destinatario: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
    entregue: { columnWidth: 'auto', overflow: 'visible', valign: 'middle', halign: 'left' },
    dataEnvio: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
    aberto: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
    dataAbertura: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
    clicado: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },
    dataClicado: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
    erro: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },
    mensagemErro: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },
  };

  const rows = this.tableLog.map(e => {
    return {
      destinatario: e.destinatario || "",
      entregue: e.entregue || "",
      dataEnvio: e.dataEnvio || "",
      aberto: e.aberto || "",
      dataAbertura: e.dataAbertura || "",
      clicado: e.clicado || "",
      dataClicado: e.dataClicado|| "",
      erro:  e.erro || "",
      mensagemErro: e.mensagemErro || "",

    }
  });

  const header = {
    leilao: this.notificacao
  }

  this.pdfService.exportPdf('Logs', "Logs", rows, columns, columStyles, header, null);
}


  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
