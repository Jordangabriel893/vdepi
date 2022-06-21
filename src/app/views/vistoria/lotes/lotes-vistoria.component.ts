import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { forkJoin } from 'rxjs';

// import Swiper core and required modules
import SwiperCore, {  Navigation, Thumbs} from "swiper";

// install Swiper modules
SwiperCore.use([ Navigation, Thumbs]);

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
  loading
  leilaoId
  itemThumb = 0
  thumbSwiper
  thumbOptions
  thumbsSwiper: any;
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
      this.restangular.one("lote", '').get({ leilaoId: this.id, PageSize:100 }).pipe(),
      this.restangular.one("tipolote").get().pipe(),
    ]).subscribe((allResp: any[]) => {
      this.lotes = allResp[0].data
      this.tiposLote = allResp[1].data
      console.log(this.lotes)
    })
    
  }

  carregarVistoria(e){
    forkJoin([ 
      this.restangular.one("lote", e.loteId).get().pipe(),
      this.restangular.one("vistoria", e.loteId).get().pipe()
    ]).subscribe((allResp: any[]) => { 
      this.lote = allResp[0].data
      this.vistoria = allResp[1].data
      this.carregouVistoria = this.vistoria == null
    })
  }

  gravar(){

    this.restangular.all('vistoria').customPUT(this.vistoria, this.vistoria.vistoriaId).subscribe(a => {
        this.notifierService.notify('success', 'Lote Vistoriado com sucesso');
        this.tornaVistoriado()
      },
        error => {
          this.notifierService.notify('error', 'Erro ao atualizar o Lote!');
        });

  }
  tornaVistoriado(){
    const objIndex = this.lotes.findIndex((obj => obj.loteId == this.lote.loteId));
    this.lotes[objIndex].Vistoriado = true
    console.log(this.lotes[objIndex])
  }

  onSwiper(swiper) {
    this.thumbSwiper = swiper;
    this.thumbOptions = { swiper: this.thumbSwiper}
    console.log(swiper);
  }
}


