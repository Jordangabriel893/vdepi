import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios:any
  loading = true;

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.restangular.one("usuario").get().subscribe((response) => {
      this.usuarios = response.data;
      this.loading = false;
    },
    () => this.loading = false);
  }
  edit(id) {
    this.router.navigate(['/update-usuarios', id], { relativeTo: this.route });
  }

}
