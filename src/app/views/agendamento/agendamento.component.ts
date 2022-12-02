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
  constructor(
    private restangular: Restangular,
    private formBuilder: FormBuilder
  ) {
    this.filtro =  this.formBuilder.group({
      data:[null],
      status:[null]
    })
   }

  ngOnInit() {
    this.restangular.one('agendamento').get().subscribe(
      dados =>{
        this.agendamentosDefault = dados.data;
        this.agendamentos= dados.data
        this.loading = false;
      },
      () => this.loading = false
    )

  }

  exportAsExcel() {
      const agendamentosModel = this.agendamentos.map(item => {
        const campos = item.campos.reduce((a, c) => ({...a, [c.campo]:c.valor}), {});
        item = {
          "Data Agendamento":item.dataAgendamento,
          "Leilão":item.leilao,
          "Numero Lote":item.numeroLote,
          "Descrição Lote":item.descricaoLote,
          "Documento Arrematante":item.documentoArrematante,
          "Nome Arrematante":item.nomeArrematante.toUpperCase(),
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
    this.setData();
  }

  setStatus() {
    const status = this.filtro.controls["status"].value;
    const agendamentosFiltrados = this.agendamentosDefault.filter(item => item.status === status)
    this.agendamentos = agendamentosFiltrados
  }

  setData() {
    const data = this.filtro.controls["data"].value;
    this.agendamentos = this.agendamentosDefault;
    if(data) {
      const dataFormatada = moment(data).format("DD/MM/YYYY");
      const agendamentosFiltrados = this.agendamentosDefault.filter(item => moment(item.dataAgendamento, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY") == dataFormatada)
      this.agendamentos = agendamentosFiltrados
    }
  }

}
