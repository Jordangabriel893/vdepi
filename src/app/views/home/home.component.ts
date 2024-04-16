import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, ViewChild, ViewEncapsulation  } from "@angular/core";
import { Router } from "@angular/router";
import { InformationsService } from "app/serviços/informations.service";
// import Swiper core and required modules
import SwiperCore, { Virtual } from 'swiper/core';
import Swiper from 'swiper';
import { Lightbox } from "ngx-lightbox";
// install Swiper modules
SwiperCore.use([Virtual]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('sobre') sobre!: ElementRef;
  @ViewChild('produtos') produtos!: ElementRef;
  @ViewChild('swiperContainer') swiperContainer?: ElementRef;
  @ViewChild('swiperContainerPremios') swiperContainerPremios?: ElementRef;
  
  arrayFalso2 = [0, 1, 2];
  arrayParceiros = [
  "../../../assets/galeria/parceiro1.png",
  "../../../assets/galeria/parceiro2.png",
  "../../../assets/galeria/parceiro3.png",
  "../../../assets/galeria/parceiro4.png"]
  laboratorios = [];
  showMenu: boolean = false;
  readMore: boolean = false;
  dados;
  slides = Array.from({ length: 1000 }).map(
    (el, index) => `Slide ${index + 1}`
  );
  images= [
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
  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
    private informationsService: InformationsService,
    private _lightbox: Lightbox,
    ) {}
  ngOnInit() {

    this.informationsService.getDados().subscribe(data => {
      this.dados = data.departamentos;
      this.createAlbum();
      data.departamentos.map(item => this.laboratorios.push(...item.laboratorios));
    });
  }
  ngAfterViewInit(): void {
    if (this.swiperContainer) {
      new Swiper(this.swiperContainer.nativeElement, {
        slidesPerView: 3,
        spaceBetween: 30,
      });
    }
    if (this.swiperContainerPremios) {
      new Swiper(this.swiperContainerPremios.nativeElement, {
        slidesPerView: 3,
        spaceBetween: 30,
      });
    }
  }
  scrollToSection(section: string) {
    const element = this[section].nativeElement;
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
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
  navigateTo(nome){
    localStorage.setItem('title', nome);
    this.router.navigate([`departamento`]);

  }
  redirecionarParaHome() {
    this.router.navigate(['/home']);
  }
  redirecionarParaReadMore() {
    this.router.navigate(['/read-more']);
  }
  redirecionarParaFarmacologia(nome){
    localStorage.setItem('title', nome);
    this.router.navigate(['/departamento']);
  }
  redirecionarParaLaboratorio(nome){
    localStorage.setItem('titleLab', nome);
    this.router.navigate(['/laboratorio']);
  }
  readAbout(){
    this.readMore =  true;
  }
  createAlbum(){
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
