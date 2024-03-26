import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmacologia',
  templateUrl: './farmacologia.component.html',
  styleUrls: ['./farmacologia.component.scss']
})
export class FarmacologiaComponent implements OnInit {
  arrayFalso = [ {
    src:'../../../assets/laboratorios/img1.png',
    title:'LABORATÓRIO DE FARMACOLOGIA'
  },
  {
    src:'../../../assets/laboratorios/img2.png',
    title:'LABORATÓRIO TEC BIO'
  },
  {
    src:'../../../assets/laboratorios/img3.png',
    title:'LABORATÓRIO LPNSP'
  },
  {
    src:'../../../assets/laboratorios/img4.png',
    title:'LABORATÓRIO FARMACOLOGIA MOLECULAR'
  },
  {
    src:'../../../assets/laboratorios/img5.png',
    title:'LABORATÓRIO SÍNTESE DE FARMACOS'
  },];
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

  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router
    ) {}
  ngOnInit() {}

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
  redirecionarParaFarmacologia(){
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