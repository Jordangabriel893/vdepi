import { HttpResponse, HttpClient } from '@angular/common/http';
import * as fileSaver from 'file-saver';
import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";
import {  ActivatedRoute,  Router } from '@angular/router';

// install Swiper modules
SwiperCore.use([Navigation]);



@Component({
  selector: 'app-vistoria',
  templateUrl: './vistoria.component.html',
  styleUrls: ['./vistoria.component.scss']
})
export class VistoriaComponent implements OnInit {
  vistoria
  leiloes
  loading = true;
  constructor(
    private restangular: Restangular,
    private http: HttpClient,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.restangular.one("admin/leilao/vistoria").get().subscribe((response) => {
     this.leiloes = response.data
     this.loading = false;
    },
    () => this.loading = false)

   }

  ngOnInit() {
  }

  verLotes(id){
    this.router.navigate(['vistoria-lotes', id]);
  }
}
