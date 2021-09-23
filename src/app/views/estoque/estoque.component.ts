import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Restangular } from 'ngx-restangular';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Model from './../_models/model'
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment'
import { SingleDataSet, Label, BaseChartDirective, Color } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets, ChartColor } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { AuthenticationService } from '../../_services/index';


@Component({
  templateUrl: 'estoque.component.html'
})
export class EstoqueComponent implements OnInit {

  loading: boolean = true;
  user;

  firstRequest: boolean = true;
  contador: Model.DashboardContadorEstoque = { estoque: 0, estoque_pre_leilao: 0,  };
  periodo: any[] = [moment().toDate(), moment().toDate()];
  criterio;

  clientes: Model.Cliente[];
  clienteSelected: Model.Cliente = { nome: "TODOS CLIENTE", id_cliente: 0, depositos: [{ descricao: "TODOS DEPÓSITO", id_deposito: 0, flag_virtual: '' }] };
  depositoSelected: Model.Deposito = { descricao: "TODOS DEPÓSITO", id_deposito: 0, flag_virtual: '' };


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Abaixo de 30 dias', 'entre 30 e 60 dias', 'acima de 60 dias'];
  public barChartType: ChartType = 'bar';
  public barChartColor: any[] = [{ backgroundColor: '#4AC2FF' }];
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[];



  // PolarArea
  public polarAreaChartLabels: Label = [];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;
  public polarAreaColors: any[];
  public polarAreaOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public polarAreaChartType: ChartType = 'pie';


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
        c.push(this.clienteSelected);
        this.clientes = c;
        this.setCliente(this.clienteSelected);
      });
  }



  updateDashboard() {
    this.loading = true;
    this.limpaEstoquePorStatus();
    this.getEstoquePorIntervalo();
  }

  limpaEstoquePorStatus() {
    this.polarAreaChartLabels =  [""];
    this.polarAreaChartData =  [];
    this.polarAreaColors = [{ backgroundColor: [""], hoverBackgroundColor: [""] }];
  }

  getClientes() {
    let user = this.auth.getUser();
    return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });

      //.catch(error => {
      //  this.notifierService.notify('error', 'Erro ao buscar clientes!');
      //});
  }

  setCliente(cli:Model.Cliente) {

    this.clienteSelected = cli;

    if (cli.depositos.length == 1)
      this.depositoSelected = cli.depositos[0];
    else {
      if (!cli.depositos.find(x => x.id_deposito == 0))
        cli.depositos.push({ descricao: "TODOS DEPÓSITO", id_deposito: 0, flag_virtual: '' });

      this.depositoSelected = { descricao: "TODOS DEPÓSITO", id_deposito: 0, flag_virtual: '' };
    }

    this.updateDashboard();
  }

  chartLine1Clicked(e: any): void {
    console.log(e);
    if (e.active.length > 0) {
      let index = e.active[0]._index;
      this.criterio = index;
      this.getEstoquePorStatus(this.criterio);
    }
  }


  setDeposito(dep) {
    this.depositoSelected = dep;
    this.updateDashboard();
  }


  getEstoquePorIntervalo() {
    this.restangular
      .all("dashboard")
      .get('estoque_periodo_dp', { id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito, id_usuario: this.user.id, criterio: 0 })
      .subscribe(
      resultado => {
        this.barChartData = [{ data: [resultado.menor30, resultado.entre30e60, resultado.maior60], label: 'Estoque' }];
        this.contador.estoque = resultado.menor30+resultado.entre30e60+resultado.maior60
      }
      )
    this.loading = false;
  }


  getEstoquePorStatus(criterio) {
    let totMin = Number.MAX_VALUE;
    let totMax = -Number.MAX_VALUE;
    this.restangular
      .all("dashboard")
      .get('estoque_dp', { id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito, id_usuario: this.user.id, criterio: criterio })
      .subscribe(totEst => {
        totEst.forEach(rec => {
          let estoqueTotal = rec.value;

          // keep track of min and max values
          if (estoqueTotal < totMin) {
            totMin = estoqueTotal;
          }
          if (estoqueTotal > totMax) {
            totMax = estoqueTotal;
          }
        })

        this.polarAreaChartLabels = totEst.length > 0 ? totEst.map(x => x.status) : [""];
        this.polarAreaChartData = totEst.length > 0 ? totEst.map(x => x.value) : [""];
        this.polarAreaColors = [{ backgroundColor: totEst.length > 0 ? totEst.map(x => this.getRandomColor(totMin, totMax, x.value,true)) : [""] ,
                                  hoverBackgroundColor: totEst.length > 0 ? totEst.map(x => this.getRandomColor(totMin, totMax, x.value,false)) : [""] }];
      },
        error => {
          this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
        });
    this.loading = false;
  }

  getRandomColor(Min, Max, faturamento, estilo) {
    if (estilo) {
      var low = [5, 69, 54];  // color of smallest datum
      var high = [151, 83, 34];   // color of largest datum
    }
    else {
      var low = [5, 69, 50];  // color of smallest datum
      var high = [151, 83, 25];   // color of largest datum
    }
    // delta represents where the value sits between the min and max
    var delta = (faturamento - Min) /
      (Max - Min);

    var color = [];
    for (var i = 0; i < 3; i++) {
      // calculate an integer color based on the delta
      color[i] = (high[i] - low[i]) * delta + low[i];
    }
    return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';

  }

}
