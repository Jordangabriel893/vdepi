import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { forkJoin } from 'rxjs';
import * as fileSaver from 'file-saver';

// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-lotes-vistoria',
  templateUrl: './lotes-vistoria.component.html',
  styleUrls: ['./lotes-vistoria.component.scss']
})
export class LotesVistoriaComponent implements OnInit {
  id
  lote
  lotes
  tiposLote
  carregouVistoria
  vistoria
  loading = true;
  leilaoId
  itemThumb = 0
  thumbSwiper
  thumbOptions
  thumbsSwiper: any;
  loadingLaudo = false;
  status = [];
  statusSelecionado: any;
  loteSelecionado;
  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit() {
    forkJoin([
      this.restangular.one("lote", '').get({ leilaoId: this.id, PageSize: 300 }).pipe(),
      this.restangular.one("tipolote").get().pipe(),
      this.restangular.one("lotestatus").get().pipe(),
    ]).subscribe((allResp: any[]) => {
      this.lotes = allResp[0].data
      this.tiposLote = allResp[1].data
      this.status = allResp[2].data
      this.loading = false;
    },
      () => this.loading = false)

  }

  carregarVistoria(e) {
    forkJoin([
      this.restangular.one("lote", e.loteId).get().pipe(),
      this.restangular.one("vistoria", e.loteId).get().pipe()
    ]).subscribe((allResp: any[]) => {
      this.lote = allResp[0].data
      this.vistoria = allResp[1].data
      this.statusSelecionado = this.vistoria.statusId
      this.carregouVistoria = this.vistoria == null
    })

    this.loteSelecionado = e;
  }

  gravar() {
    this.restangular.all('vistoria').customPUT(this.vistoria, this.vistoria.vistoriaId).subscribe(a => {
      this.notifierService.notify('success', 'Lote Vistoriado com sucesso');
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar o Lote!');
      });

      let lote = this.lotes.find(x => x.loteId === this.loteSelecionado.loteId);
      lote.statusVistoriaId = parseInt(this.vistoria.statusId);
  }

  onSwiper(swiper) {
    this.thumbSwiper = swiper;
    this.thumbOptions = { swiper: this.thumbSwiper }
  }

  getCampoAlterado(loteCampoId) {
    return this.vistoria.campos.find(x => x.loteCampoId === loteCampoId);
  }

  gerarLaudo() {
    this.vistoria.statusId = this.statusSelecionado
    this.loadingLaudo = true;
    this.restangular.all('vistoria').one(`${this.vistoria.numero}/laudo`,)
      .withHttpConfig({ responseType: 'blob' })
      .get()
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        fileSaver.saveAs(blob, `Vistoria_${this.vistoria.numero}.pdf`);
        this.loadingLaudo = false;
      }, () => {
        this.notifierService.notify('error', 'Não foi possivel Gerar o laudo!');
        this.loadingLaudo = false;
      })
  }

  classStatusVistoria(lote) {

    if(this.loteSelecionado && this.loteSelecionado.loteId === lote.loteId) {
      return 'destaque';
    }

    if(!lote.statusVistoriaId) {
      return 'disabled';
    }

    switch(lote.statusVistoriaId) {
      case 3:
        return 'vistoriaCancelada';
      case 4:
        return 'vistoriaAprovada';
      case 5:
        return 'vistoriaReprovada';
      case 6:
        return 'vistoriaAprovadaRestricao';
    }
  }
}


