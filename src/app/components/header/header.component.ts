import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationsService } from 'app/serviços/informations.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showMenu: boolean = false;
  constructor(
    private router: Router,
    private informationsService: InformationsService,
  ) { }
  menu_items = [];

  ngOnInit() {
    this.informationsService.getDados().subscribe(data => {

      this.menu_items = data.departamentos

    });
  }

  openMenu() {
    this.showMenu = !this.showMenu

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
    this.openMenu();

    
    if(this.router.url === '/departamento') {
      location.reload();
    }
  }

}
