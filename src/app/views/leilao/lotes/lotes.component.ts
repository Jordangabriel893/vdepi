import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as _ from 'lodash';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.scss']
})
export class LotesComponent implements OnInit {
  @ViewChild('inputAnexos') inputAnexos: ElementRef;
  id: any;
  lotes: any;
  filtroLotes;
  leilao;
  descricao;
  descricaoTitle;
  numeroLote;
  loading = true;
  idLote;
  arquivo: any;
  formData = new FormData();
  fileError: any;
  fileLoading = false;
  cardImageBase64: any;
  isImageSaved: boolean;
  formulario: any;
  numeroAnexo: any;

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.id = this.route.snapshot.params['id']
    this.restangular.one("lote", '').get({ leilaoId: this.id, PageSize: 500 }).subscribe(
      (lotes) => {
        this.loading = false;
        const lote = lotes.data
        this.lotes = lote;
        this.filtroLotes = lote
        this.numeroLote = lote.map(x => x.loteId)
        this.descricao = lote.map(x => x.descricao)
      },
      () => this.loading = false
    )
    this.restangular.one('leilao', this.id).get().subscribe((response) => {
      this.leilao = response.data

    });
    // this.restangular.all('admin/leilao').get(this.id).subscribe(dados => {
    //   const arquivoPlanilha = dados.data.anexos.filter(element => element.arquivo.nome.includes('xlsx'))
    //   this.formData.append('file', arquivoPlanilha[0])

    // })


  }

  ngOnInit() {

  }
  create() {
    this.router.navigate(['/create-lotes', this.id], { relativeTo: this.route });
  }
  edit(id) {
    this.router.navigate(['/update-lotes', id], { relativeTo: this.route });
  }
  setLote(item) {
    this.idLote = item
    const listaFiltradaPorID = this.filtroLotes.filter(x => x.loteId == item)
    this.lotes = listaFiltradaPorID
    this.descricaoTitle = listaFiltradaPorID[0].descricao
  }
  setDescricao(item) {
    this.idLote = ''
    this.descricaoTitle = item
    const listaFiltradaPorID = this.filtroLotes.filter(x => x.descricao == item)
    this.lotes = listaFiltradaPorID
  }

  deleteLote(loteId: number) {
    this.restangular.one('lote', loteId).remove()
      .subscribe((resp) => {
        this.notifierService.notify('success', 'Lote excluido!');
      },
        () => {
          this.notifierService.notify('error', 'Erro ao exclir o Lote!');
        });
  }
  // upload(){
  //   var formData = new FormData();
  //   formData.append('file', this.arquivo)
  //   console.log(this.formData)
  //   this.restangular.all('lote').customPOST(formData, 'ImportacaoPlanilha',{ leilaoId: this.id}, { 'content-type': 'multipart/form-data'} ).subscribe(a => {
  //     this.notifierService.notify('success', 'Upload de Banner com sucesso');
  //     // this.router.navigate(['/lotes', this.id]);
  //   },
  //     error => {
  //       this.notifierService.notify('error', 'Upload de Banner erro!');
  //     });
  // }
  getAnexo() {
    // this.numeroAnexo = i
    this.inputAnexos.nativeElement.click()
  }
  fileChangeEvent(fileInput: any) {
    this.fileError = null;
    this.fileLoading = true;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['application/excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

      if (fileInput.target.files[0].size > max_size) {
        this.fileError =
          'O tamanho máximo permitido é ' + max_size / 1000 + 'Mb';
        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.fileError = 'Somente arquivos são permitidos ( xls | xlsx )';
        return false;
      }
      let formData:FormData = new FormData();
      formData.append('file', fileInput.target.files[0])

      this.restangular.all('lote').customPOST(formData, 'ImportacaoPlanilha', { leilaoId: this.id }, { 'content-type': 'multipart/form-data' }).subscribe(a => {
        this.notifierService.notify('success', 'Upload de planilha com sucesso');
        this.fileLoading = false
        location.reload()
        // this.router.navigate(['/lotes', this.id]);

      },
        error => {
          this.notifierService.notify('error', 'Upload de planilha erro!');
          fileInput.target.value = "";
          this.fileLoading = false;

        });
    }

  }
}

