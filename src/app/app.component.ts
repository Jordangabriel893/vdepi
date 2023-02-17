import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet><notifier-container></notifier-container><jaspero-confirmations [defaultSettings]="confirmationOptions"></jaspero-confirmations>'
})
export class AppComponent
{
  constructor() {
    setTheme('bs4'); // or 'bs4'
  }

  public confirmationOptions = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: "Sim",
    declineText: "Não"
  }
}
