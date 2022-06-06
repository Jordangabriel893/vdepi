import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent  {

  constructor(private authService: AuthenticationService) {

   }



}
