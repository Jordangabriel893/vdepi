import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  loading = true;
  banners;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
  ) { }

  ngOnInit() {
    this.restangular.one('cms/banner').get().subscribe(
      dados =>{
        this.banners= dados.data
        this.loading = false;
      }
    )
  }
  edit(id) {
    this.router.navigate(['/edit-banner', id], { relativeTo: this.route });
  }

}
