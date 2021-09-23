import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as Model from '../../_models/model'
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment'
import { AuthenticationService } from '../../../_services/index';
import * as XLSX from 'xlsx';
import { PdfService } from 'app/_services/pdf.service';
import { GroupByPipe2 } from '../../../directives/groupBy2.pipe'
import { CurrencyFormatPipe } from 'app/directives/currency-format.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  templateUrl: 'liberadosconsolidado.component.html',
  styleUrls: ['./liberadosconsolidado.component.scss']

})
export class LiberadosConsolidadoComponent implements OnInit {

  loading: boolean = false;
  user;

  liberadosConsolidado;
  resumo;

  firstRequest: boolean = true;
  periodo: any[] = [moment().startOf('month').toDate(), moment().toDate()];
  clientes: Model.Cliente[];
  clienteSelected: Model.Cliente = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
  depositoSelected: Model.Deposito = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
  listAutoridades;
  autoridadeResponsavel = { id_autoridade_responsavel: 0, descricao: 'AUTORIDADE'};
  tipoLiberacao = []

  tiposLiberacao = [
    // { id: "", name: 'TODOS'},
    { id: 1, name: 'NORMAL'},
    { id: 2, name: 'ESPECIAL'},
    { id: 3, name: 'LEILÃO'}
  ];

  bsConfig = {
    containerClass: "theme-blue",
    rangeInputFormat: "DD [de] MMMM [de] YYYY",
    showWeekNumbers: false,
    locale: 'pt-BR'
  };

  selectForm: FormGroup;

  // Text configuration
  textsSelect: IMultiSelectTexts = {
    checked: 'TIPO',
    checkedPlural: 'TIPOS',
    defaultTitle: 'TIPO',
    allSelected: 'TODOS',
  };

  settingsSelect: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-multselect',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true
  };

  constructor(
    private notifierService: NotifierService,
    private pdfService: PdfService,
    private restangular: Restangular,
    private auth: AuthenticationService,
    private groupBy: GroupByPipe2,
    private currency: CurrencyFormatPipe,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.getClientes()
      .subscribe((c: Model.Cliente[]) => {
        this.clientes = c;
        // this.setCliente(c[0]);
      });

    this.selectForm = this.formBuilder.group({
      optionsModel: []
    });

    this.selectForm.controls['optionsModel'].valueChanges
      .subscribe((selectedOptions) => {
        this.tipoLiberacao = selectedOptions;
        this.updateDashboard();
        // changes
      });
  }

  // bsPeriodoChange() {
  //   if (!this.firstRequest) {
  //     this.updateDashboard();
  //   }

  //   this.firstRequest = false;
  // }

  updateDashboard() {
    this.loading = true;
    this.getLiberadosConsolidado();
  }

  getLiberadosConsolidado() {
    this.restangular.all("relatorios").customGET('liberadosConsolidado',
    {
      periodo: this.periodo,
      id_cliente: this.clienteSelected.id_cliente,
      id_deposito: this.depositoSelected.id_deposito,
      id_autoridade_responsavel: this.autoridadeResponsavel.id_autoridade_responsavel,
      tipo_liberacao: this.tipoLiberacao
    })
      .subscribe((resp) => {
        this.liberadosConsolidado = resp;
        const group = this.groupBy.transform(resp, 'tipo_veiculo');
        this.resumo = group.map(g => {
          const total = g.value.reduce((a, v) => a + v.total_item, 0);
          return {
            descricao: g.key,
            valor: total,
            qtd: g.value.length,
            ticketMedio: total / g.value.length
          }
        });

        const totalPago = this.resumo.reduce((a, v) => a + v.valor, 0);
        const totalQtd = this.resumo.reduce((a, v) => a + v.qtd, 0);

        this.resumo.push({
          descricao: 'TOTAL',
          valor: totalPago,
          qtd: totalQtd,
          ticketMedio: totalPago / totalQtd
        })

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

  getAutoridades() {
    return this.restangular.all("relatorios/autoridades").getList({id_cliente: this.clienteSelected.id_cliente});
  }

  setCliente(cli) {
    this.listAutoridades = [];
    this.clienteSelected = cli;

    this.getAutoridades()
    .subscribe(resp => {
      this.listAutoridades = resp;
    });
  }

  setAutoridades(a) {
    this.autoridadeResponsavel = a;
    this.updateDashboard();
  }

  setDeposito(dep) {
    this.depositoSelected = dep;
    this.updateDashboard();
  }

  setTipoLiberacao(tl) {
    this.tipoLiberacao = tl;
    this.updateDashboard();
  }

  exportAsExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.liberadosConsolidado);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(wb, ws, 'Liberados');

      /* save to file */
      XLSX.writeFile(wb, 'RelatorioLiberadosConsolidado.xlsx');
  }

  exportAsPDF() {
    let columns = [
      { title: "GRV", dataKey: "numero_formulario_grv" },
      { title: "Placa", dataKey: "placa" },
      { title: "Chassi", dataKey: "chassi" },
      { title: "Marca/Modelo", dataKey: "marca_modelo" },
      { title: "Tipo Veiculo", dataKey: "tipo_veiculo" },
      { title: "Data Liberação", dataKey: "data_liberacao" },
      { title: "Autoridade", dataKey: "autoridade_responsavel" },
      { title: "Forma Pag", dataKey: "forma_pagamento" },
      { title: "Valor Pago", dataKey: "total_item" },
      { title: "Tipo", dataKey: "tipo_liberacao_descricao" },
      { title: "NF", dataKey: "nota_fiscal" },
    ];

    const columStyles = {
      numero_formulario_grv: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
      placa: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      chassi: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      marca_modelo: { columnWidth: 100, overflow: 'linebreak', valign: 'middle', halign: 'left' },
      tipo_veiculo: { columnWidth: 80, overflow: 'visible', valign: 'middle', halign: 'left' },
      data_liberacao: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      autoridade_responsavel: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
      forma_pagamento: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      total_item: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      tipo_liberacao_descricao: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
      nota_fiscal: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
    };

    const rows = this.liberadosConsolidado.map(e => {
      return {
        numero_formulario_grv: e.numero_formulario_grv || "",
        placa: e.placa || "",
        chassi: e.chassi || "",
        marca_modelo: e.marca_modelo || "",
        tipo_veiculo: e.tipo_veiculo || "",
        data_liberacao: moment(e.data_liberacao).format("DD/MM/YYYY HH:ss"),
        autoridade_responsavel: e.autoridade_responsavel || "",
        forma_pagamento: e.forma_pagamento || "",
        total_item: this.currency.transform(e.total_item) || "",
        tipo_liberacao_descricao: e.tipo_liberacao_descricao || "",
        nota_fiscal: e.nota_fiscal || "",
      }
    });

    const header = {
      cliente: this.clienteSelected.nome,
      deposito: this.depositoSelected.descricao,
      periodo: this.periodo,
      usuario: this.user.username
    }

    this.pdfService.exportPdf('LiberadosConsolidado', "Liberados Consolidado", rows, columns, columStyles, header, null);
  }

  exportResumoAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.resumo);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'ResumoTipoVeiculo');

    /* save to file */
    XLSX.writeFile(wb, 'RelatorioLiberadosResumo.xlsx');
  }

  exportResumoAsPDF() {
    let columns = [
      { title: "Tipo Veiculo", dataKey: "descricao" },
      { title: "Valor Pagamento", dataKey: "valor" },
      { title: "Qtd", dataKey: "qtd" },
      { title: "Ticket Médio", dataKey: "ticketMedio" },
    ];

    const columStyles = {
      descricao: { columnWidth: 200, overflow: 'visible', halign: 'left', valign: 'middle' },
      valor: { columnWidth: 200, overflow: 'visible', valign: 'middle', halign: 'left' },
      qtd: { columnWidth: 200, overflow: 'visible', valign: 'middle', halign: 'left' },
      ticketMedio: { columnWidth: 200, overflow: 'visible', valign: 'middle', halign: 'left' },
    };

    const rows = this.resumo.map(e => {
      return {
        descricao: e.descricao || "",
        valor: this.currency.transform(e.valor) || "",
        qtd: e.qtd || "",
        ticketMedio: this.currency.transform(e.ticketMedio) || "",
      }
    });

    const header = {
      cliente: this.clienteSelected.nome,
      deposito: this.depositoSelected.descricao,
      periodo: this.periodo,
      usuario: this.user.username
    }

    this.pdfService.exportPdf('RelatorioLiberadosResumo', "Liberados por Tipo de Veículo", rows, columns, columStyles, header, null);
  }

}
