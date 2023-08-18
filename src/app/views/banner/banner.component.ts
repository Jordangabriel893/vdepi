import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, OnDestroy {
  loading = true;
  banners;
  sub: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular
  ) {}

  ngOnInit() {
    this.sub.push(
      this.restangular
        .one('cms/banner')
        .get()
        .subscribe((dados) => {
          this.banners = dados.data;
          this.loading = false;
        })
    );
  }
  edit(id) {
    this.router.navigate(['/edit-banner', id], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
