import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthorizationService {
  constructor(private auth: AuthenticationService) { }

  hasSourceAccess(source: string): boolean {
// return true
    const user = this.auth.getUser();
    if (user && user.permission) {
      const permissoes = user.permission;
      return permissoes.some((x:any) => x.codigo == source)
    } else {
      return false;
    }
  }

  hasItem(item){
    // return true
    const user = this.auth.getUser();
    if (user && user.permission) {
      const permissoes = user.permission;
      return permissoes.some((x:any) => x.grupo == item.grupo)
    } else {
      return false;
    }

  }
  hasPermissions(){
    // return true

    const user = this.auth.getUser();
    if (user && user.permission) {
      return true

    }else{
      return false
    }

  }
}
