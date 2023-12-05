import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GroupByPipe } from 'ngx-pipes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [GroupByPipe]
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
