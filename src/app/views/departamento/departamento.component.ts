import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InformationsService } from 'app/serviços/informations.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer?: ElementRef;
  @ViewChild('swiperContainerEquipe') swiperContainerEquipe?: ElementRef;
  arrayFalso2 = [0, 1, 2];
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
  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
    private informationsService: InformationsService
    ) {}
  ngOnInit() {

    const title = localStorage.getItem('title');
    this.informationsService.getDados().subscribe(data => {
      this.dados = data.departamentos.find(item => item.nome == title);
      setTimeout(()=>{this.createSwipers();}, 1000)
    });

  }
  ngAfterViewInit(): void {
    
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
  createSwipers(){
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
}

