import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {
  formulario: FormGroup
  loading = true;
  selectLeilao;
  contatos;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      leilao:[null],


    })
   }

  ngOnInit() {
    this.restangular.one("marketing/Contato", '').get({PageSize:100}).subscribe((response) => {
     this.contatos = response.data

      this.loading = false;
    },
    () => this.loading = false);
  }
  edit(id) {
    this.router.navigate(['/edit-contatos', id], { relativeTo: this.route });
  }
}
