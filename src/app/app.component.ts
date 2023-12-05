import { Component } from '@angular/core';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(){}

  public confirmationOptions = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: 'Sim',
    declineText: 'Não'
  }
}
