import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Model from '../../views/_models/model';
import { AuthenticationService } from '../../_services/index';
import { Router } from '@angular/router';
import { GroupByPipe } from 'ngx-pipes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [GroupByPipe]
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  //Header Variables
  user: Model.User;
  disabled = false;
  status: { isopen: boolean } = { isopen: false };
  alertaResumo = [];
  totalAlerta = 0;

  //Full-Layout Variables
  isMonitorView: boolean;
  markers: Model.MarkerMap[];
  countFilter: number;

  //AsideBar Variables
  groupMarkers: any[];
  alerts: any[] = [];

  monitorViewEventSub: Subscription;
  refreshDataEventSub: Subscription;
  markersSub: Subscription;
  countFilterEventSub: Subscription;
  //date_view = this.getDateViewAlert();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.isMonitorView = false;
  }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
  }

  ngOnDestroy() {

  }


  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
