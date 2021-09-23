import { Component, OnInit, ViewChild, ChangeDetectorRef, LOCALE_ID, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Restangular } from 'ngx-restangular';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Model from './../_models/model'
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment'
import { BaseChartDirective  } from 'ng2-charts'; 
import { AuthenticationService } from '../../_services/index';
import { NgMapApiLoader } from '@ngui/map';
import { element } from 'protractor';



@Component({
  templateUrl: './faturamentoUF.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }]
})
export class FaturamentoUFComponent implements OnInit {

  flipDiv: boolean = false;
  firstRequest: boolean = true;
  total_clientes;
  total_depositos;
  censusMin = Number.MAX_VALUE;
  censusMax = -Number.MAX_VALUE;
  UF;
  UfTotal;
  faturamento;
  faturamentoTotal;
  faturamentoUF = [];
  user: Model.User;
  contador: Model.DashboardFaturamentoContadores;
  faturamentoUf: Model.DashboardFaturamentoUF[];
  faturamentoUFClientes: Model.DashboardFaturamentoUFClientes[];
  loading: boolean = false;
  loadingCliente: boolean = true;
  loadingDeposito: boolean = true;
  periodo: any[] = [moment().subtract(moment().toDate().getDate(), 'days').add(1, 'days').toDate(), moment().toDate()];
  googleMaps;
  maxDate: Date = moment().toDate();

  zoom: number = 3.72;
  latLng = {
    lat: -15,
    lng: -55
  };

  mapStyle = [{
    'stylers': [{ 'visibility': 'off' }]
  }, {
    'featureType': 'landscape',
    'elementType': 'geometry',
    'stylers': [{ 'visibility': 'on' }, { 'color': '#fcfcfc' }]
  }, {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{ 'visibility': 'on' }, { 'color': '#bfd4ff' }]
  }];

  mapObject;
  mapOptions: any = {
    zoom: this.zoom,
    center: this.latLng,
    disableDefaultUI: true,
    draggable: false,
    scaleControl: false,
    scrollwheel: false,
    styles: this.mapStyle ,
  }

  @ViewChild("depositoAlvo", { read: ElementRef })
  public depositoAlvo: ElementRef;

  //DASHBOARD PROPRIEDADES
  //Faturamento UF
  @ViewChild("faturamentoUFChart", { read: BaseChartDirective })
  public faturamentoUFChart: BaseChartDirective;
  public faturamentoUFChartColors: any[];
  public faturamentoUFChartOptions: any = {
    animation: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: true
        },
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
          }
        },
      }],
      yAxes: [{
        stacked: true,
        position: "left",
        id: "y-axis-0",
        gridLines: {
          display: false
        }
      }]
    },
    title: {
      text: 'Faturamento Por UF',
      position: 'top',
      fontSize: 22,
      padding: 2,
      fontColor: '#247BA0',
      display: false
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

          return "UF: " + tooltipItem.yLabel + " Tot: " + currentValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + " | Per: " + percentage + "%";
        }
      }
    },
    legend: {
      display: false,
      position: 'left',
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
              text: x.length > 3 ? x.substring(0, 2) + "..." : x,
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
  public faturamentoUFChartLabels: string[];
  public faturamentoUFChartChartType = 'horizontalBar';
  public faturamentoUFChartLegend = true;
  public faturamentoUFChartData: any[] = [{ data: [], label: '' }];

  //Faturamento Clientes UF
  @ViewChild("faturamentoUFCliChart", { read: BaseChartDirective })
  public faturamentoUFCliChart: BaseChartDirective;
  public faturamentoUFCliChartColor: any[];
  public faturamentoUFCliChartOptions: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: true
        },
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
          }
        },
      }],
      yAxes: [{
        stacked: true,
        position: "left",
        id: "y-axis-0",
        gridLines: {
          display: false
        }
      }]
    },
    scaleShowVerticalLines: true,
    responsive: true,
    title: {
      text: 'Faturamento por Clientes',
      position: 'top',
      fontSize: 22,
      padding: 2,
      fontColor: '#247BA0',
      display: true
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return 'faturamento: ' + tooltipItem.xLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });;
        }
      }
    }
  };
  public faturamentoUFCliChartIdCliente: number[];
  public faturamentoUFCliChartLabels: string[];
  public faturamentoUFCliChartType: string = 'horizontalBar';
  public faturamentoUFCliChartLegend = true;
  public faturamentoUFCliChartData: any[] = [{ data: [], label: '' }];

  //Faturamento Depositos UF
  @ViewChild("faturamentoUFDepChart", { read: BaseChartDirective })
  public faturamentoUFDepChart: BaseChartDirective;
  public faturamentoUFDepChartColor: any[];
  public faturamentoUFDepChartOptions: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: true
        }
      }],
      yAxes: [{
        stacked: true,
        position: "left",
        id: "y-axis-0",
        gridLines: {
          display: false
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
      text: 'Faturamento por Depositos',
      position: 'top',
      fontSize: 22,
      padding: 2,
      fontColor: '#247BA0',
      display: true
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return 'faturamento: ' + tooltipItem.yLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });;
        }
      }
    }
  };
  public faturamentoUFDepChartLabels: string[];
  public faturamentoUFDepChartType: string = 'bar';
  public faturamentoUFDepChartLegend = true;
  public faturamentoUFDepChartData: any[];
  //FIM DASHBOARD PROPRIEDADE

  constructor(
    private notifierService: NotifierService,
    private restangular: Restangular,
    private auth: AuthenticationService,
    private mapsApiLoader: NgMapApiLoader) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.getUF();
  }

  onMapReady($event) {
    this.mapObject = $event;

    this.mapObject.data.setStyle(
      (feature) => {
        var low = [5, 69, 54];  // color of smallest datum
        var high = [151, 83, 34];   // color of largest datum

        // delta represents where the value sits between the min and max
        var delta = (feature.getProperty('faturamento') - this.censusMin) /
          (this.censusMax - this.censusMin);

        var color = [];
        for(var i = 0; i< 3; i++) {
      // calculate an integer color based on the delta
        color[i] = (high[i] - low[i]) * delta + low[i];
    }

    // determine whether to show this shape or not
    var showRow = true;
    if (feature.getProperty('faturamento') == null ||
      isNaN(feature.getProperty('faturamento'))) {
      return {
        strokeWeight: 0.2,
        strokeColor: '#fff',
        zIndex: 1,
        fillColor: 'hsl(' + 0 + ',' + 0 + '%,' + 50 + '%)',
        fillOpacity: 0.75,
        visible: true
      }
    }

    var outlineWeight = 0.5, zIndex = 1;
    if (feature.getProperty('state') === 'hover') {
      outlineWeight = zIndex = 2;
    }

    return {
      strokeWeight: outlineWeight,
      strokeColor: '#fff',
      zIndex: zIndex,
      fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
      fillOpacity: 0.75,
      visible: showRow
    }
  }
    );

    this.mapObject.data.addListener('click',
      (e) => {
        let cliMin = Number.MAX_VALUE;
        let cliMax = -Number.MAX_VALUE;

        this.UF =
          e.feature.getProperty('UF_05');
        this.faturamento =
          e.feature.getProperty('faturamento');

        var percent = (e.feature.getProperty('faturamento') - this.censusMin) /
          (this.censusMax - this.censusMin) * 100;

        document.getElementById('data-box').style.display = 'block';
        document.getElementById('data-caret').style.display = 'block';
        document.getElementById('data-caret').style.paddingLeft = percent + '%';

        this.loadingDeposito = true;
        this.loadingCliente = true;
        this.faturamentoUFCliChartColor = [
          { backgroundColor: [], hoverBackgroundColor: [], hoverBorderWidth: [], hoverBorderColor:[] }];
        this.restangular
          .all("dashboard")
          .get('faturamento_uf_clientes', { periodo: this.periodo, uf: e.feature.getProperty('UF_05'), id_usuario: this.user.id })
          .subscribe(ufCli => {
            ufCli.forEach(rec => {
              let ufFaturamento = rec.faturamento;
              let ufId = rec.uf;

              // keep track of min and max values
              if (ufFaturamento < cliMin) {
                cliMin = ufFaturamento;
              }
              if (ufFaturamento > cliMax) {
                cliMax = ufFaturamento;
              }
            })
            this.faturamentoUFCliChartIdCliente = ufCli.length > 0 ? ufCli.map(x => x.id_cliente) : [""];
            this.faturamentoUFCliChartLabels = ufCli.length > 0 ? ufCli.map(x => x.cliente) : [""];
            this.faturamentoUFCliChartData = [
              {
                data: ufCli.length > 0 ? ufCli.map(x => x.faturamento) : [0],
                label: e.feature.getProperty('UF_05') + ' Total ' + e.feature.getProperty('faturamento').toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
              }
            ];
            this.faturamentoUFCliChartColor[0].backgroundColor = ufCli.length > 0 ? ufCli.map(x => this.getRandomColor(cliMin, cliMax, x.faturamento)) : [""];
            this.faturamentoUFCliChartColor[0].hoverBackgroundColor = ufCli.length > 0 ? ufCli.map(x => this.getRandomColor(cliMin, cliMax, x.faturamento)) : [""];
            this.faturamentoUFCliChartColor[0].hoverBorderWidth = ufCli.length > 0 ? ufCli.map(x => 2) : [""];
            this.faturamentoUFCliChartColor[0].hoverBorderColor = ufCli.length > 0 ? ufCli.map(x => 'rgba(12, 7, 70, 0.8)') : [""];
            if (this.faturamentoUFCliChart != undefined) {
              this.faturamentoUFCliChart.chart.config.data.labels = this.faturamentoUFCliChartLabels;
            }
            this.loadingCliente = false;
          },
            error => {
              this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
              this.loadingCliente = false;
            })
      }
    );

    this.mapObject.data.addListener('mouseover',
       (e) => {
         // set the hover state so the setStyle function can change the border
         e.feature.setProperty('state', 'hover');
      }
    );

    this.mapObject.data.addListener('mouseout',
      (e) => { e.feature.setProperty('state', 'normal')}
    );

    this.loadCensusData();

    this.loadMapShapes();
    this.getUF();
    this.getContadores();
  }

  loadMapShapes() {

    // load US state outline polygons from a GeoJson file
    this.mapObject.data.loadGeoJson('./assets/GeoJson/MapBrasilUF/uf.json', { idPropertyName: 'UF_05' });

  }

  clearCensusData() {
    this.censusMin = Number.MAX_VALUE;
    this.censusMax = -Number.MAX_VALUE;
    this.loadingCliente = true;
    this.loadingDeposito = true;

    this.mapObject.data.forEach((row) => {
      row.setProperty('faturamento', undefined);
    });

    document.getElementById('data-box').style.display = 'none';
    document.getElementById('data-caret').style.display = 'none';
  }
  
  loadCensusData() {
    this.faturamentoTotal = 0;
    this.UfTotal = 0;
    this.restangular
      .all("dashboard")
      .get('faturamento_uf', { periodo: this.periodo, uf: '', id_usuario: this.user.id })
      .subscribe(x => {
        this.faturamentoUF = x;
        this.getUFCliente(x[0].uf,x[0].faturamento,'');
        x.forEach(rec => {
          let ufFaturamento = rec.faturamento;
          let ufId = rec.uf;
          this.faturamentoTotal += rec.faturamento;
          this.UfTotal++; 
          // keep track of min and max values
          if (ufFaturamento < this.censusMin) {
            this.censusMin = ufFaturamento;
          }
          if (ufFaturamento > this.censusMax) {
            this.censusMax = ufFaturamento;
          }

          // update the existing row with the new data
          this.mapObject.data
            .getFeatureById(ufId)
            .setProperty('faturamento', ufFaturamento);

          this.mapObject.data
            .getFeatureById(ufId)
            .setProperty('state', 'normal');
        })
      });
  }

  chartDepClicked(e: any): void {
    if (e.active.length > 0) {
      let index = e.active[0]._index;
      this.getUFDeposito(this.faturamentoUFCliChartIdCliente[index], this.faturamentoUFCliChartLabels[index], this.faturamentoUFCliChartData[0].data[index], e.active[0]._model.backgroundColor);
    }
  }

  chartUFClicked(e: any): void {
    if (e.active.length > 0) {
      let index = e.active[0]._index;
      this.getUFCliente(this.faturamentoUFChartLabels[index], this.faturamentoUFChartData[0].data[index], e.active[0]._model.backgroundColor);
    }
  }

  getUFCliente(uf,valor,cor) {

    let depMin = Number.MAX_VALUE;
    let depMax = -Number.MAX_VALUE;

    this.UF = uf;
    this.faturamento = valor;

    this.loadingDeposito = true;
    this.loadingCliente = true;
    this.faturamentoUFCliChartColor = [
      { backgroundColor: [], hoverBackgroundColor: [], hoverBorderWidth: [], hoverBorderColor: [] }];
    this.restangular
      .all("dashboard")
      .get('faturamento_uf_clientes', { periodo: this.periodo, uf: uf, id_usuario: this.user.id })
      .subscribe(ufCli => {
        ufCli.forEach(rec => {
          let ufFaturamento = rec.faturamento;
          let ufId = rec.uf;

          // keep track of min and max values
          if (ufFaturamento < depMin) {
            depMin = ufFaturamento;
          }
          if (ufFaturamento > depMax) {
            depMax = ufFaturamento;
          }
        })
        this.faturamentoUFCliChartIdCliente = ufCli.length > 0 ? ufCli.map(x => x.id_cliente) : [""];
        this.faturamentoUFCliChartLabels = ufCli.length > 0 ? ufCli.map(x => x.cliente) : [""];
        this.faturamentoUFCliChartData = [
          {
            data: ufCli.length > 0 ? ufCli.map(x => x.faturamento) : [0],
            label: uf + ' Total ' + valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
          }
        ];
        this.faturamentoUFCliChartColor[0].backgroundColor = ufCli.length > 0 ? ufCli.map(x => this.getRandomColor(depMin, depMax, x.faturamento)) : [""];
        this.faturamentoUFCliChartColor[0].hoverBackgroundColor = ufCli.length > 0 ? ufCli.map(x => this.getRandomColor(depMin, depMax, x.faturamento)) : [""];
        this.faturamentoUFCliChartColor[0].hoverBorderWidth = ufCli.length > 0 ? ufCli.map(x => 2) : [""];
        this.faturamentoUFCliChartColor[0].hoverBorderColor = ufCli.length > 0 ? ufCli.map(x => 'rgba(12, 7, 70, 0.8)') : [""];
        if (this.faturamentoUFCliChart != undefined) {
          this.faturamentoUFCliChart.chart.config.data.labels = this.faturamentoUFCliChartLabels;
        }
        this.loadingCliente = false;
      },
        error => {
          this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
          this.loadingCliente = false;
      });

    var percent = (valor - this.censusMin) /
      (this.censusMax - this.censusMin) * 100;

    document.getElementById('data-box').style.display = 'block';
    document.getElementById('data-caret').style.display = 'block';
    document.getElementById('data-caret').style.paddingLeft = percent + '%';
    
  }

  getUFDeposito(id_cliente, cliente, valor, cor) {

    let depMin = Number.MAX_VALUE;
    let depMax = -Number.MAX_VALUE;
    this.loadingDeposito = true;
    this.faturamentoUFDepChartColor = [
      { backgroundColor: [], hoverBackgroundColor: [], hoverBorderWidth: [], hoverBorderColor: [] }];
    this.restangular
      .all("dashboard")
      .get('faturamento_uf_depositos', { periodo: this.periodo, id_cliente: id_cliente, id_usuario: this.user.id })
      .subscribe(ufDep => {
        ufDep.forEach(rec => {
          let ufFaturamento = rec.faturamento;
          let ufId = rec.uf;

          // keep track of min and max values
          if (ufFaturamento < depMin) {
            depMin = ufFaturamento;
          }
          if (ufFaturamento > depMax) {
            depMax = ufFaturamento;
          }
        })

        this.faturamentoUFDepChartLabels = ufDep.length > 0 ? ufDep.map(x => x.deposito) : [""];
        this.faturamentoUFDepChartData = [
          {
            data: ufDep.length > 0 ? ufDep.map(x => x.faturamento) : [0],
            label: cliente + ' Total ' + valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
          }
        ];
        this.faturamentoUFDepChartColor[0].backgroundColor = ufDep.length > 0 ? ufDep.map(x => this.getRandomColor(depMin, depMax, x.faturamento)) : [""];
        this.faturamentoUFDepChartColor[0].hoverBackgroundColor = ufDep.length > 0 ? ufDep.map(x => this.getRandomColor(depMin, depMax, x.faturamento)) : [""];
        this.faturamentoUFDepChartColor[0].hoverBorderWidth = ufDep.length > 0 ? ufDep.map(x => 2) : [""];
        this.faturamentoUFDepChartColor[0].hoverBorderColor = ufDep.length > 0 ? ufDep.map(x => 'rgba(12, 7, 70, 0.8)') : [""];
        if (this.faturamentoUFDepChart != undefined) {
          this.faturamentoUFDepChart.chart.config.data.labels = this.faturamentoUFDepChartLabels;
        }
        this.loadingDeposito = false;
      },
        error => {
          this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
          this.loadingDeposito = false;
      });
    this.depositoAlvo.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  getRandomColor(Min, Max, faturamento) {
    var low = [5, 69, 54];  // color of smallest datum
    var high = [151, 83, 34];   // color of largest datum

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

  bsPeriodoChange() {
    if (!this.firstRequest) {
      this.clearCensusData();
      this.loadCensusData();
      this.getUF();
    }

    this.firstRequest = false;
  }

  getUF() {
    let depMin = Number.MAX_VALUE;
    let depMax = -Number.MAX_VALUE;
    this.faturamentoUFChartColors = [
      { backgroundColor: [], hoverBackgroundColor: [], hoverBorderWidth: [], hoverBorderColor: [] }];
    this.restangular
      .all("dashboard")
      .get('faturamento_uf', { periodo: this.periodo, uf: '', id_usuario: this.user.id })
      .subscribe(ufDep => {
        ufDep.forEach(rec => {
          let ufFaturamento = rec.faturamento;
          let ufId = rec.uf;

          // keep track of min and max values
          if (ufFaturamento < depMin) {
            depMin = ufFaturamento;
          }
          if (ufFaturamento > depMax) {
            depMax = ufFaturamento;
          }
        })

        this.faturamentoUFChartLabels = ufDep.length > 0 ? ufDep.map(x => x.uf) : [""];
        this.faturamentoUFChartData = [
          {
            data: ufDep.length > 0 ? ufDep.map(x => x.faturamento) : [0],
            label: ufDep.length > 0 ? ufDep.map(x => x.uf) : [""]
          }
        ];
        this.faturamentoUFChartColors[0].backgroundColor = ufDep.length > 0 ? ufDep.map(x => this.getRandomColor(depMin, depMax, x.faturamento)) : [""];
        this.faturamentoUFChartColors[0].hoverBackgroundColor = ufDep.length > 0 ? ufDep.map(x => this.getRandomColor(depMin, depMax, x.faturamento)) : [""];
        this.faturamentoUFChartColors[0].hoverBorderWidth = ufDep.length > 0 ? ufDep.map(x => 2) : [""];
        this.faturamentoUFChartColors[0].hoverBorderColor = ufDep.length > 0 ? ufDep.map(x => 'rgba(12, 7, 70, 0.8)') : [""];
        if (this.faturamentoUFChart != undefined) {
          this.faturamentoUFChart.chart.config.data.labels = this.faturamentoUFChartLabels;
        }
 
      },
        error => {
          this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
      });
    this.loading = false;
  }


  getContadores() {
    this.restangular
      .all("dashboard")
      .get('faturamento_uf_contadores', { periodo: this.periodo, id_usuario: this.user.id })
      .subscribe(x => {
        this.total_clientes = x.total_clientes;
        this.total_depositos = x.total_depositos;
      });
  }

  girar() {
    this.flipDiv = !this.flipDiv;
  }
}
