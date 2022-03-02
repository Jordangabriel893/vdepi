import { ElementRef, Injectable } from '@angular/core';
import * as Model from './../views/_models/model';
import { Logo } from './../views/_models/Logo';

import * as jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as moment from 'moment'
import 'moment/locale/pt-br';
import { FormatPhonePipe } from "./../directives/format-phone.pipe"
import { CurrencyFormatPipe } from "./../directives/currency-format.pipe"
import { Restangular } from 'ngx-restangular';
import html2canvas from 'html2canvas';


@Injectable()
export class PdfService {

  constructor(
    private currency: CurrencyFormatPipe,
    private formatPhone: FormatPhonePipe,
    private restangular: Restangular) { }


  createRemessaDoc(remessa: Model.DispositivoRemessa, doc) {

    var imgData = Logo.imgDataUrl;

    var header = () => {
      //HEADER
      doc.setTextColor(0);
      doc.addImage(imgData, 'JPEG', 20, 20, 222, 90);
      doc.setFontSize(16);
      doc.setFontStyle('bold');
      doc.text(`TRANSFERÊNCIA:  #${remessa.id}`, 280, 50);

      doc.setFontSize(12)
      doc.setFontStyle('bold');
      doc.text("Data:", 280, 75);
      doc.text("Destino:", 280, 90);

      doc.setFontStyle('normal');
      doc.text(`${moment(remessa.data_remessa).format("DD [de] MMMM [de] YYYY")}`, 390, 75);
      doc.text(`${remessa.cliente.nome}`, 390, 90);
    }

    var footer = () => {
        //FOOTER
        doc.setFontSize(8);
        doc.setFontStyle('normal');
        doc.setTextColor(150);

        doc.text(moment().format("LLLL"), 20, (doc.internal.pageSize.getHeight() - 20));
        //page++;
    }

    header();

    //BODY PAGINA DE PRODUTOS
    doc.setFontSize(10)
    doc.setFontStyle('bold');
    doc.text("Informações da Transferência:", 30, 135);

    doc.setFontSize(10)
    doc.setFontStyle('normal');

    var itensRemessa = "Qtd. Dispositivos: " + remessa.total_dispositivo;
    var text = doc.splitTextToSize(itensRemessa, 150);
    doc.text(text, 40, 155);

    let columns = [
      { title: "#", dataKey: "id" },
      { title: "Imei", dataKey: "imei" },
      { title: "Fabricante", dataKey: "fabricante" },
      { title: "Modelo", dataKey: "modelo" },
    ];

    let data = [];
    let i = 1;
    for (let opv of remessa.remessaItens) {
      //let order = sso.shiftOrder.order;
      data.push({
        id: i,
        imei: opv.dispositivo.imei,
        fabricante: opv.dispositivo.fabricante,
        modelo: opv.dispositivo.modelo
      });
      i++;
    }

    doc.orderId = remessa.id;
    doc.autoTable(columns, data, {
      theme: 'grid',
      styles: { fontSize: 8 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      headerStyles: { fillColor: [110, 110, 110] },
      margin: { left: 20, right: 20, top: 40, bottom: 40 },
      startY: 150 + (15 * text.length),
      columnStyles: {
        id: { columnWidth: 'auto', overflow: 'linebreak', halign: 'center', valign: 'middle' },
        imei: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
        fabricante: { columnWidth: 'auto', overflow: 'linebreak', halign: 'left', valign: 'middle' },
        modelo: { columnWidth: 'auto', valign: 'middle', halign: 'left' },
      },
      addPageContent: function (data) {
        footer();
      }
    });

    var position = [50,  90, 120, 115];
    var overflow = false;

    position.forEach((item) => {
      if ((doc.autoTable.previous.finalY + item) > doc.internal.pageSize.getHeight()) {
        overflow = true;
      }
    });

    if (overflow) {
      doc.addPage();
      footer();
    }


    //PAGINA ASSINATURA DO CLIENTE
    doc.addPage();

    header();

    doc.setFontSize(12)

    doc.text("Observações:", 20, 135);

    doc.rect(20, 120, 550, 150)

    doc.text("Confirmo o recebimento em ________/ _____ / __________ às _____: _____", 20, 290);
    doc.text("Nome: ________________________________________________________", 20, 310);
    doc.text("Assinatura: ____________________________________________________", 20, 330);

    footer();

  }

  private positionXRight(doc, text) {
    return doc.internal.pageSize.width - 21 - (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) ;
  }

  html2pdf(
    elementId: string,
    fileName: string,
    margin: number,
    timeout = 2000
  ) {
    const element = document.getElementById(elementId),
    options = {
        imageTimeout: timeout,
        background: "white",
        allowTaint : true,
        useCORS: false,
        height: element.clientHeight,
        width: element.clientWidth
    };

    html2canvas(element, options).then((canvas) => {
      let imgData = canvas.toDataURL('image/png');

      let imgWidth = 210 - 2*margin,
          // pageHeight = 295,
          imgHeight = canvas.height * imgWidth / canvas.width,
          // heightLeft = imgHeight,
          doc = new jsPDF('p', 'mm'),
          position = margin * 2;


      doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      // heightLeft -= pageHeight;

      // while (heightLeft >= 0) {
      //     position = heightLeft - imgHeight;
      //     doc.addPage();
      //     doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      //     heightLeft -= pageHeight;
      // }
      doc.save( fileName+'.pdf');
    });
  }

  exportPdf(filename, title, rows, columns, columnStyles, objExtra, objResumo) {

    //var imgData = Logo.imgDataUrl;
    const doc = new jsPDF('l', 'pt', 'a4');
    doc.page=1;
    var totalPagesExp = "{total_pages_count_string}";

    const header = () => {
      //HEADER
      doc.setTextColor(0);
      doc.setFontSize(16);
      doc.setFontStyle('bold');
      doc.text(title, ((doc.internal.pageSize.getWidth() / 2) - (title.length + 50)), 40);

      doc.setFontSize(12)
      doc.setFontStyle('bold');
      doc.text("Leilão:", 20, 75);
      //doc.text("Deposito:", 20, 90);

      doc.text("Data de Emissão:", 615, 75);
      if(objExtra.periodo && objExtra.periodo.length === 2) {
        doc.text("Periodo:", 615, 90);
      }

      doc.setFontStyle('normal');
      doc.text(`${objExtra.leilao}`, 80, 75);
      //doc.text(`${objExtra.deposito}`, 80, 90);
      doc.text(`${moment().format("DD/MM/YYYY HH:mm")}`, 720, 75);

      if(objExtra.periodo && objExtra.periodo.length === 2) {
        doc.text(moment(objExtra.periodo[0]).format("DD/MM/YYYY") + ' até ' + moment(objExtra.periodo[1]).format("DD/MM/YYYY"), 670, 90);
      }


    }

    var footer = () => {
        //FOOTER
        doc.setFontSize(8);
        doc.setFontStyle('normal');
        doc.setTextColor(150);

        doc.text(moment().format("LLLL") + ' - ' + objExtra.usuario, 20, (doc.internal.pageSize.getHeight() - 20));

        let str = "Página " + doc.page;
        if (typeof doc.putTotalPages === 'function') {
          str = str + " de " + totalPagesExp;
        }
        doc.text(str, doc.internal.pageSize.getWidth() - 80, (doc.internal.pageSize.getHeight() - 20));
        doc.page++;
    }

    header();

    // doc.orderId = remessa.id;
    doc.autoTable(columns, rows, {
      theme: 'grid',
      styles: { fontSize: 8 },
      tableWidth: 'auto',
      alternateRowStyles: { fillColor: [240, 240, 240] },
      headerStyles: { fillColor: [110, 110, 110] },
      margin: { left: 20, right: 20, top: 40, bottom: 40 },
      startY: 100,
      columnStyles: columnStyles,
      addPageContent: function (data) {
        footer();
      }
    });

    if(objResumo && objResumo.length > 0) {
      if ((doc.autoTable.previous.finalY + 40) > doc.internal.pageSize.getHeight()) {
        doc.addPage();
        footer();
      }

      doc.setDrawColor(110, 110, 110);
      doc.line(20, doc.autoTable.previous.finalY + 20, doc.internal.pageSize.getWidth() - 20, doc.autoTable.previous.finalY + 20);
      let spaceH = 20;
      let spaceV = 40;
      objResumo.forEach(r => {
        if(spaceH > (doc.internal.pageSize.getWidth() - 80)) {
          spaceV += 15;
          spaceH = 20;
        }
        doc.setFontSize(9)
        doc.setFontStyle('normal');
        doc.text(r, spaceH ,doc.autoTable.previous.finalY + spaceV);
        spaceH += 200;
      });
    }


    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save(filename + ".pdf");

  }

}
