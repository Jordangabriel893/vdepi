import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, ViewChild, ViewEncapsulation  } from "@angular/core";
import { Router } from "@angular/router";
import { InformationsService } from "app/serviços/informations.service";
// import Swiper core and required modules
import SwiperCore, { Virtual } from 'swiper/core';
import Swiper from 'swiper';
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

  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
    private informationsService: InformationsService
    ) {}
  ngOnInit() {

    this.informationsService.getDados().subscribe(data => {
      this.dados = data.departamentos;
      data.departamentos.map(item => this.laboratorios.push(...item.laboratorios));
    });
  }
  ngAfterViewInit(): void {
    if (this.swiperContainer) {
      new Swiper(this.swiperContainer.nativeElement, {
        // Opções do Swiper aqui
        // Por exemplo:
        slidesPerView: 3,
        spaceBetween: 30,
        // Mais opções: https://swiperjs.com/api/
      });
    }
    if (this.swiperContainerPremios) {
      new Swiper(this.swiperContainerPremios.nativeElement, {
        // Opções do Swiper aqui
        // Por exemplo:
        slidesPerView: 3,
        spaceBetween: 30,
        // Mais opções: https://swiperjs.com/api/
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
}
