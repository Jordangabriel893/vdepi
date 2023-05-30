import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as Model from "../../views/_models/model";
import { Restangular } from "ngx-restangular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-search-leilao",
  templateUrl: "./search-leilao.component.html",
  styleUrls: ["./search-leilao.component.scss"],
})
export class SearchLeilaoComponent implements OnInit, OnDestroy {
  @Output() emitLeilao = new EventEmitter();
  formulario: FormGroup;
  leiloes: Model.Leilao[];
  loading = true;
  selectLeilao;
  sub: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      leilao: [null],
    });

    this.sub.push(
      this.restangular
        .all("admin")
        .one("leilao")
        .get()
        .subscribe(
          (response) => {
            this.selectLeilao = response.data;
            this.leiloes = response.data;
            //   this.leiloes.sort(function(a,b) {
            //     return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
            // })
            this.loading = false;
          },
          () => (this.loading = false)
        )
    );
  }
  emitirLeilao() {
    this.emitLeilao.emit(this.formulario.value.leilao);
  }
  ngOnDestroy(): void {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
