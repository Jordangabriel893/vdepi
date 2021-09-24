import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthorizationService {
  constructor(private auth: AuthenticationService) { }

  hasSourceAccess(source: string): boolean {
    // const user = this.auth.getUser();
    // if (user && user.acessos) {
    //   const acessos = user.acessos;

    //   return acessos.some(x => x.name_acesso == source)
    // } else {
    //   return false;
    // }
    return true;
  }
}
