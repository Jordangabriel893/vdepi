import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comitentes',
  templateUrl: './comitentes.component.html',
  styleUrls: ['./comitentes.component.scss']
})
export class ComitentesComponent implements OnInit, OnDestroy {
  comitente
  loading = true;
  sub: Subscription[] = [];
  constructor(
    private restangular: Restangular,
    private router: Router,
    private route: ActivatedRoute,
  ) {
   this.sub.push(
    this.restangular.one("comitente").get().subscribe((response) => {
      this.comitente = response.data
      this.loading = false;
     },
     () => this.loading = false)
   )
   }

  ngOnInit() {
  }
  edit(id) {
    this.router.navigate(['/update-comitente', id], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }

}
