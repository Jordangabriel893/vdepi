import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as Model from '../../_models/model'
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment'
import { AuthenticationService } from '../../../_services/index';
import * as XLSX from 'xlsx';
import { PdfService } from 'app/_services/pdf.service';
import { GroupByPipe2 } from '../../../directives/groupBy2.pipe'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CurrencyFormatPipe } from 'app/directives/currency-format.pipe';

@Component({
  templateUrl: 'notasfiscais.component.html'
})
export class NotasFiscaisComponent implements OnInit {

  loading = false;
  user;
  dadosRelatorio;


  firstRequest = true;
  periodo: any[] = [moment().startOf('month').toDate(), moment().toDate()];
  clientes: Model.Cliente[];
  clienteSelected: Model.Cliente = { nome: 'CLIENTE', id_cliente: 0, depositos: [] };
  depositoSelected: Model.Deposito = { descricao: 'DEPÓSITO', id_deposito: 0, flag_virtual: '' };

  bsConfig = {
    containerClass: 'theme-blue',
    rangeInputFormat: 'DD [de] MMMM [de] YYYY',
    showWeekNumbers: false,
    locale: 'pt-BR'
  };

  constructor(
    private notifierService: NotifierService,
    private pdfService: PdfService,
    private restangular: Restangular,
    private auth: AuthenticationService,
    private groupBy: GroupByPipe2,
    private currency: CurrencyFormatPipe) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.getClientes()
      .subscribe((c: Model.Cliente[]) => {
        this.clientes = c;
      });
  }

  updateDashboard() {
    this.loading = true;
    this.getRelatorio();
  }

  getRelatorio() {
    this.restangular.all('relatorios').customGET('notasfiscais',
    {
      periodo: this.periodo,
      id_cliente: this.clienteSelected.id_cliente,
      id_deposito: this.depositoSelected.id_deposito,
      id_usuario: this.user.id,
    })
      .subscribe((rel) => {
        this.dadosRelatorio = rel;
        this.loading = false;
      },
      error => {
        this.notifierService.notify('error', 'Erro ao buscar dados do relatório!');
        this.loading = false;
      });
  }

  getClientes() {
    const user = this.auth.getUser();
    return this.restangular.one('cliente/usuario', user.id).getList('', { flag_virtual: false });
  }

  setCliente(cli) {
    this.clienteSelected = cli;
  }

  setDeposito(dep) {
    this.depositoSelected = dep;
    this.updateDashboard();
  }

  exportAsExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dadosRelatorio);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(wb, ws, 'NotasFiscais');

      /* save to file */
      XLSX.writeFile(wb, 'RelatorioNotasFiscais.xlsx');
  }

  exportAsPDF() {
    const columns = [
      { title: 'Processo', dataKey: 'numero_formulario_grv' },
      { title: 'Nº NFE', dataKey: 'numero_nota_fiscal' },
      { title: 'Cod. Verif.', dataKey: 'codigo_verificacao' },
      { title: 'CPF/CNPJ', dataKey: 'cpf_cnpj' },
      { title: 'Nome', dataKey: 'nota_fiscal_nome' },
      { title: 'Data Liberação', dataKey: 'data_liberacao_grv' },
      // { title: "Atividade", dataKey: "atividade" },
      { title: 'Total', dataKey: 'total_com_desconto' },
      { title: 'Cod', dataKey: 'codigo_erro' },
      { title: 'Mensagem', dataKey: 'mensagem_erro' },
    ];

    const columStyles = {
      numero_formulario_grv: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
      numero_nota_fiscal: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      codigo_verificacao: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
      cpf_cnpj: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      nota_fiscal_nome: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
      data_liberacao_grv: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      // atividade: { columnWidth: 'auto', overflow: 'visible', valign: 'middle', halign: 'left' },
      total_com_desconto: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
      codigo_erro: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
      mensagem_erro: { columnWidth: 150, overflow: 'linebreak', valign: 'middle', halign: 'left' },
    };

    const rows = this.dadosRelatorio.map(e => {
      return {
        numero_formulario_grv: e.numero_formulario_grv || '',
        numero_nota_fiscal: e.numero_nota_fiscal || '',
        codigo_verificacao: e.codigo_verificacao || '',
        cpf_cnpj: e.cpf_cnpj || '',
        nota_fiscal_nome: e.nota_fiscal_nome || '',
        data_liberacao_grv: moment(e.data_liberacao_grv).format('DD/MM/YYYY HH:ss'),
        // atividade: e.atividade || "",
        total_com_desconto: this.currency.transform(e.total_com_desconto) || '',
        codigo_erro: e.codigo_erro || '',
        mensagem_erro: e.mensagem_erro || '',
      }
    });

    const header = {
      cliente: this.clienteSelected.nome,
      deposito: this.depositoSelected.descricao,
      periodo: this.periodo,
      usuario: this.user.username
    }

    // const groupRows = this.groupBy.transform(rows, 'tipo_veiculo');
    // const resumo = groupRows.map(x => (x.key + ': ' + x.value.length));
    // resumo.push("TOTAL: " + rows.length);

    this.pdfService.exportPdf('NotasFiscais', 'Notas Fiscais', rows, columns, columStyles, header, null);
  }
}
