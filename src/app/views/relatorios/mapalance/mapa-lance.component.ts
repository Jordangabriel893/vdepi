import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as moment from 'moment'
import 'moment/locale/pt-br';
import { NgMapApiLoader} from '@ngui/map';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, TooltipDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GroupByPipe } from 'ngx-pipes';

import * as MarkerCluster from '@google/markerclusterer'

@Component({
  selector: 'app-mapa-lance',
  templateUrl: './mapa-lance.component.html',
  styleUrls: ['./mapa-lance.component.scss'],
  providers: [GroupByPipe, TooltipDirective]
})
export class MapaLanceComponent implements OnInit, OnDestroy {

  //Global Parameters
  loading = false;
  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  filterModal: BsModalRef;

  @ViewChild('templateInfoWindow', { read: TemplateRef }) templateInfoWindow: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

  //***********************
  //  Parameters for MAP
  //***********************
  googleMaps;
  mapObject;
  zoom = 4;
  latLng = {
    lat: -13.257732,
    lng: -47.908433
  };
  selectedMarker: any;
  infoWindow: google.maps.InfoWindow;
  lances;

  points = [];
  heatmap: google.maps.visualization.HeatmapLayer;

  gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]

  markerCluster;
  //***********************
  //  Parameters for Filter
  //***********************
  bsConfig = {
    containerClass: 'theme-blue',
    rangeInputFormat: 'DD [de] MMMM [de] YYYY',
    showWeekNumbers: false,
  };

  clients = [];
  orgaos = [];
  infractions = [];
  authorities = [];
  filtro: FormGroup;
  infoWindowEventSub: Subscription;
  countFilter = 0;
  leiloes;
  leilaoId;
  leilaoNome;

  constructor(
    private notifierService: NotifierService,
    private restangular: Restangular,
    private localeService: BsLocaleService,
    private formBuilder: FormBuilder,
    private mapsApiLoader: NgMapApiLoader,
    private router: Router,
    private bsModalService: BsModalService,
    private http: HttpClient,
    private gp: GroupByPipe) {
    this.localeService.use('pt-br');

    this.mapsApiLoader.api$.subscribe(googleMaps => {
      // use as google.maps
      this.googleMaps = googleMaps;
    });
    this.mapsApiLoader.load();

  }

  ngOnInit() {
    this.filtro = this.formBuilder.group({
      periodo: [],
      orgao: [],
      cliente: [],
      infracao: [],
      autoridade: []
    });
  }

  ngOnDestroy() {
    document.querySelector('body').classList.add('aside-menu-hidden');
  }

  onMapReady($event) {
    this.mapObject = $event;
    this.infoWindow = new google.maps.InfoWindow();
  }

  public toggled($event): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  setLeilao(leilao) {
    this.leilaoId = leilao.id;
    this.leilaoNome = leilao.nome;
    this.refreshLances();
  }

  setCenterOriginalMap() {
    this.mapObject.setCenter(this.latLng);
    this.mapObject.setZoom(this.zoom);
  }

  getLances(): Promise<any> {
    return new Promise((resolve, reject) => {
      const filtro = this.filtro !== undefined ? this.filtro.value : null;
      this.restangular.one(`leilao/${this.leilaoId}/Lances`).get().subscribe(
        (lances) => {
          this.lances = lances.data;
          resolve(lances.data);
        },
        error => {
          reject(error);
        });
    });
  }

  filtrarLances() {
    this.refreshLances();

    const filtro = this.filtro.value;
    this.countFilter = 0;
    if (filtro.periodo != null && filtro.periodo.length > 1) { this.countFilter++; }
    if (filtro.orgao != null && filtro.orgao.length > 0) { this.countFilter++; }
    if (filtro.cliente != null && filtro.cliente.length > 0) { this.countFilter++; }
    if (filtro.infracao != null && filtro.infracao.length > 0) { this.countFilter++; }
    if (filtro.autoridade != null && filtro.autoridade.length > 0) { this.countFilter++; }

    this.filterModal.hide();
  }

  clearFilter() {
    this.filtro.reset();
    this.countFilter = 0;

    this.refreshLances();
  }

  showFilter() {
    this.filterModal = this.bsModalService.show(this.templateModal, { class: 'modal-info modal-lg' });
  }

  refreshLances() {
    this.loading = true;
    this.getLances()
      .then(m => {
        this.points = m.map(lance => {
          return new google.maps.LatLng(lance.latitude, lance.longitude)
        });
        this.loading = false;

        const markers = this.points.map((p: google.maps.LatLng) => new google.maps.Marker({ 'position': p }));
        const mcOptions = {
          gridSize: 70,
          maxZoom: 20,
          imagePath: './assets/img/maps/m'
        };

        if (this.markerCluster != null) {
          this.markerCluster.clearMarkers();
        }

        this.markerCluster = new MarkerCluster(this.mapObject, markers, mcOptions);

        this.setCenterOriginalMap();
      }).catch(error => {
        this.loading = false;
        this.notifierService.notify('error', 'Erro ao buscar dados do mapa')
      });
  }
}



