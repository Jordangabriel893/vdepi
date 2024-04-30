import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BannerComponent } from 'app/components/banner/banner.component';
import { InformationsService } from 'app/serviços/informations.service';

import { Lightbox } from 'ngx-lightbox';
@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  providers: [BannerComponent]
})
export class ReadMoreComponent implements OnInit {

  titleBanner = "VICE DIRETORIA DE EDUCAÇÃO, PESQUISA E INOVAÇÃO – VDEPI ";
  subtitleBanner = "Vice-diretora: Dra. Nubia Boechat";
  arrayFalso = [{
    src: '../../../assets/laboratorios/img1.png',
    title: 'LABORATÓRIO DE FARMACOLOGIA'
  },
  {
    src: '../../../assets/laboratorios/img2.png',
    title: 'LABORATÓRIO TEC BIO'
  },
  {
    src: '../../../assets/laboratorios/img3.png',
    title: 'LABORATÓRIO LPNSP'
  },
  {
    src: '../../../assets/laboratorios/img4.png',
    title: 'LABORATÓRIO FARMACOLOGIA MOLECULAR'
  },
  {
    src: '../../../assets/laboratorios/img5.png',
    title: 'LABORATÓRIO SÍNTESE DE FARMACOS'
  },];
  arrayFalso2 = [0, 1, 2];
  arrayParceiros = [
    "../../../assets/galeria/parceiro1.png",
    "../../../assets/galeria/parceiro2.png",
    "../../../assets/galeria/parceiro3.png",
    "../../../assets/galeria/parceiro4.png",
    "../../../assets/galeria/parceiro4.png"
  ];
  arrayNoticias = [
    "../../../assets/noticias/Notícia1.png",
    "../../../assets/noticias/Notícia 2.png"
  ]
  images = [
    {
      src: '../../../assets/galeria/img1.png',
      thumb: 'Descrição da Imagem 1'
    },
    {
      src: '../../../assets/galeria/img2.png',
      thumb: 'Descrição da Imagem 2'
    },
    {
      src: '../../../assets/galeria/img3.png',
      thumb: 'Descrição da Imagem 3'
    },
    {
      src: '../../../assets/galeria/img4.png',
      thumb: 'Descrição da Imagem 4'
    },
    {
      src: '../../../assets/galeria/img5.png',
      thumb: 'Descrição da Imagem 5'
    },
    {
      src: '../../../assets/galeria/img6.png',
      thumb: 'Descrição da Imagem 6'
    }
  ];
  _albums: Array<any> = [];
  showMenu: boolean = false;
  readMore: boolean = false;
  dados;
  laboratorios = [];
  slides = Array.from({ length: 1000 }).map(
    (el, index) => `Slide ${index + 1}`
  );

  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
    private _lightbox: Lightbox,
    private informationsService: InformationsService
  ) { }
  ngOnInit() {
    this.createAlbum()
    this.scrollToTop();
    this.informationsService.getDados().subscribe(data => {
      this.dados = data.departamentos;
      data.departamentos.map(item => this.laboratorios.push(...item.laboratorios));
    });
  }

  @HostListener('document:click', ['$event'])
  fecharControle(event: MouseEvent) {
    if (!(event.target instanceof Element)) {
      return;
    }
    if (!event.target.closest('.menu-img')) {
      this.showMenu = false;
    }
  }
  onSwiper(swiper) {

  }
  onSlideChange() {

  }
  redirecionarParaHome() {
    this.router.navigate(['/home']);
  }
  redirecionarParaReadMore() {
    this.router.navigate(['/read-more']);
  }
  redirecionarParaFarmacologia(nome) {


    localStorage.setItem('title', nome);
    this.router.navigate(['/departamento']);
  }
  redirecionarParaLaboratorio(nome) {
    localStorage.setItem('titleLab', nome);
    this.router.navigate(['/laboratorio']);
  }
  readAbout() {
    this.readMore = true;
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Para uma rolagem suave, se o navegador suportar
    });
  }
  createAlbum() {
    let i = 1
    this.images.forEach(img => {
      const src = img.src;
      const caption = img.thumb;
      const thumb = img.src;
      const album = { src: src, caption: caption, thumb: thumb };
      this._albums.push(album);
      i++

    })
  }
  open(index: number): void { // open lightbox 
    this._lightbox.open(this._albums, index);
  }

  close(): void { // close lightbox programmatically 
    this._lightbox.close();
  }

}
