import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, ResolveEmit } from "@jaspero/ng-confirmations";
import { NotifierService } from "angular-notifier";
import { Restangular } from "ngx-restangular";
import { Subscription } from "rxjs";
import { environment } from "environments/environment";
import * as XLSX from "xlsx";
import { PdfService } from "app/_services/pdf.service";
import { CurrencyFormatPipe } from "app/directives/currency-format.pipe";
import { NgIf } from "@angular/common";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-fatura",
  templateUrl: "./fatura.component.html",
  styleUrls: ["./fatura.component.scss"],
})
export class FaturaComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  faturas;
  loading;
  sub: Subscription[] = [];
  nomeLeilao: any = "Leilões";
  leilaoId;
  siteUrl = environment.siteUrl;
  enviando = false;
  faturasEnviar = [];
  todasFaturas = false;
  queryField = new FormControl();
  faturasFiltradas = [];
  showItens;
  constructor(
    private restangular: Restangular,
    private notifierService: NotifierService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) {}

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
        .create("Atenção", "Deseja realmente cancelar esta fatura?")
        .subscribe((ans: ResolveEmit) => {
          if (ans.resolved) {
            this.sub.push(
              this.restangular
                .all(`fatura/cancelar/${faturaId}`)
                .post()
                .subscribe(
                  () => {
                    this.notifierService.notify(
                      "success",
                      "Fatura Cancelada com sucesso"
                    );
                    this.setLeilao(this.leilaoId);
                  },
                  () => {
                    this.notifierService.notify(
                      "error",
                      "Erro ao cancelar fatura"
                    );
                  }
                )
            );
          }
        })
    );
  }

  bloquearUsuario(usuarioId, faturaId) {
    this.sub.push(
      this.confirmationService
        .create("Atenção", "Deseja realmente bloquear o usuário?")
        .subscribe((ans: ResolveEmit) => {
          if (ans.resolved) {

            const dataInicio = new Date().toISOString();
            const dataFim = new Date;
            dataFim.setDate(dataFim.getDate() + 30);

            const body = {
              usuarioId,
              motivo: "Bloqueado po inadimplência",
              dataInicio,
              dataFim: dataFim.toISOString()
            }

            this.sub.push(
              this.restangular
                .all(`usuario/bloquear`)
                .post(body)
                .pipe(
                  switchMap(() => this.restangular.all('fatura/cancelar/' + faturaId).post())
                )
                .subscribe(
                  () => {
                    this.notifierService.notify(
                      "success",
                      "Usuario bloqueado com sucesso"
                    );
                    this.setLeilao(this.leilaoId);
                  },
                  (e) => {
                    this.notifierService.notify(
                      "error",
                      e.data.Message
                    );
                  }
                )
            );
          }
        })
    );
  }

  sendFatura() {
    if (this.faturasEnviar.length === 0) {
      this.notifierService.notify(
        "error",
        "Selecione alguma fatura para enviar"
      );
      return false;
    }

    this.enviando = true;

    const body = {
      faturaIds: this.faturasEnviar,
    };

    this.restangular
      .all("fatura/notificar")
      .post(body)
      .subscribe(
        () => {
          this.notifierService.notify("success", "Faturas Enviadas");
          this.setLeilao(this.leilaoId);
          this.enviando = false;
        },
        () => {
          this.notifierService.notify("error", "Erro ao enviar faturas");
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
  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.faturasFiltradas);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Faturas");

    /* save to file */
    XLSX.writeFile(wb, "Faturas.xlsx");
  }

  onSearch() {
    let value = this.queryField.value.toLowerCase();

    this.faturasFiltradas = this.faturas.filter(
      (x) =>
        x.nomeArrematante.toLowerCase().includes(value) ||
        x.cpfArrematante.includes(value) ||
        x.cpfArrematante
          .replace(".", "")
          .replace("-", "")
          .replace("/", "")
          .includes(value) ||
        x.itens.some((i) => i.descricao.toLowerCase().includes(value))
    );
  }

  filtrarFaturas() {
    const statusControl = this.formulario.value.statusControl;
    if (statusControl == "0") {
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

  ngOnDestroy(): void {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
