import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { forkJoin } from 'rxjs';

import { MultiDataSet, Label } from 'ng2-charts';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  id
  flipDiv: boolean = false;
  @ViewChild("barrasHorizontal") barrasHorizontal: ElementRef
  //contadores
  contadorVisitantes
  contadorHabilitados
  contadorParticipantes
  contadorLances
  //lotes
  arrematados
  removidos
  semLances
  totalLotes

  //previsto x arrematado
  previsto
  arrematado

  //financeiro
  listaArrematados
  listaPago
  listaPendentes
  listaExpirados
  // Doughnut
  public doughnutChartLabels: Label[] = ['Arrematados', 'Removidos', 'Sem Lance'];
  public doughnutChartData: MultiDataSet = [
    [300, 450, 100],

  ];
  public doughnutChartType: ChartType = 'doughnut';

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
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartData: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public barChartColor = [{ backgroundColor: [' #c0ffee', '#b000b5', '#d13537', '#1E90FF', '#FFFF00', '#8A2BE2'] }]
  //Barras Financeiro
  public barChartOptionsFinanceiro: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

  };
  public barChartColorFinanceiro = [{ backgroundColor: ['#8A2BE2', ' #c0ffee', '#b000b5', '#d13537'] }]
  public barChartLabelsFinanceiro: Label[] = ['Arrematado', 'Pago', 'Pendente', 'Expirado'];
  public barChartTypeFinanceiro: ChartType = 'bar';
  public barChartLegendFinanceiro = true;
  // public chartColors: Array<any> = [{
  // fillColor: 'rgba(47, 132, 71, 0.8)',
  // strokeColor: 'rgba(47, 132, 71, 0.8)',
  // }

  //   ];
  public barChartDataFinanceiro: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },

  ];

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,) {
    this.id = this.route.snapshot.params['id'];


    forkJoin([
      this.restangular.one("dashboard/contadores").get({ LeilaoId: this.id }).pipe(),
      this.restangular.one("dashboard/contadores-lotes").get({ LeilaoId: this.id }).pipe(),
      this.restangular.one("dashboard/top10lotes").get({ LeilaoId: this.id }).pipe(),
      this.restangular.one("dashboard/financeiro").get({ LeilaoId: this.id }).pipe(),
      this.restangular.one("dashboard/previsto-arrematado").get({ LeilaoId: this.id }).pipe(),

    ]).subscribe((allResp: any[]) => {

      console.log(allResp[0].data) 
      console.log(allResp[1].data) 
      console.log(allResp[2].data) 
      console.log(allResp[3].data)
      console.log(allResp[4].data)  

      //previsto x arrematado
      this.previsto = allResp[4].data.previsto
      this.arrematados = allResp[4].data.arrematado
      new Chart(this.barrasHorizontal.nativeElement, {
        type: 'horizontalBar',
        data: {
          labels: ["Previsto", "Arrematado"],
          datasets: [
            {
              label: "",
              backgroundColor: ["rgb(10, 250, 1)", "rgb(38, 1, 250)"],
              data: [this.previsto, this.arrematados, 0]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: false,
            text: 'Predicted world population (millions) in 2050'
          }
        }
      });

      
      //contador
      this.contadorVisitantes = allResp[0].data.visitantes
      this.contadorHabilitados = allResp[0].data.habilitados
      this.contadorParticipantes = allResp[0].data.participantes
      this.contadorLances = allResp[0].data.lances

      //lotes
      this.arrematados = allResp[1].data.arrematados
      this.removidos = allResp[1].data.removidos
      this.semLances = allResp[1].data.semLances
      this.totalLotes = allResp[1].data.total
      this.doughnutChartData = [[this.arrematados, this.removidos, this.semLances]]

      //top-10 lotes
      const top10lotes = allResp[2].data
      const lances = top10lotes.map(x => x.lances)
      const numeroLote = top10lotes.map(x => x.numeroLote)
      this.barChartData = [{ data: lances.reverse(), label: 'Top 10 Lotes' }]
      this.barChartLabels = lances

      //financeiro
      const finaceiro = allResp[3].data
      this.listaExpirados = finaceiro.filter(x => x.status == 'Expirado')
      this.listaPendentes = finaceiro.filter(x => x.status == 'Pendente')
      this.listaPago = finaceiro.filter(x => x.status == 'Pago')
      this.listaArrematados = finaceiro
      this.barChartDataFinanceiro = [{ data: [finaceiro.length, this.listaPago.length, this.listaPendentes.length, this.listaExpirados.length, 0] },]

    });


  }


  ngOnInit() {

  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  girar() {
    this.flipDiv = !this.flipDiv;
  }
}
