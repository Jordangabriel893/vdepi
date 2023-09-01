import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent  {

  constructor(
    private route: ActivatedRoute
    ) {
    const reload = this.route.snapshot.queryParams['r'];

    if (reload) {
      window.location.href = '/#/home';
      window.location.reload();
    }
   }



}
