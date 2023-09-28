import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthorizationService } from '../_services/authorization.service';

@Injectable()
export class SourceGuard implements CanActivate {
  constructor(public auth: AuthorizationService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const source = route.data.source;
    if (!this.auth.hasSourceAccess(source)) {
      // this.router.navigate(['access-denied']);
      // return false;
    }
    return true;
  }
}
