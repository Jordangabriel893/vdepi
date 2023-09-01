import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { NotifierService } from 'angular-notifier';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historico-lances',
  templateUrl: './historico-lances.component.html',
  styleUrls: ['./historico-lances.component.scss']
})
export class HistoricoLancesComponent implements OnInit {
  leiloes
  idLeilao
  leilaoNome = 'Leilões'
  idLote: any = ''
  lotes
  lances
  loading = false;
  ehLeilaoEncerrado = false
  lanceVencedorAtual;
  sub: Subscription[] = [];
  lanceId;
  modalRef: BsModalRef;
  formulario: FormGroup;
  leilaoId;
  loteId;
  numeroLote;
  constructor(
    private restangular: Restangular,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {
    this.formulario =  this.formBuilder.group({
      motivo: [null, [Validators.required, Validators.minLength(3)]],
    })
    this.sub.push( this.restangular.one('admin/leilao').get({PageSize: 100}).subscribe((response) => {
      this.leiloes = response.data
      //const id = this.leiloes[0].id
      //this.setLeilao(id , this.leiloes[0].nome);
      //this.isStatusEncerrado(id)
    })
    )
   }

  ngOnInit() {
  }

  setLeilao(id, nome) {
    this.lotes = []
    this.lances = []
    this.idLote = null;
    this.leilaoNome = nome
    this.leilaoId = id;
    this.isStatusEncerrado(id)
    this.sub.push(  this.restangular.one('lote/numeros', '').get({ leilaoId: id }).subscribe(
      (lotes) => {
        this.loading = false;
        this.lotes = lotes.data
      }

    )
    )
  }

  setLotes(id, numeroLote) {
    this.loading = true;
    this.lances = [];
    this.idLote = numeroLote
    this.loteId = id;
    this.numeroLote = numeroLote;
    this.sub.push( this.restangular.one(`lote/${id}/lances`).get({ PageSize: 500 }).subscribe((response) => {
      this.lances = response.data
      this.loading = false;
    },
    () => this.loading = false)
    )
  }

  isStatusEncerrado(id) {
    const leilao = this.leiloes.filter( x => x.id == id)
    this.ehLeilaoEncerrado =  leilao[0].status.toString().toUpperCase() == 'ENCERRADO'
  }


  gravarLanceVencedor(lanceId: number) {
    this.sub.push( this.restangular.all(`lote/${lanceId}/LanceVencedor`).post({lanceId: lanceId }).subscribe(a => {
      this.notifierService.notify('success', 'Novo Lance Vencedor Cadastrado com Sucesso');
    },
      error => {
        this.notifierService.notify('error', 'Erro ao Gravar Novo Lance Vencedor ');
      })
    )
  }
  openModal(template: TemplateRef<any>, lanceId) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg'});
    this.lanceId = lanceId

  }
  cancelarLance() {
    const body = {
      lanceid: this.lanceId,
      motivo: this.formulario.value.motivo,
      statusId: 2
    }
    if (this.formulario.valid) {
      this.sub.push(
        this.restangular.all(`lote/${this.lanceId}/CancelarLance`).post(body).subscribe(() => {
          this.notifierService.notify('success', 'Lance cancelado com sucesso');
          this.setLeilao(this.leilaoId, this.leilaoNome);
          this.setLotes(this.loteId, this.numeroLote)
          // this.setLeilao(this.leilaoId);
        },
        () => {
          this.notifierService.notify('error', 'Erro ao cancelar lance');
        })
      )
    }


  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
