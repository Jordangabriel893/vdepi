import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InformationsService } from 'app/serviços/informations.service';
import { Lightbox } from 'ngx-lightbox';
import Swiper from 'swiper';
@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.scss']
})
export class LaboratorioComponent implements OnInit {
  @ViewChild('swiperContainer') swiperContainer?: ElementRef;
  @ViewChild('swiperContainerEquipe') swiperContainerEquipe?: ElementRef;
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
  titleBanner: string = "";
  Subtitle: string = "";
  link: string = "";
  images: any[] = [];
  arrayParceiros = [
    "../../../assets/galeria/parceiro1.png",
    "../../../assets/galeria/parceiro2.png",
    "../../../assets/galeria/parceiro3.png",
    "../../../assets/galeria/parceiro4.png"]
  showMenu: boolean = false;
  readMore: boolean = false;
  slides = Array.from({ length: 1000 }).map(
    (el, index) => `Slide ${index + 1}`
  );
  dados;
  _albums: Array<any> = [];
  departamento;
  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
    private informationsService: InformationsService,
    private _lightbox: Lightbox,
  ) { }
  ngOnInit() {
    this.scrollToTop();
    const title = localStorage.getItem('titleLab');
    this.informationsService.getDados().subscribe(data => {
      this.departamento = data.departamentos.find(item => item.laboratorios.some(lab => lab.nome == title));
      this.dados = this.departamento.laboratorios.find(lab => lab.nome == title);
      // console.log('dados=>', this.dados)
      this.images = this.departamento.galeria;

      this.titleBanner = this.dados.nome;
      this.Subtitle = this.dados.pesquisadorResponsavel;
      this.link = this.dados.linkPesquisadorResponsavel;
      this.createAlbum();
      setTimeout(() => { this.createSwipers(); }, 1000)
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
  createSwipers() {
    if (this.swiperContainer) {
      new Swiper(this.swiperContainer.nativeElement, {
        // Opções do Swiper aqui
        // Por exemplo:
        slidesPerView: 3,
        spaceBetween: 30,
        // Mais opções: https://swiperjs.com/api/
      });
    }
    if (this.swiperContainerEquipe) {
      new Swiper(this.swiperContainerEquipe.nativeElement, {
        // Opções do Swiper aqui
        // Por exemplo:
        slidesPerView: 3,
        spaceBetween: 30,
        // Mais opções: https://swiperjs.com/api/
      });
    }
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


      const src = `${img}?width=2000&height=2000`;
      const caption = `thumbnail ${0 + i}`;
      const thumb = `${img}?width=2000&height=2000`;
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
