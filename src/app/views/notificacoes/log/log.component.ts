import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { Subscription, Subject } from 'rxjs';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { PdfService } from 'app/_services/pdf.service';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})

export class LogComponent implements OnInit, OnDestroy {
  @ViewChild('iframe') iframe: ElementRef;
  @ViewChild('template', { read: ViewContainerRef }) template;
  data$: Subject<string> = new Subject();

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
  logsExcel;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor(
    private route: ActivatedRoute,
    private restangular: Restangular,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private pdfService: PdfService,
    private localeService: BsLocaleService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.sub.push(
      this.restangular.all('marketing/notificacao').get(this.id).subscribe(dados => {
        this.notificacao = dados.data.titulo;
      })
    )
    this.sub.push(
      this.restangular.one(`marketing/notificacaoLog`).get({ NotificacaoId: this.id }).subscribe(
        dados => {
          this.logsExcel = dados.data;
          this.logsDefault = dados.data;
          this.tableLog = dados.data;
          this.tableLog.map(campos => {
            if (campos.dataAbertura) {
              campos.dataAbertura = moment(campos.dataAbertura).format('DD/MM/YYYY')
            }
            if (campos.dataClicado) {
              campos.dataClicado = moment(campos.dataClicado).format('DD/MM/YYYY')
            }
            return campos
          })

          this.dataEnvio = dados.data.map(resp => resp.dataEnvio);
          this.loading = false;
        },
        () => this.loading = false
      )
    )

  }

  ngOnInit() {

    this.filtro = this.formBuilder.group({
      data: [],
      email: [null],
    })
    this.modalService.onShown.subscribe(() => {
      const iframe = document.getElementById('iframe')
      this.setIframeReady(iframe)
    })
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.applyLocale();
  }

  openModal(template: TemplateRef<any>, mensagem) {
    this.mensagem = mensagem;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  onValueChange(event, campo) {
    this.filtro.get(campo).markAsTouched();
    this.filtro.get(campo).setValue(event);
    this.filtrar();
  }

  filtrar() {
    const datas = this.filtro.controls['data'].value
    const de = datas[0]
    const ate = datas[1]
    let logsFiltrados = this.logsDefault;
    if (de && ate) {
      logsFiltrados = logsFiltrados.filter((item: any) => {
        const dataEnvioFormatada = moment(item.dataEnvio, moment.defaultFormat).toDate();
        return dataEnvioFormatada >= de && dataEnvioFormatada <= ate
      })

    }
    this.tableLog = logsFiltrados
  }

  onSearch() {
    const email = this.filtro.controls['email'].value
    if (email.length > 3) {
      const value = email.toLowerCase();

      this.tableLog =
        this.logsDefault.filter(x => x.destinatario.toLowerCase().includes(value));
    } else {
      this.tableLog = this.logsDefault;
    }
  }
  exportAsExcel() {
    const logs = [...this.logsExcel];
    logs.map(log => {
      const dataEnvioSemFormatacao = log.dataEnvio
      const dataEnvioFormatada = moment(dataEnvioSemFormatacao, moment.defaultFormat).toDate()
      const dataEnvio = moment(dataEnvioFormatada).format('DD/MM/YYYY')
      if (log.entregue || log.aberto || log.clicado || log.erro || log.reenvio) {
        log.entregue = log.entregue ? 'Sim' : 'Não';
        log.aberto = log.aberto ? 'Sim' : 'Não';
        log.clicado = log.clicado ? 'Sim' : 'Não';
        log.erro = log.erro ? 'Sim' : 'Não';
        log.reenvio = log.reenvio ? 'Sim' : 'Não';
        log.dataEnvio = dataEnvio || ''
      }

      return log
    })


    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(logs);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Logs');

    /* save to file */
    XLSX.writeFile(wb, 'Logs.xlsx');

    this.tableLog.forEach(item => {
      item.dataEnvio = moment(item.dataEnvio, 'DD/MM/YYYY').format()
    })
  }

  exportAsPDF() {
    const columns = [
      { title: 'Email ', dataKey: 'destinatario' },
      { title: 'Entregue', dataKey: 'entregue' },
      { title: 'Data Envio', dataKey: 'dataEnvio' },
      { title: 'Aberto', dataKey: 'aberto' },
      { title: 'Data Abertura', dataKey: 'dataAbertura' },
      { title: 'Clicado', dataKey: 'clicado' },
      { title: 'Data Clicado', dataKey: 'dataClicado' },
      { title: 'Erro', dataKey: 'erro' },
      { title: 'Mensagem Erro', dataKey: 'mensagemErro' },
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
        destinatario: e.destinatario || '',
        entregue: e.entregue ? 'Sim' : 'Não' || '',
        dataEnvio: moment(e.dataEnvio).format('DD/MM/YYYY') || '',
        aberto: e.aberto ? 'Sim' : 'Não' || '',
        dataAbertura: e.dataAbertura || '',
        clicado: e.clicado ? 'Sim' : 'Não' || '',
        dataClicado: e.dataClicado || '',
        erro: e.erro ? 'Sim' : 'Não' || '',
        mensagemErro: e.mensagemErro || '',

      }
    });

    const header = {
      Log: this.notificacao
    }

    this.pdfService.exportPdf('Logs', 'Logs', rows, columns, columStyles, header, null);
  }

  setIframeReady(iframe) {
    const win: Window = iframe.contentWindow;
    const doc: Document = win.document;
    doc.open();
    doc.write(this.mensagem);

  }
  applyLocale() {
    this.localeService.use('pt-br');
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
