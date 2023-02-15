import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as Model from '../_models/model'
import * as fileSaver from 'file-saver'
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})
export class ListaContatosComponent implements OnInit {
  formulario: FormGroup
  loading = true;
  selectLeilao;
  listas;
  leiloes: Model.Leilao[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
  ) {
    this.formulario = this.formBuilder.group({
      leilao: [null]
    })
  }

  ngOnInit() {
    this.carregarListas();
  }

  carregarListas() {
    this.restangular.one('marketing/listacontato').get().subscribe(
      dados => {
        this.listas = dados.data
        this.loading = false;
      },
      () => this.loading = false
    )
  }

  edit(id) {
    this.router.navigate(['/edit-listacontatos', id], { relativeTo: this.route });
  }

  downloadContatos(id) {
    this.restangular.one('marketing/listacontato/download/' + id)
      .withHttpConfig({ responseType: 'blob' })
      .get()
      .subscribe(dados => {
        var file = new Blob([dados], { type: 'text/plain' });
        fileSaver.saveAs(file, `Contatos.txt`);
      }, error => {
        this.notifierService.notify('error', 'Não foi possivel fazer download da lista de contatos!');
      });
  }

  desativar(id) {
    this.restangular.all('marketing/ListaContato/Desativar').customPUT( '', id) .subscribe(a => {
      this.notifierService.notify('success', 'Lista de contatos excluida com sucesso');
      this.carregarListas();
    },
    () => {
      this.notifierService.notify('error', 'Erro ao excluir lista de contatos!');
    });
  }

}
