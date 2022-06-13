import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios:any;
  usuariosFiltrados;
  loading = true;
  queryField = new FormControl();

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.restangular.one("usuario").get().subscribe((response) => {
      this.usuarios = response.data;
      this.usuariosFiltrados = response.data;
      this.loading = false;
    },
    () => this.loading = false);
  }
  edit(id) {
    this.router.navigate(['/update-usuarios', id], { relativeTo: this.route });
  }

  onSearch() {
    if(this.queryField.value) {
      let value = this.queryField.value.replace('.', '').replace('-', '').replace('/', '').toLowerCase();

      this.usuariosFiltrados =
        this.usuarios.filter(x => x.nomeCompleto.toLowerCase().includes(value) ||
                                  (x.numeroDocumento && x.numeroDocumento.replace('.', '').replace('-', '').replace('/', '').includes(value)) ||
                                  x.email.toLowerCase().includes(value));
    }
    else {
      this.usuariosFiltrados = this.usuarios;
    }
  }

}
