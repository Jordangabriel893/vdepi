import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import * as _ from 'lodash';
import { Restangular } from 'ngx-restangular';
import * as fileSaver from 'file-saver';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';

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
  loading = false;
  idLote;
  arquivo: any;
  formData = new FormData();
  fileError: any;
  fileLoading = false;
  cardImageBase64: any;
  isImageSaved: boolean;
  formulario: any;
  numeroAnexo: any;

  queryField = new FormControl();
  lotesFiltrados: any;
  dataLote: any;
  exportando = false;

  modalRef: BsModalRef;
  leiloes;
  sub: Subscription[] = [];
  allChecked: boolean = false;
  lotesSelecionados = [];
  optionModal;
  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
  ) {
    this.id = this.route.snapshot.params['id']
    this.getLotes();
    this.sub.push(this.restangular.one('leilao', this.id).get().subscribe((response) => {
      this.leilao = response.data
    })
    )
    this.formulario = this.formBuilder.group({
      leilao: [null]
    })
    this.sub.push(this.restangular.all("admin").one("leilao").get().subscribe((response) => {
      this.leiloes = response.data;
      this.loading = false;
    },
      () => this.loading = false)
    )
  }

  ngOnInit() {

  }

  getLotes() {
    this.loading = true;
    this.lotes = [];
    this.sub.push(this.restangular.one("lote", '').get({ leilaoId: this.id }).subscribe(
      (lotes) => {
        this.loading = false;
        const lote = lotes.data
        this.dataLote = lote
        this.lotes = lote;
        this.lotes = this.lotes.map(lote => {
          lote = {
            ...lote,
            checked: false
          }
          return lote
        })
        this.filtroLotes = lote
        this.numeroLote = lote.map(x => x.numeroLote)
        this.descricao = lote.map(x => x.descricao)
      },
      () => this.loading = false
    )
    )
  }

  create() {
    this.router.navigate(['/create-lotes', this.id], { relativeTo: this.route });
  }

  edit(id) {
    this.router.navigate(['/update-lotes', id], { relativeTo: this.route });
  }

  setLote(item) {
    this.queryField.patchValue('')
    this.idLote = item
    const listaFiltradaPorID = this.filtroLotes.filter(x => x.numeroLote == item)
    this.lotes = listaFiltradaPorID
    this.descricaoTitle = listaFiltradaPorID[0].descricao
  }

  setDescricao(item) {
    this.queryField.patchValue('')
    this.idLote = ''
    this.descricaoTitle = item
    const listaFiltradaPorID = this.filtroLotes.filter(x => x.descricao == item)
    this.lotes = listaFiltradaPorID
  }

  deleteLote(loteId: number) {
    this.confirmationService.create('Atenção', 'Deseja realmente excluir o lote?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.restangular.one('lote', loteId).remove()
            .subscribe((resp) => {
              this.notifierService.notify('success', 'Lote excluido!');
            },
              () => {
                this.notifierService.notify('error', 'Erro ao exclir o Lote!');
              });
        }
      })
  }

  getAnexo() {
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
      let formData: FormData = new FormData();
      formData.append('file', fileInput.target.files[0])

      this.sub.push(this.restangular.all('lote').customPOST(formData, 'ImportacaoPlanilha', { leilaoId: this.id }, { 'content-type': undefined }).subscribe(a => {
        this.notifierService.notify('success', 'Upload de planilha com sucesso');
        this.fileLoading = false
        this.getLotes();
      },
        error => {
          fileInput.target.value = "";
          this.fileLoading = false;

          const errors = error.data.Errors;

          if (errors) {
            for (var key in errors) {
              this.notifierService.notify('error', errors[key]);
            }
          }
          else {
            this.notifierService.notify('error', 'Upload de planilha erro!');
          }
          this.getLotes();
        })
      )
    }

  }
  selectAllLotes() {
    this.lotesSelecionados = [];
    this.lotes = this.lotes.map(lote => {
      lote = {
        ...lote,
        checked: this.allChecked
      }
      return lote
    })
    if (this.allChecked) {
      this.lotesSelecionados = this.lotes.map(lote => lote.loteId);
    }
  }
  selectLote(lote) {
    if (!lote.checked) {
      this.lotesSelecionados.push(lote.loteId)
    }
    if (lote.checked) {
      this.lotesSelecionados = this.lotesSelecionados.filter(item => item != lote.loteId);
    }
  }
  onSearch() {
    if (this.queryField.value) {
      this.lotes = this.dataLote
      this.idLote = null;
      this.descricaoTitle = '';
      let value = this.queryField.value.replace('.', '').replace('-', '').replace('/', '').toLowerCase();
      this.lotesFiltrados = this.lotes.filter(x => x.numeroLote == value || x.descricao.toLowerCase().includes(value));

    }
  }

  exportAsExcel() {
    this.exportando = true;
    this.restangular.one(`leilao/${this.id}/exportarlotes`,)
      .withHttpConfig({ responseType: 'blob' })
      .get()
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/xlsx' });
        fileSaver.saveAs(blob, `Lotes.xlsx`);
        this.exportando = false;
      }, (error) => {
        this.notifierService.notify('error', 'Não foi possivel exportar lotes!');
        this.exportando = false;
      })
  }
  copyTransferLote() {
    const form = {
      lotes: this.lotesSelecionados,
      leilaoId: this.formulario.value.leilao.id
    }  
    if (this.optionModal == 'transferir') {
      this.sub.push(this.restangular.all('/Lote/Mover').post(form).subscribe(a => {
        this.notifierService.notify('success', 'Lote transferido com sucesso ');
        this.getLotes()
      },
        error => {
          this.notifierService.notify('error', 'Erro ao transferir o Lote!');
        })
      )
    }
    if (this.optionModal == 'copiar') {
      this.sub.push(this.restangular.all('/Lote/Copiar').post(form).subscribe(a => {
        this.notifierService.notify('success', 'Lote copiado com sucesso ');
      },
        error => {
          this.notifierService.notify('error', 'Erro ao copiar o Lote!');
        })
      )
    }

  }

  openModal(template: TemplateRef<any>, item?) {
    if (this.lotesSelecionados.length > 0) {
      this.optionModal = item;
      this.modalRef = this.modalService.show(template);
    } else {
      this.notifierService.notify('error', 'Selecione pelo menos 1 lote');
    }

  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }

}

