import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  loading = true;
  agendamentos;
  agendamentosDefault;
  filtro: FormGroup;
  leiloes;
  constructor(
    private restangular: Restangular,
    private formBuilder: FormBuilder
  ) {
    this.filtro =  this.formBuilder.group({
      data: [null],
      status: ['todos'],
      leilao: ['todos']
    })
   }

  ngOnInit() {
    this.restangular.one('agendamento').get().subscribe(
      dados => {
        this.agendamentosDefault = dados.data;
        this.agendamentos = dados.data
        this.loading = false;
      },
      () => this.loading = false
    )

    this.restangular.all('admin').one('leilao').get({PageSize: 100}).subscribe((response) => {
      this.leiloes = response.data;
      this.leiloes.sort(function(a, b) {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
      })
    })

  }

  exportAsExcel() {
      const agendamentosModel = this.agendamentos.map(item => {
        const campos = item.campos.reduce((a, c) => ({...a, [c.campo]: c.valor}), {});
        item = {
          'Data Agendamento': item.dataAgendamento,
          'Status': item.status,
          'Leilão': item.leilao,
          'Numero Lote': item.numeroLote,
          'Descrição Lote': item.descricaoLote,
          'Documento Arrematante': item.documentoArrematante,
          'Nome Arrematante': item.nomeArrematante.toUpperCase(),
          ...campos
        }

        return item
      })

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(agendamentosModel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(wb, ws, 'Agendamentos');

      /* save to file */
      XLSX.writeFile(wb, 'Agendamentos.xlsx');
  }

  onValueChange(event, campo) {
    this.filtro.get(campo).markAsTouched();
    this.filtro.get(campo).setValue(event);
    this.filtrar();
  }

  filtrar() {
    const leilao = this.filtro.controls['leilao'].value;
    const status = this.filtro.controls['status'].value;
    const data = this.filtro.controls['data'].value;
    let agendamentoFiltrados = this.agendamentosDefault;
    if (leilao !== 'todos') {
      agendamentoFiltrados = agendamentoFiltrados.filter(item => item.leilao === leilao)
    }

    if (data) {
      const dataFormatada = moment(data).format('DD/MM/YYYY');
      agendamentoFiltrados = agendamentoFiltrados.filter(item => moment(item.dataAgendamento, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY') == dataFormatada)
    }

    if (status !== 'todos') {
      agendamentoFiltrados = agendamentoFiltrados.filter(item => item.status === status)
    }

    this.agendamentos = agendamentoFiltrados
  }
}
