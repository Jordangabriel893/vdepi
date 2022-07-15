import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit, OnDestroy {
  contas
  loading = true;
  sub: Subscription[] = [];
  constructor(
    private restangular: Restangular,
    private router: Router,
    private route: ActivatedRoute,
  ) {
   this.sub.push(
     this.restangular.one("conta").get().subscribe((response) => {
     this.contas = response.data
     this.loading = false;
    },
    () => this.loading = false)
   )
   }

  ngOnInit() {
  }
  edit(id) {

    this.router.navigate(['/update-conta', id], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
