import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Restangular } from 'ngx-restangular';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Model from './../_models/model'
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment'
import { BaseChartDirective } from 'ng2-charts'; 
import { AuthenticationService } from '../../_services/index';
import * as XLSX from 'xlsx';


@Component({
  templateUrl: 'operacoes.component.html'
})
export class OperacoesComponent implements OnInit {

  loading: boolean = true;
  loadingAutoridades: boolean = false;
  loadingPorDia: boolean = false;
  loadingPorMes: boolean = false;
  user;
  flipDiv: boolean = false;
  liberacao = [{ placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
               { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
               { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
               { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
               { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
               { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
               { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' }];
    recolhimento;


  firstRequest: boolean = true;
  contador: Model.DashboardContador;
  periodo: any[] = [moment().subtract(6, 'months').toDate(), moment().toDate()];
  apreensaoLiberacao: Array<any> = null;
  autoridades: any[];

  clientes: Model.Cliente[];
  clienteSelected: Model.Cliente = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
  depositoSelected: Model.Deposito = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };

  bsConfig = {
    containerClass: "theme-blue",
    rangeInputFormat: "DD [de] MMMM [de] YYYY",
    showWeekNumbers: false,
  };
  chartAutoridadeEnable: number = 0;

  //APREENSÕES X LIBERAÇÕES
  @ViewChild("apreensaoChart", { read: BaseChartDirective })
  public chart: BaseChartDirective;

  lineChart1Labels: string[];
  lineChart1Options: any = {
    tooltips: {
      enabled: true,
      //custom: CustomTooltips,
      mode: 'index'
    },
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      }
    },
    legend: {
      display: true,
      onHover: function (e) {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    }
  };
  lineChart1Colours: Array<any> = [
    {
      backgroundColor: hexToRgba(getStyle('--danger'), 90),
      borderColor: 'rgba(255,255,255,.55)'
    },
    {
      backgroundColor: hexToRgba(getStyle('--success'), 80),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  lineChart1Type = 'line';
  //FIM APREENSÃO

  //AUTORIDADES
  @ViewChild("autoridadesChart", { read: BaseChartDirective })
  public autoridadesChart: BaseChartDirective  
  doughnutChartLabels: string[];
  doughnutChartData: number[];
  doughnutChartType: string = 'doughnut';
  doughnutChartColors: any[] = [
    {
      backgroundColor: ["#f98989", "#b1e0ee", "#eaeeb1", "#c3eeb1", "#fed3a7", "#F0E68C", "#7FFFD4", "#97a3c8", "#7d9cfa", "#fee76d", "#FFFF00", "#4ab089", "#d6f4f5", "#FFFFF0", "#d583fe"]
    }
  ];
  doughnutChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    legend: {
      display: true,
      position: 'right',
      fullWidth: false,
      onHover: function (e) {
        e.target.style.cursor = 'pointer';
      },
      labels: {
        boxWidth: 20,
        fontSize: 11,
        padding: 7,
        usePointStyle: true,
        generateLabels: function (chart) {
          var data = chart.data;
          var ds = data.datasets[0];
          var meta = chart.getDatasetMeta(0);
          return data.labels.map((x, i) => {
            return {
              text: x.length > 16 ? x.substring(0, 13) + "..." : x,
              fillStyle: ds.backgroundColor[i],
              hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
              strokeStyle: "#ffffff",
              lineWidth: 1,
              index: i
            };
          });
        }
      }
    },
    hover: {
      onHover: function (e) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    }
  }
  criterio: string;
  //FIM AUTORIDADES

  // barChart
  @ViewChild("apreensaoDiaChart", { read: BaseChartDirective })
  public apreensaoDiachart: BaseChartDirective;

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] ;

  // barChartAutoridades
  @ViewChild("autoridadeDiaChart", { read: BaseChartDirective })
  public autoridadeDiaChart: BaseChartDirective;

  public barChartAutoridadeOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };
  public barChartAutoridadeLabels: string[] = ['13/12/2018', '14/12/2018'];//['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartAutoridadeLegend = true;

  public barChartAutoridadeData: any[] = [
    {
      label: '01 DP',
      data: [1, 1],
      backgroundColor: '#D6E9C6' // green
    },
    {
      label: 'STTP',
      data: [0, 1],
      backgroundColor: '#FAEBCC' // yellow
    },
    {
      label: 'STTRANS',
      data: [0, 2],
      backgroundColor: '#EBCCD1' // red
    },
    {
      label: 'UOP QUEIMADAS',
      data: [0, 1],
      backgroundColor: '#000000' // red
    }
  ];


  constructor(
    private notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private cdr: ChangeDetectorRef,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.getClientes()
      .subscribe((c: Model.Cliente[]) => {
        this.clientes = c;
        this.setCliente(c[0]);
      });
  }

  bsPeriodoChange() {
    if (!this.firstRequest) {
      this.updateDashboard();
    }

    this.firstRequest = false;
  }

  chartLine1Clicked(e: any): void {
    console.log(e);
    if (e.active.length > 0)
    {
      let index = e.active[0]._index;
      this.criterio = this.lineChart1Labels[index];      
      this.getAutoridades(this.criterio);
      this.getApreesaoLiberacaoPorDia(this.criterio);
      this.getApreesaoLiberacaoPorMes(this.criterio);
    }
  }

  updateDashboard() {
    this.loading = true;
    this.getContadores();
    this.getApreesaoLiberacao();
  }

  getContadores() {
    this.restangular.all("dashboard").customGET('contadores', { periodo: this.periodo, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito, id_usuario: this.user.id })
      .subscribe((c: Model.DashboardContador) => {
        this.contador = c;
      },
      error => {
        this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
        this.loading = false;
      });
  }

  getApreesaoLiberacao() {
    this.restangular.all("dashboard").customGET('apreensaoliberacao', { periodo: this.periodo, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito })
      .subscribe((ap: Model.DashboardLineChart[]) => {
        this.lineChart1Labels = ap.find(x => x.label == 'Serie').data;
        this.apreensaoLiberacao = ap.filter(x => x.label != 'Serie');
        if (this.chart != undefined) {
          this.chart.chart.config.data.labels = this.lineChart1Labels;
        }

        this.criterio = this.lineChart1Labels[this.lineChart1Labels.length - 1];
        this.getAutoridades(this.criterio);
        this.getApreesaoLiberacaoPorDia(this.criterio);
        this.getApreesaoLiberacaoPorMes(this.criterio);
        this.loading = false;
      },
      error => {
        this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
        this.loading = false;
      });
  }

  getAutoridades(criterio) {
    this.loadingAutoridades = true;
    this.restangular.all("dashboard").customGET('autoridades', { criterio: criterio, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito })
      .subscribe((d: Model.DashboardDoughnutChart[]) => {
        this.autoridades = d;
        this.chartAutoridadeEnable = 0;
        this.doughnutChartLabels = d[0].itens.length > 0 ? d[0].itens.map(x => x.label) : [""];
        this.doughnutChartData = d[0].itens.length > 0 ? d[0].itens.map(x => x.data) : [0];
        if (this.autoridadesChart != undefined) {
          this.autoridadesChart.chart.config.data.labels = this.doughnutChartLabels;
        }
        this.loadingAutoridades = false;
      },      
      error => {
        this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
        this.loading = false;
        this.loadingAutoridades = false;
      });
  }

  getApreesaoLiberacaoPorDia(criterio) {
    this.loadingPorDia = true;
    this.restangular.all("dashboard").customGET('apreensaoliberacaodia', { criterio: criterio, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito })
      .subscribe((ap: Model.DashboardLineChart[]) => {
        this.barChartLabels = ap.find(x => x.label == 'Serie').data;
        this.barChartData = ap.filter(x => x.label != 'Serie');
        if (this.apreensaoDiachart != undefined) {
          this.apreensaoDiachart.chart.config.data.labels = this.barChartLabels;
        }

        this.loadingPorDia = false;
      },
        error => {
          this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
          this.loadingPorDia = false;
        });
  }

    getApreesaoLiberacaoPorMes(criterio) {
        this.loadingPorMes = true;
        this.restangular.all("dashboard").customGET('apreensaoliberacaomes', { criterio: criterio, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito })
            .subscribe((ap) => {
                this.recolhimento = ap.recolhidos;
                this.liberacao = ap.liberados;
                this.loadingPorMes = false;
            },
                error => {
                    this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
                    this.loadingPorMes = false;
                });
    }

  changeChartAutoridades(index) {
    this.chartAutoridadeEnable = index;
    this.doughnutChartLabels = this.autoridades[index].itens.length > 0 ? this.autoridades[index].itens.map(x => x.label) : [""];
    this.doughnutChartData = this.autoridades[index].itens.length > 0 ? this.autoridades[index].itens.map(x => x.data) : [0];
    if (this.autoridadesChart != undefined) {
      this.autoridadesChart.chart.config.data.labels = this.doughnutChartLabels;
    }
    return false;
  }

  getClientes() {
    let user = this.auth.getUser();
    return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });
      
      //.catch(error => {
      //  this.notifierService.notify('error', 'Erro ao buscar clientes!');
      //});
  }

  setCliente(cli) {
    this.clienteSelected = cli;
   
    if (cli.depositos.length == 1)
      this.depositoSelected = cli.depositos[0];
    else
      this.depositoSelected = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };

    this.updateDashboard();
  }

  setDeposito(dep) {
    this.depositoSelected = dep;
    this.updateDashboard();
  }

    girar() {
        this.flipDiv = !this.flipDiv;
    }

    ExportTOExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.recolhimento);
        const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.liberacao);

        const wb: XLSX.WorkBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'Recolhimentos');
        XLSX.utils.book_append_sheet(wb, ws2, 'Liberações');

        /* save to file */
        XLSX.writeFile(wb, 'Relatorio' + this.criterio + '.xlsx');
    }
}
