import { Component, OnInit, ChangeDetectorRef, LOCALE_ID, ViewChild } from '@angular/core';
import * as Model from './../_models/model';
import * as moment from 'moment'
import { Restangular } from 'ngx-restangular';
import { AuthenticationService } from '../../_services';
import { FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { BaseChartDirective } from 'ng2-charts';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }]
})
export class FinanceiroComponent implements OnInit {

  loading: boolean = false;
  loadingAutoridades: boolean = false;
  loadingPorDia: boolean = false;
  bsValue: Date = moment().toDate();
  minMode: BsDatepickerViewMode = 'month';
  colorTheme = 'theme-blue';
  bsConfig: Partial<BsDatepickerConfig>;

  firstRequest: boolean = true;
  contador: Model.DashboardContadorFinanceiro;
  resumoFinanceiro;
  apreensaoLiberacao: Array<any> = null;

  //TAXA x DIARIA
  @ViewChild("formaTaxaDiaria", { read: BaseChartDirective })
  public formaTaxaDiaria: BaseChartDirective
  public barChartOptions: any = {
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        stacked: true,
        position: "left",
        id: "y-axis-0",
        gridLines: {
          display: true
        },
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
          }
        },
      }]
    },
    scaleShowVerticalLines: true,
    responsive: true,
    title: {
      text: 'Taxa x Diarias',
      position: 'top',
      fontSize: 22,
      padding: 2,
      fontColor: '#247BA0',
      display: true
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + tooltipItem.yLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });;
        }
      }
    }
  };

  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[];
  public barChartColor: any[] = [
    { backgroundColor: '#4AC2FF' },
    { backgroundColor: '#B2EDED' },
  ];
  //FIM


  //Diarias MEs
  @ViewChild("formDiarias", { read: BaseChartDirective })
  public formDiarias: BaseChartDirective
  public barDiariasOptions: any = {
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        stacked: false,
        position: "left",
        id: "y-axis-0",
        gridLines: {
          display: true
        },
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
          }
        },
      }]
    },
    scaleShowVerticalLines: true,
    responsive: true,
    title: {
      text: 'Diarias',
      position: 'top',
      fontSize: 22,
      padding: 2,
      fontColor: '#247BA0',
      display: true
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel == 'Valor Diárias' ? datasetLabel + ': ' + tooltipItem.yLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) :
            datasetLabel + ': ' + tooltipItem.yLabel;
        }
      }
    }
  };

  public barDiariasLabels: string[];
  public barDiariasType: string = 'bar';
  public barDiariasLegend: boolean = true;
  public barDiariasData: any[];
  public barDiariasColor: any[] = [
    { backgroundColor: '#50A6DC' },
    { backgroundColor: '#B2EDED' },
  ];
  //fim diarias mes

  clientes: Model.Cliente[];
  clienteSelected: Model.Cliente = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
  depositoSelected: Model.Deposito = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };

  //FORMAS DE PAGAMENTO
  @ViewChild("formaPagamentoChart", { read: BaseChartDirective })
  public formaPagamentoChart: BaseChartDirective
  doughnutChartLabels: string[];
  doughnutChartData: number[];
  doughnutChartType: string = 'doughnut';
  doughnutChartColors: any[] = [
    {
      backgroundColor: ["#50A6DC", "#4AC2FF", "#71E4E1", "#B2EDED","#FFFFFF"]
    }
  ];
  doughnutChartOptions: any = {
    title: {
      text: 'Forma de liberação',
      position: 'top',
      fontSize: 22,
      padding: 2,
      fontColor:'#247BA0',
      display: true
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          //get the concerned dataset
          var dataset = data.datasets[tooltipItem.datasetIndex];
          //calculate the total of this data set
          var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          //get the current items value
          var currentValue = dataset.data[tooltipItem.index];
          //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
          var percentage = Math.floor(((currentValue / total) * 100) + 0.5);

          return "Tot: " + currentValue + " | Per: " + percentage + "%";
        }
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      fullWidth: true,
      onHover: function (e) {
        e.target.style.cursor = 'pointer';
      },
      labels: {
        fontSize: 10,
        fontColor: '#247BA0',
        padding: 5,
        usePointStyle: true,
        generateLabels: function (chart) {
          var data = chart.data;
          var ds = data.datasets[0];
          var meta = chart.getDatasetMeta(0);
          return data.labels.map((x, i) => {
            return {
              text: x.length > 20 ? x.substring(0, 18) + "..." : x,
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
  //FIM AUTORIDADES

  constructor(
    private notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private cdr: ChangeDetectorRef,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode,
      containerClass: this.colorTheme
    });

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

  updateDashboard() {
    this.loading = true;
    this.getContadores();
    this.getTaxaDiaria();
    this.getFomasLiberacao();
    this.getDiarias();
  }

  getContadores() {
    this.restangular
      .all("dashboard")
      .customGET('contador_financeiro',
        {
          data_filtro: this.bsValue.toISOString(),
          id_cliente: this.clienteSelected.id_cliente,
          id_deposito: this.depositoSelected.id_deposito
        })
      .subscribe((c: Model.DashboardContadorFinanceiro) => {
        this.contador = c;
      },
        error => {
          this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
          this.loading = false;
        });
  }

  getFomasLiberacao() {
    this.restangular
      .all("dashboard")
      .customGET('formas_pagamento',
        {
          data_filtro: this.bsValue.toISOString(),
          id_cliente: this.clienteSelected.id_cliente,
          id_deposito: this.depositoSelected.id_deposito
        })
      .subscribe(d => {
        this.doughnutChartLabels = d.length > 0 ? d.map(x => x.label) : [""];
        this.doughnutChartData = d.length > 0 ? d.map(x => x.data) : [0];
        if (this.formaPagamentoChart != undefined) {
          this.formaPagamentoChart.chart.config.data.labels = this.doughnutChartLabels;
        }
        this.loading = false;
      },
        error => {
          this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
          this.loading = false;
        });
  }

  getTaxaDiaria() {
    this.restangular
      .all("dashboard")
      .customGET('taxa_diaria',
        {
          data_filtro: this.bsValue.toISOString(),
          id_cliente: this.clienteSelected.id_cliente,
          id_deposito: this.depositoSelected.id_deposito
        })
      .subscribe(d => {
        this.barChartLabels = d.length > 0 ? d.map(x => x.dia) : [""];

        this.barChartData = [
          { data: d.length > 0 ? d.map(x => x.total_diaria) : [0], label: 'Diarias', yAxisID: 'y-axis-0' },
          { data: d.length > 0 ? d.map(x => x.total_taxa) : [0], label: 'Taxa', yAxisID: 'y-axis-0'}
        ];

        if (this.formaTaxaDiaria != undefined) {
          this.formaTaxaDiaria.chart.config.data.labels = this.barChartLabels;
        }
        this.loading = false;
      },
        error => {
          this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
          this.loading = false;
        });
  }

  getDiarias() {
    this.restangular
      .all("dashboard")
      .customGET('diarias_mes',
        {
          data_filtro: this.bsValue.toISOString(),
          id_cliente: this.clienteSelected.id_cliente,
          id_deposito: this.depositoSelected.id_deposito
        })
      .subscribe(d => {
        this.barDiariasLabels = d.length > 0 ? d.map(x => x.dias) : [""];

        this.barDiariasData = [
          { data: d.length > 0 ? d.map(x => x.quantidade_dias) : [0], label: 'Diárias',type: 'line' , yAxisID: 'y-axis-0' },
          { data: d.length > 0 ? d.map(x => x.valor_diaria) : [0], label: 'Valor Diárias',yAxisID: 'y-axis-0' }
        ];

        if (this.formDiarias != undefined) {
          this.formDiarias.chart.config.data.labels = this.barDiariasLabels;
        }
        this.loading = false;
      },
        error => {
          this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
          this.loading = false;
        });
  }

  getClientes() {
    let user = this.auth.getUser();
    return this.restangular
      .one("cliente/usuario", user.id)
      .getList('',
      {
        flag_virtual: false 
      });
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

}


