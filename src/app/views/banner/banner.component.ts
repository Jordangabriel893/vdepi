import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from 'app/_services';
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
  userIsAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.userIsAdmin = this.auth.userIsAdmin();

    this.getBanners();
  }

  getBanners() {
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

  remover(id) {
    this.confirmationService
      .create('Atenção', 'Deseja realmente remover o banner?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.restangular
            .one('cms/banner', id)
            .remove()
            .subscribe(
              (resp) => {
                this.notifierService.notify('success', 'Banner Removido!');
                this.getBanners();
              },
              () => {
                this.notifierService.notify('error', 'Erro ao remover banner!');
              }
            );
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
