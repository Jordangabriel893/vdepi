import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { forkJoin, Subscription } from 'rxjs';

import { MultiDataSet, Label } from 'ng2-charts';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sub: Subscription[] = [];
  id = 1
  leiloes
  formulario: FormGroup
  flipDiv: boolean = false;
  @ViewChild("barrasHorizontal") barrasHorizontal: ElementRef
  chartFinanceiro;
  //contadores
  contadorVisitantes = 0
  contadorHabilitados = 0
  contadorParticipantes = 0
  contadorLances = 0
  //lotes
  comLances
  removidos
  semLances
  totalLotes

  //previsto x arrematado
  minimoVendasPrevisto
  lancesOfertados

  //financeiro
  listaArrematados
  listaPago
  listaPendentes
  listaExpirados
  // Doughnut
  public doughnutChartLabels: Label[] = ['Com Lances', 'Removidos', 'Sem Lances'];
  public doughnutChartData: MultiDataSet = [[0,0,0]];
  public doughnutChartType: ChartType = 'doughnut';
  doughnutChartOptions = {
    aspectRatio: 1,
    responsive: true,
  }

  //Barras  top-10
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
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  public barChartColor = [{ backgroundColor: ['	#87CEFA','#4876FF','#436EEE','#3A5FCD',' #27408B', '#0000FF', '	#0000EE', '#0000CD', '#00008B', '#191970'] }]

  //Barras Financeiro
  public barChartOptionsFinanceiro: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false
    }


  };
  public barChartColorFinanceiro = [{ backgroundColor: ['#191970', ' #15f70e', '#fc7a00', 'red'] }]
  public barChartLabelsFinanceiro: Label[] = ['Arrematado', 'Pago', 'Pendente', 'Vencido'];
  public barChartTypeFinanceiro: ChartType = 'bar';
  public barChartLegendFinanceiro = false;

  public barChartDataFinanceiro: ChartDataSets[] = [
    { data: [], label: '' },

  ];

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,) {
    this.formulario = this.formBuilder.group({
      id: [this.id]
    });
  }

  ngOnInit() {

  }

  buscarLeilao(event?) {
    if(!event){
      return false;
    }

    this.id = event.id


    this.sub.push( this.restangular.one("dashboard/contadores").get({ LeilaoId: this.id }).subscribe((response) => {
      this.contadorVisitantes = response.data.visitantes
      this.contadorHabilitados = response.data.habilitados
      this.contadorParticipantes = response.data.participantes
      this.contadorLances = response.data.lances
    })
    )

   this.sub.push( this.restangular.one("dashboard/contadores-lotes").get({ LeilaoId: this.id }).subscribe((response) => {
      this.comLances = response.data.comLances
      this.removidos = response.data.removidos
      this.semLances = response.data.semLances
      this.totalLotes = response.data.total
      this.doughnutChartData = [[this.comLances, this.removidos, this.semLances]]

    })
   )
   this.sub.push( this.restangular.one("dashboard/top10lotes").get({ LeilaoId: this.id }).subscribe((response) => {

      const top10lotes = response.data.reverse();
      const lances = top10lotes.map(x => x.lances)
      const numeroLote = top10lotes.map(x => x.numeroLote)
      this.barChartData = [{ data: lances, label: 'Qtd de Lances'}]
      this.barChartLabels = numeroLote

    })
   )
   this.sub.push( this.restangular.one("dashboard/financeiro").get({ LeilaoId: this.id }).subscribe((response) => {
       const finaceiro = response.data
     this.listaExpirados = finaceiro.filter(x => x.status == 'Vencido')
     this.listaPendentes = finaceiro.filter(x => x.status == 'Pendente')
     this.listaPago = finaceiro.filter(x => x.status == 'Pago')
     this.listaArrematados = finaceiro
     this.barChartDataFinanceiro = [{ data: [finaceiro.length, this.listaPago.length, this.listaPendentes.length, this.listaExpirados.length, 0] },]

    })
   )
   this.sub.push( this.restangular.one("dashboard/previsto-arrematado").get({ LeilaoId: this.id }).subscribe((response) => {
          if(this.chartFinanceiro) {
             this.chartFinanceiro.clear();
             this.chartFinanceiro.destroy();
          }

          this.minimoVendasPrevisto = response.data.minimoVendasPrevisto
          this.lancesOfertados = response.data.lancesOfertados
          const data =  {
            labels: ["Mínimo de Vendas Previsto", "Total de Lances ofertados"],
            datasets: [
              {
                label: "R$",
                backgroundColor: ["rgb(38, 1, 250)", "rgb(10, 250, 1)"],
                data: [this.minimoVendasPrevisto, this.lancesOfertados, 0]
              }
            ]
          }
          this.chartFinanceiro = new Chart(this.barrasHorizontal.nativeElement, {
            type: 'horizontalBar',
            data:data,
            options: {
              legend: { display: false },
              title: {
                display: false,
              },
              tooltips: {
                callbacks: {
                  label: function (tooltipItem, data) {
                    const datasetLabel = data.datasets[tooltipItem.datasetIndex].data || '';
                    return tooltipItem.xLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                  }
                }
              },
            scales: {
              xAxes: [{
                stacked: true,
                gridLines: {
                  display: false
                },
                ticks: {
                  callback: function (value, index, values) {
                    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                  }
                },
              }],
              // We use this empty structure as a placeholder for dynamic theming.

            },


            }

          });
    },
    error => {

    })
   )

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }

  girar() {
    this.flipDiv = !this.flipDiv;
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
