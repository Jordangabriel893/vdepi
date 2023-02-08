import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-pagina-estatica',
  templateUrl: './pagina-estatica.component.html',
  styleUrls: ['./pagina-estatica.component.scss']
})
export class PaginaEstaticaComponent implements OnInit {
  paginas:any;
  paginasFiltrados;
  loading = true;
  queryField = new FormControl();

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private notifierService: NotifierService,
    ) { }

  ngOnInit() {
    this.getPaginas()
    this.queryField.valueChanges.subscribe(() => {
      this.onSearch();
    })
  }
  getPaginas(){
    this.restangular.one("api/paginaEstatica").get().subscribe((response) => {
      this.paginas = response.data;
      this.paginasFiltrados = response.data;
      this.loading = false;
    },
    () => this.loading = false);
  }
  edit(id) {
    this.router.navigate(['/update-paginaestatica', id], { relativeTo: this.route });
  }

  deletePaginaEstatica(paginaEstaticaId: number) {
    this.confirmationService.create('Atenção', 'Deseja realmente excluir esta página?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.restangular.one('api/PaginaEstatica', paginaEstaticaId).remove()
            .subscribe((resp) => {
              this.notifierService.notify('success', 'Página excluida!');
              this.getPaginas();
            },
              () => {
                this.notifierService.notify('error', 'Erro ao excluir a Página!');
              });
        }
      })
  }
  onSearch() {
    if(this.queryField.value.length > 3) {
      let value = this.queryField.value.toLowerCase();
      this.paginasFiltrados =
        this.paginas.filter(x => x.titulo.toLowerCase().includes(value));
    }
    else {
      this.paginasFiltrados = this.paginas;
    }
  }

}
