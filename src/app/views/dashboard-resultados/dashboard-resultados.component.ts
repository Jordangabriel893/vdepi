import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as Model from '../_models/model'
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment'

import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { AuthenticationService } from '../../_services';
import { Restangular } from 'ngx-restangular';


@Component({
  selector: 'app-dashboard-resultados',
  templateUrl: './dashboard-resultados.component.html'
})
export class DashboardResultadosComponent implements OnInit {
  loading: boolean = false;
  firstRequest: boolean = true;
  clientes: Model.Cliente[];
  clienteSelected: Model.Cliente = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
  depositoSelected: Model.Deposito = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };

  pe: number = 0;
  meta: number = 0;
  bsValue: Date = moment().toDate();
  minMode: BsDatepickerViewMode = 'month';
  colorTheme = 'theme-blue';
  bsConfig: Partial<BsDatepickerConfig>;

  public lineChartData: ChartDataSets[] = [{ data: [], label: ''}];
  public lineChartLabels: Label[] = [''];
  public lineChartOptions: (any & { annotation: any }) = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      yAxes: [
        {
          id: 'y-axis-1',
          position: 'left',
          gridLines: {
            color: 'rgba(0,0,200,0.5)',
          },
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
          }
        },
        }
      ]
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

          return "Tot: " + currentValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        }
      }
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-1',
          value: this.pe,
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'P.E ' + this.pe.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
          }
        },
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-1',
          value: this.meta,
          borderColor: 'green',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'green',
            content: 'Meta ' + this.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
          }
        },
      ],
    },
  };
  public lineChartColors: any[] = [];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(
    private auth: AuthenticationService,
    private restangular: Restangular) { }

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

  getClientes() {
    let user = this.auth.getUser();
    return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });
  }

  setCliente(cli) {
    this.clienteSelected = cli;
    this.buscarDados();
  }

  buscarDados() {

    let novosDados:  ChartDataSets[] = [];

    this.restangular
      .all("dashboard")
      .get('faturamento_resultado_meta', { data_filtro: this.bsValue.toISOString(), id_cliente: this.clienteSelected.id_cliente })
      .subscribe((resp: Model.DashboardFaturamentoMetas[]) => {
        if (resp.length == 0)
          this.limpaDados();
        else {
          this.lineChartData = resp.map((dados: Model.DashboardFaturamentoMetas) => {
            return { data: [dados.fat_atual, dados.fat_1ano_anterior, dados.fat_2ano_anterior], label: dados.deposito };
          })
          this.lineChartColors = resp.map(x => {
            return {
              backgroundColor: this.getRandomColor()
            }
          });
          this.lineChartLabels = [this.bsValue.getFullYear().toString(), (this.bsValue.getFullYear() - 1).toString(), (this.bsValue.getFullYear() - 2).toString()];
        }
      });

    if (this.chart != undefined) {
      this.chart.chart.config.data.labels = this.lineChartLabels;
    }
  }

  limpaDados() {
    this.lineChartData = [{ data: [], label: '' }];
    this.lineChartLabels = [''];
    this.lineChartColors = [];
    this.lineChartOptions.annotation.annotations[0].value = 0;
    this.lineChartOptions.annotation.annotations[1].value = 0;
    this.lineChartPlugins = [pluginAnnotations];
    this.chart.update();
  }
  atualizaPe() {
    this.lineChartOptions.annotation.annotations[0].value = this.pe;
    this.lineChartOptions.annotation.annotations[0].label.content = 'Pe ' + this.pe.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    this.lineChartPlugins = [pluginAnnotations];
    this.chart.update();

  }

  atualizaMeta() {
    this.lineChartOptions.annotation.annotations[1].value = this.meta;
    this.lineChartOptions.annotation.annotations[1].label.content = 'Meta ' + this.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    this.lineChartPlugins = [pluginAnnotations];
    this.chart.update();
  }

  atualizaData() {
    if (!this.firstRequest) {
      this.buscarDados();
      this.chart.update();
    }

    this.firstRequest = false;
  }

  getRandomColor() {

    let array: any[] = ["#f98989", "#b1e0ee", "#eaeeb1", "#c3eeb1", "#fed3a7", "#F0E68C", "#7FFFD4", "#97a3c8", "#7d9cfa", "#fee76d", "#FFFF00", "#4ab089", "#d6f4f5", "#FFFFF0", "#d583fe"]
    var o = Math.round, r = Math.random, s = array.length - 1;


    return  array[o(r() * s)];

  }

}
