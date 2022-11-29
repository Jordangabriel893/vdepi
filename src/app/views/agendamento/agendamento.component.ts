import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as XLSX from 'xlsx';
import { PdfService } from 'app/_services/pdf.service';
import { CurrencyFormatPipe } from 'app/directives/currency-format.pipe';
@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  formulario: FormGroup
  loading = true;
  agendamentos;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private pdfService: PdfService,
    private currency: CurrencyFormatPipe
  ) {

   }

  ngOnInit() {
    this.restangular.one('agendamento').get().subscribe(
      dados =>{
        console.log(dados.data)
        this.agendamentos= dados.data
        this.loading = false;
      },
      () => this.loading = false
    )

  }
  exportAsExcel() {
    const agendamentosParaEditar = this.agendamentos;
    const agendamentosModel = agendamentosParaEditar.map( item => {
      const placa = item.campos.filter(campo => campo.campo == "Placa")
      const chassi = item.campos.filter(campo => campo.campo == "Chassi")
      const renavam = item.campos.filter(campo => campo.campo == "Renavam")
      const cor = item.campos.filter(campo => campo.campo == "Cor")
      const uf = item.campos.filter(campo => campo.campo == "UF")
      const anoFab = item.campos.filter(campo => campo.campo == "Ano Fab.")
      const marcaModelo = item.campos.filter(campo => campo.campo == "Marca/Modelo")
      const anoMod = item.campos.filter(campo => campo.campo == "Ano Mod.")

      item = {
        dataAgendamento:item.dataAgendamento,
        descricaoLote:item.descricaoLote,
        documentoArrematante:item.documentoArrematante,
        leilao:item.leilao,
        localEndereco:item.localEndereco,
        nomeArrematante:item.nomeArrematante,
        numeroLote:item.numeroLote,
        placa: placa[0].valor || "",
        chassi: chassi[0].valor || "",
        renavam:renavam[0].valor || "",
        cor: cor[0].valor || "",
        uf: uf[0].valor || "",
        anoFab: anoFab[0].valor || "",
        marcaModelo: marcaModelo[0].valor || "",
        anoMod: anoMod[0].valor || "",

      }
    return item})
    console.log(agendamentosModel)

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(agendamentosModel);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Agendamentos');

    /* save to file */
    XLSX.writeFile(wb, 'Agendamentos.xlsx');
}

exportAsPDF() {
  let columns = [
    { title: "Nº Lote ", dataKey: "numeroLote" },
    { title: "Descrição", dataKey: "descricaoLote" },
    { title: "Data Agendamento", dataKey: "dataAgendamento" },
    { title: "Nome", dataKey: "nomeArrematante" },
    { title: "CPF/CNPJ", dataKey: "documentoArrematante" },
    { title: "Status", dataKey: "status" },
    { title: "Placa", dataKey: "placa" },
    { title: "Chassi", dataKey: "chassi" },
    { title: "Renavam", dataKey: "renavam" },


  ];

  const columStyles = {
    numeroLote: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
    descricaoLote: { columnWidth: 'auto', overflow: 'visible', valign: 'middle', halign: 'left' },
    dataAgendamento: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
    nomeArrematante: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
    documentoArrematante: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
    status: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },
    placa: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
    chassi: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },
    renavam: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },
  };

  const rows = this.agendamentos.map(e => {
    const placa = e.campos.filter(campo => campo.campo == "Placa")
    const chassi = e.campos.filter(campo => campo.campo == "Chassi")
    const renavam = e.campos.filter(campo => campo.campo == "Renavam")
    return {
      numeroLote: e.numeroLote || "",
      descricaoLote: e.descricaoLote || "",
      dataAgendamento: e.dataAgendamento || "",
      nomeArrematante: e.nomeArrematante || "",
      documentoArrematante: e.documentoArrematante || "",
      status: e.status || "",
      placa: placa[0].valor || "",
      chassi: chassi[0].valor || "",
      renavam:renavam[0].valor || "",
    }
  });

  const header = {
    agendamentos: 'Agendamentos'
  }

  this.pdfService.exportPdf('Agendamentos', "Agendamentos", rows, columns, columStyles, header, null);
}

  edit(id) {
    this.router.navigate(['/edit-listacontatos', id], { relativeTo: this.route });
  }
}
