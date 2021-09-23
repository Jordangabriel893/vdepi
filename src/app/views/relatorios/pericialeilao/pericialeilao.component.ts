import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../../_services/index';
import * as moment from 'moment';
import { PdfService } from 'app/_services/pdf.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  templateUrl: 'pericialeilao.component.html',
  styleUrls: ['./pericialeilao.component.css']
})
export class PericiaLeilaoComponent implements OnInit {

  loading: boolean = false;
  placa = "";
  chassi = "";
  grv = "";
  pericialeilao = undefined;
  dataAtual = moment().format("DD/MM/YYYY [as] HH:mm:ss");

  constructor(
    private notifierService: NotifierService,
    private pdfService: PdfService,
    private restangular: Restangular,
    private cdr: ChangeDetectorRef,
    private auth: AuthenticationService) { }

  ngOnInit(): void {

  }


  getPericiaLeilao() {
    if(this.placa || this.chassi || this.grv) {
      this.loading = true;
      this.pericialeilao = undefined;
      this.restangular.all("pericialeilao")
      .get('', { placa: this.placa, chassi: this.chassi, numero_formulario_grv: this.grv })
      .subscribe(p => {
        this.pericialeilao = p;
        this.loading = false;
        this.placa = "";
        this.chassi = "";
        this.grv = "";
      });
    } else {
      this.loading = false;
      this.notifierService.notify('error', 'informe Placa, Chassi ou GRV para buscar o laudo');
    }
  }

  exportAsPDF(div_id)
  {
    this.pdfService.html2pdf(div_id, "Relatorio", 10);
  }

}
