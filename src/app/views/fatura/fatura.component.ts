import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BsLocaleService } from 'ngx-bootstrap';

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.scss'],
})
export class FaturaComponent implements OnInit, OnDestroy {
  @ViewChild('inputComprovante') inputComprovante: ElementRef;
  formulario: FormGroup;
  faturas;
  faturaId;
  codigoFatura;
  loading;
  sub: Subscription[] = [];
  nomeLeilao: any = 'Leilões';
  leilaoId;
  siteUrl = environment.siteUrl;
  enviando = false;
  faturasEnviar = [];
  todasFaturas = false;
  queryField = new FormControl();
  faturasFiltradas = [];
  showItens;
  modalRef: BsModalRef;
  formasPagamento = [];
  formComprovante: FormGroup;
  comprovanteError;
  comprovante;
  tamComprovante;
  constructor(
    private restangular: Restangular,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private localeService: BsLocaleService
  ) {
    localeService.use('pt-br');

    this.formComprovante = this.formBuilder.group({
      formaPagamentoId: [null, Validators.required],
      dataPagamento: [null, Validators.required],
      comprovante: this.formBuilder.group(
        {
          arquivoId: [0],
          nome: [null],
          base64: [null, Validators.required],
          tipo: [null],
          tamanho: [0],
        },
        Validators.required
      ),
    });
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      selectAll: [false],
      enviarFaturas: this.formBuilder.array([]),
      statusControl: [null],
    });
  }

  setLeilao(idLeilao) {
    this.leilaoId = idLeilao;
    this.loading = true;
    this.sub.push(
      this.restangular
        .one(`fatura?leilaoId=${idLeilao.id}`)
        .get()
        .subscribe((dados) => {
          this.faturas = dados.data;
          this.faturasFiltradas = dados.data;
          this.nomeLeilao = idLeilao.nome;
          this.loading = false;
          this.formulario = this.formBuilder.group({
            enviarFaturas: this.formBuilder.array(
              dados.data
                ? dados.data.map((x) =>
                    this.formBuilder.group({
                      faturaId: x.faturaId,
                      valor: false,
                    })
                  )
                : [],
              Validators.required
            ),
            selectAll: [false],
            statusControl: [0],
          });
        })
    );
  }

  cancelarFatura(faturaId) {
    this.sub.push(
      this.confirmationService
        .create('Atenção', 'Deseja realmente cancelar esta fatura?')
        .subscribe((ans: ResolveEmit) => {
          if (ans.resolved) {
            this.sub.push(
              this.restangular
                .all(`fatura/${faturaId}/cancelar`)
                .post()
                .subscribe(
                  () => {
                    this.notifierService.notify(
                      'success',
                      'Fatura Cancelada com sucesso'
                    );
                    this.setLeilao(this.leilaoId);
                  },
                  () => {
                    this.notifierService.notify(
                      'error',
                      'Erro ao cancelar fatura'
                    );
                  }
                )
            );
          }
        })
    );
  }

  bloquearUsuario(usuarioId, codigoFatura) {
    this.sub.push(
      this.confirmationService
        .create('Atenção', 'Deseja realmente bloquear o usuário?')
        .subscribe((ans: ResolveEmit) => {
          if (ans.resolved) {
            const body = {
              usuarioId,
              motivo: 'Bloqueado por inadimplência - Fatura ' + codigoFatura,
            };

            this.sub.push(
              this.restangular
                .all(`usuario/bloquear`)
                .post(body)
                .subscribe(
                  () => {
                    this.notifierService.notify(
                      'success',
                      'Usuario bloqueado com sucesso'
                    );
                    this.setLeilao(this.leilaoId);
                  },
                  (e) => {
                    this.notifierService.notify('error', e.data.Message);
                  }
                )
            );
          }
        })
    );
  }

  openModal(template: TemplateRef<any>, faturaId) {
    this.sub.push(
      this.restangular
        .one('/Fatura/FormasPagamento')
        .get()
        .subscribe((dados) => {
          this.formasPagamento = dados.data;
        })
    );

    this.faturaId = faturaId;
    this.codigoFatura = this.faturas.find((x) => x.faturaId == faturaId).codigo;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  marcarComoPaga() {
    if (this.formComprovante.valid) {
      this.restangular
        .all(`fatura/${this.faturaId}/EnviarComprovante`)
        .post(this.formComprovante.getRawValue())
        .subscribe(
          () => {
            this.notifierService.notify(
              'success',
              'Pagamento da Fatura inserida com sucesso'
            );
            this.modalRef.hide();
            this.setLeilao(this.leilaoId);
          },
          (e) => {
            this.notifierService.notify(
              'error',
              'Houver um erro ao inserir o pagamento da fatura'
            );
          }
        );
    }
  }

  comprovanteChangeEvent(guiaInput: FileList) {
    this.comprovante = '';
    this.comprovanteError = '';

    const fileToUpload = guiaInput.item(0) as File;
    if (fileToUpload) {
      const max_size = 5242880;

      if (fileToUpload.size > max_size) {
        this.comprovanteError = 'O tamanho máximo permitido é 5Mb';
        return false;
      }

      const reader = new FileReader();
      reader.readAsDataURL(fileToUpload);
      reader.onload = () => {
        const comprovantebase64 = reader.result;
        const foto = this.formComprovante.get('comprovante') as FormGroup;
        foto.get('base64').setValue(comprovantebase64);
        foto.get('nome').setValue(fileToUpload.name);
        foto.get('tamanho').setValue(fileToUpload.size);
        foto.get('tipo').setValue(fileToUpload.type);
        this.comprovante = fileToUpload.name;
        this.tamComprovante = this.formatSize(fileToUpload.size);
      };
    }
  }

  inputComprovanteClick() {
    this.inputComprovante.nativeElement.click();
  }

  sendFatura() {
    if (this.faturasEnviar.length === 0) {
      this.notifierService.notify(
        'error',
        'Selecione alguma fatura para enviar'
      );
      return false;
    }

    this.enviando = true;

    const body = {
      faturaIds: this.faturasEnviar,
    };

    this.restangular
      .all('fatura/EnviarPorEmail')
      .post(body)
      .subscribe(
        () => {
          this.notifierService.notify('success', 'Faturas Enviadas');
          this.setLeilao(this.leilaoId);
          this.enviando = false;
        },
        () => {
          this.notifierService.notify('error', 'Erro ao enviar faturas');
          this.enviando = false;
        }
      );
  }

  selectAllFaturas() {
    this.todasFaturas = !this.todasFaturas;
    this.faturasEnviar = [];
    if (this.todasFaturas) {
      this.faturasEnviar = this.faturas.map((x) => x.faturaId);
    }
  }

  selectFatura(faturaId) {
    const idx = this.faturasEnviar.indexOf(faturaId);
    if (idx >= 0) {
      this.faturasEnviar = this.faturasEnviar.splice(idx, 1);
    } else {
      this.faturasEnviar.push(faturaId);
    }
  }

  onValueChange(event, campo) {
    this.formComprovante.get(campo).markAsTouched();
    this.formComprovante.get(campo).setValue(event);
  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.faturasFiltradas);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Faturas');

    /* save to file */
    XLSX.writeFile(wb, 'Faturas.xlsx');
  }

  onSearch() {
    const value = this.queryField.value.toLowerCase();

    this.faturasFiltradas = this.faturas.filter(
      (x) =>
        x.nomeArrematante.toLowerCase().includes(value) ||
        x.cpfArrematante.includes(value) ||
        x.cpfArrematante
          .replace('.', '')
          .replace('-', '')
          .replace('/', '')
          .includes(value) ||
        x.itens.some((i) => i.descricao.toLowerCase().includes(value))
    );
  }

  filtrarFaturas() {
    const statusControl = this.formulario.value.statusControl;
    if (statusControl == '0') {
      this.faturasFiltradas = this.faturas;
      return;
    }

    this.faturasFiltradas = this.faturasFiltradas.filter(
      (fatura) => fatura.status == statusControl
    );
  }

  showItensFatura(faturaId) {
    this.showItens = faturaId;
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) };
  }

  verificaValidTouched(campo) {
    return (
      !this.formComprovante.get(campo).valid &&
      this.formComprovante.get(campo).touched
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach((s) => s.unsubscribe());
  }

  formatSize(_size: number) {
    let fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let i = 0;
    while (_size > 900) {
      _size /= 1024;
      i++;
    }
    var exactSize = Math.round(_size * 100) / 100 + ' ' + fSExt[i];
    return exactSize;
  }
}
