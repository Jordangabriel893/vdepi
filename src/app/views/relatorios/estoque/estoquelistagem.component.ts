import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as Model from './../../_models/model'
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment'
import { AuthenticationService } from '../../../_services/index';
import * as XLSX from 'xlsx';
import { PdfService } from 'app/_services/pdf.service';
import { GroupByPipe2 } from '../../../directives/groupBy2.pipe'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  templateUrl: 'estoquelistagem.component.html'
})
export class EstoqueListagemComponent implements OnInit {

  loading: boolean = false;
  user;
  estoque;


  firstRequest: boolean = true;

  clientes: Model.Cliente[];
  clienteSelected: Model.Cliente = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
  depositoSelected: Model.Deposito = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
  listStatus;
  statusSelected = { id_status_operacao: 0, descricao: 'STATUS'}

  bsConfig = {
    containerClass: "theme-blue",
    rangeInputFormat: "DD [de] MMMM [de] YYYY",
    showWeekNumbers: false,
  };

  constructor(
    private notifierService: NotifierService,
    private pdfService: PdfService,
    private restangular: Restangular,
    private auth: AuthenticationService,
    private groupBy: GroupByPipe2) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.getClientes()
      .subscribe((c: Model.Cliente[]) => {
        this.clientes = c;
        // this.setCliente(c[0]);
      });

    this.getStatus()
    .subscribe(status => {
      this.listStatus = status;
    })
  }

  bsPeriodoChange() {
    if (!this.firstRequest) {
      this.updateDashboard();
    }

    this.firstRequest = false;
  }

  updateDashboard() {
    this.loading = true;
    this.getRelatorio();
  }

  getRelatorio() {
    this.restangular.all("relatorios").customGET('estoque',
    {
      id_cliente: this.clienteSelected.id_cliente,
      id_deposito: this.depositoSelected.id_deposito,
      id_usuario: this.user.id,
      id_status_operacao: this.statusSelected.id_status_operacao
    })
      .subscribe((estoque) => {
        this.estoque = estoque;
        this.loading = false;
      },
      error => {
        this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
        this.loading = false;
      });
  }

  getClientes() {
    let user = this.auth.getUser();
    return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });
  }

  getStatus() {
    return this.restangular.all("relatorios/status").getList();
  }

  setCliente(cli) {
    this.clienteSelected = cli;
  }

  setStatus(st) {
    this.statusSelected = st;
    this.updateDashboard();
  }

  setDeposito(dep) {
    this.depositoSelected = dep;
    this.updateDashboard();
  }

  exportAsExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.estoque);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(wb, ws, 'Estoque');

      /* save to file */
      XLSX.writeFile(wb, 'RelatorioListagemEstoque.xlsx');
  }

  exportAsPDF() {
    let columns = [
      { title: "GRV", dataKey: "numero_formulario_grv" },
      { title: "Placa", dataKey: "placa" },
      { title: "Status", dataKey: "status" },
      { title: "Cor", dataKey: "cor" },
      { title: "Chassi", dataKey: "chassi" },
      { title: "Marca/Modelo", dataKey: "marca_modelo" },
      { title: "Tipo Veiculo", dataKey: "tipo_veiculo" },
      { title: "Data Remoção", dataKey: "data_hora_remocao" },
      { title: "Localização", dataKey: "estacionamento_setor" },
      { title: "Leilão", dataKey: "leilao" },
      { title: "Status Leilão", dataKey: "status_lote" },
    ];

    const columStyles = {
      numero_formulario_grv: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
      placa: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      status: { columnWidth: 50, overflow: 'visible', halign: 'left', valign: 'middle' },
      cor: { columnWidth: 70, overflow: 'visible', valign: 'middle', halign: 'left' },
      chassi: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      marca_modelo: { columnWidth: 100, overflow: 'linebreak', valign: 'middle', halign: 'left' },
      tipo_veiculo: { columnWidth: 80, overflow: 'visible', valign: 'middle', halign: 'left' },
      data_hora_remocao: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      estacionamento_setor: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      leilao: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      status_lote: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
    };

    const rows = this.estoque.map(e => {
      return {
        numero_formulario_grv: e.numero_formulario_grv || "",
        placa: e.placa || "",
        status: e.status || "",
        cor: e.cor || "",
        chassi: e.chassi || "",
        marca_modelo: e.marca_modelo || "",
        tipo_veiculo: e.tipo_veiculo || "",
        data_hora_remocao: moment(e.data_hora_remocao).format("DD/MM/YYYY HH:ss"),
        estacionamento_setor: e.estacionamento_setor || "",
        leilao: e.leilao || "",
        status_lote: e.status_lote || "",
      }
    });

    const header = {
      cliente: this.clienteSelected.nome,
      deposito: this.depositoSelected.descricao,
      periodo: null,
      usuario: this.user.username
    }

    const groupRows = this.groupBy.transform(rows, 'tipo_veiculo');
    const resumo = groupRows.map(x => (x.key + ': ' + x.value.length));
    resumo.push("TOTAL: " + rows.length);

    this.pdfService.exportPdf('EstoqueAtual', "Estoque Atual", rows, columns, columStyles, header, resumo);
  }
}
