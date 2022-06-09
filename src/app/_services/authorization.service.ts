import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthorizationService {
  constructor(private auth: AuthenticationService) { }

  hasSourceAccess(source: string): boolean {

    const user = this.auth.getUser();
    if (user && user.permission) {
      const permissoes = user.permission;
      return permissoes.some((x:any) => x.codigo == source)
    } else {
      return false;
    }
  }

  hasItem(item){
    const user = this.auth.getUser();
    if (user && user.permission) {
      const permissoes = user.permission;
      return permissoes.some((x:any) => x.grupo == item.grupo)
    } else {
      return false;
    }

  }
  hasPermissions(){
    const user = this.auth.getUser();
    if (user && user.permission) {
      return true

    }else{
      return false
    }

  }
}
