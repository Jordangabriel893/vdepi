import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-documento-template',
  templateUrl: './documento-template.component.html',
  styleUrls: ['./documento-template.component.scss']
})
export class DocumentoTemplateComponent implements OnInit {
  templateDocumentos = []
  loading = true;
  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.restangular.one('documentoLoteTemplate').get().subscribe((response) => {
     this.templateDocumentos = response.data
     this.loading = false;
    },
    () => this.loading = false)
   }
  ngOnInit() {
  }
  edit(id) {
    this.router.navigate(['/edit-documentotemplate/', id], { relativeTo: this.route });
  }
}
