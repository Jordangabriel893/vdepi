import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gerencial',
  templateUrl: './gerencial.component.html',
  styleUrls: ['./gerencial.component.scss'],
})
export class GerencialComponent implements OnInit {

  ano: number = new Date().getFullYear();
  dados: UsuarioCadastroMensalModel[] = [];
  sub: Subscription[] = [];
  myChart: Chart;

  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.carregarDados();
  }

  renderizarGrafico() {
    const labels = this.dados.map(item => item.mesNome);
    const valores = this.dados.map(item => item.quantidade);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Cadastros',
          data: valores,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    this.createChart(data, options);
  }

  carregarDados() {
    this.sub.push(
      this.restangular.one(`/Dashboard/usuario-cadastro/${this.ano}`).get(this.ano)
      .subscribe(
        res => {
          this.dados = [];
          this.dados = res.data;
          this.renderizarGrafico();
        }
      ));
  }

  createChart(data: any, options: any) {
    if(this.myChart) this.myChart.destroy();

    const canvas = document.getElementById('grafico') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  }
}

type UsuarioCadastroMensalModel = {
  mes: number,
  quantidade: number,
  mesNome: string
}