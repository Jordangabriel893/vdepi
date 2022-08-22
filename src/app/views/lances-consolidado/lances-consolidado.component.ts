import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as XLSX from 'xlsx';
import { PdfService } from 'app/_services/pdf.service';
import { CurrencyFormatPipe } from 'app/directives/currency-format.pipe';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-lancesconsolidado',
  templateUrl: './lances-consolidado.component.html',
  styleUrls: ['./lances-consolidado.component.scss']
})
export class LancesConsolidadoComponent implements OnInit {
  leiloes
  nomeLeilao:any = 'Leilões'
  lancesconsolidados
  loading = true;
  leilaoId;
  constructor(
    private restangular: Restangular,
    private pdfService: PdfService,
    private currency: CurrencyFormatPipe

  ) {
    this.restangular.one("admin/leilao").get({PageSize:100}).subscribe((response) => {
      this.leiloes = response.data
      this.nomeLeilao = this.leiloes[0].nome
      this.restangular.one(`leilao/${this.leiloes[0].id}/lancesConsolidado`).get().subscribe((response) => {
        this.loading = false;
        this.lancesconsolidados = response.data
        this.loading = false;
      },
      () => this.loading = false)
      // this.setLeilao(this.leiloes[0].id, this.leiloes[0].nome);
    })


   }

  ngOnInit() {
  }
  setLeilao(leilao){
    this.nomeLeilao = leilao.nome
    this.leilaoId = leilao.id
    this.restangular.one(`leilao/${this.leilaoId}/lancesConsolidado`).get().subscribe((response) => {
      this.loading = false;
      this.lancesconsolidados = response.data
      this.loading = false;
    },
    () => this.loading = false)

  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.lancesconsolidados);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'LancesConsolidados');

    /* save to file */
    XLSX.writeFile(wb, 'LancesConsolidados.xlsx');
}

exportAsPDF() {
  let columns = [
    { title: "Nº Lote ", dataKey: "numeroLote" },
    { title: "Descrição", dataKey: "descricao" },
    { title: "Categoria", dataKey: "categoria" },
    { title: "Lances", dataKey: "qteLances" },
    { title: "Usuários", dataKey: "qteUsuarios" },
    { title: "Avaliação", dataKey: "valorAvaliacao" },
     { title: "Taxa", dataKey: "valorTaxaAdministrativa" },
    { title: "Comissão", dataKey: "comissao" },
    { title: "Mínimo Vendas", dataKey: "valorMinimoVenda" },
    { title: "Lance Atual", dataKey: "lanceAtual" },
    { title: "Meta", dataKey: "meta" },

  ];

  const columStyles = {
    numeroLote: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
    descricao: { columnWidth: 'auto', overflow: 'visible', valign: 'middle', halign: 'left' },
    categoria: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
    qteLances: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
    qteUsuarios: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },
    valorAvaliacao: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
    valorTaxaAdministrativa: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
    comissao: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
    valorMinimoVenda: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },
    lanceAtual: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },
    meta: { columnWidth: 'wrap', overflow: 'linebreak', valign: 'middle', halign: 'left' },

  };

  const rows = this.lancesconsolidados.map(e => {
    return {
      numeroLote: e.numeroLote || "",
      descricao: e.descricao || "",
      categoria: e.categoria || "",
      qteLances: e.qteLances || "",
      qteUsuarios: e.qteUsuarios || "",
      valorAvaliacao: this.currency.transform(e.valorAvaliacao) || "",
      valorTaxaAdministrativa: this.currency.transform(e.valorTaxaAdministrativa) || "",
      comissao: this.currency.transform(e.comissao) || "",
      valorMinimoVenda: this.currency.transform(e.valorMinimoVenda) || "",
      lanceAtual: this.currency.transform(e.lanceAtual) || "",
      //boletoPago: e.boletoPago === 'S' ? 'SIM' : 'NÃO',
      meta: e.meta || ""


    }
  });

  const header = {
    leilao: this.nomeLeilao

  }

  // const groupRows = this.groupBy.transform(rows, 'tipo_veiculo');
  // const resumo = groupRows.map(x => (x.key + ': ' + x.value.length));
  // resumo.push("TOTAL: " + rows.length);

  this.pdfService.exportPdf('lancesconsolidados', "Lotes Consolidados", rows, columns, columStyles, header, null);
}

}
