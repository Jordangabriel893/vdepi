import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss']
})
export class TipoDocumentoComponent implements OnInit {
  tipoDocumentos = []
  loading = true;
  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.restangular.one('tipoDocumentoLote').get().subscribe((response) => {
     this.tipoDocumentos = response.data
     this.loading = false;
    },
    () => this.loading = false)
   }
  ngOnInit() {
  }
  edit(id) {
    this.router.navigate(['/edit-tipodocumeto/', id], { relativeTo: this.route });
  }
}
