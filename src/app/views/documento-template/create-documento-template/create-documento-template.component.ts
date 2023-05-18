import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmailEditorComponent } from "angular-email-editor";
import { NotifierService } from "angular-notifier";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Restangular } from "ngx-restangular";

@Component({
  selector: "app-create-documento-template",
  templateUrl: "./create-documento-template.component.html",
  styleUrls: ["./create-documento-template.component.scss"],
})
export class CreateDocumentoTemplateComponent implements OnInit {
  salvar = false;
  template;
  formulario;
  options = {
    displayMode: "web",
    devices: ["desktop"],
    features: {
      textEditor: {
        tables: true,
      },
    },
  };
  tools = {
    button: {
      enabled: false,
    },
    form: {
      enabled: false,
    },
    menu: {
      enabled: false,
    },
    html: {
      enabled: false,
    },
  };
  openPopup: boolean = true;
  modalRef: BsModalRef;
  tiposDocumentoLote: [];

  constructor(
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private router: Router,
    private modalService: BsModalService,
    private restangular: Restangular
  ) {
    this.formulario = this.formBuilder.group({
      titulo: [null, Validators.required],
      tipoDocumentoLoteId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.restangular
      .all("TipoDocumentoLote")
      .get("")
      .subscribe((resp) => {
        this.tiposDocumentoLote = resp.data;
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  }

  editorUpdated(data) {
    this.template = {
      designJson: JSON.stringify(data.design),
      codigoHtml: data.html,
    };
  }

  save() {
    this.salvar = true;

    if (!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      });
      this.notifierService.notify(
        "error",
        "Preencha todos os campos obrigatórios"
      );
      this.salvar = false;
      return false;
    }

    if (!this.template) {
      this.notifierService.notify(
        "error",
        "Template vazio, adicione mais elementos"
      );
      this.salvar = false;
      return false;
    }

    const template = {
      designJson: this.template.designJson,
      html: this.template.codigoHtml,
      titulo: this.formulario.value.titulo,
      tipoDocumentoLoteId: this.formulario.value.tipoDocumentoLoteId,
    };

    this.restangular
      .all("DocumentoLoteTemplate")
      .post(template)
      .subscribe(
        (a) => {
          this.notifierService.notify("success", "Template criado com sucesso");
          this.salvar = false;
          this.router.navigate(["/documentotemplate"]);
        },
        () => {
          this.salvar = false;
          this.notifierService.notify("error", "Erro ao criar o template!");
        }
      );

    this.modalRef.hide();
  }

  verificaValidTouched(campo) {
    this.formulario.controls[campo].valueChanges.subscribe((val) => {
      if (String(val) === "NaN") {
        this.formulario.controls[campo].setValue(null);
      }
    });
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  aplicaCssErro(campo) {
    return { "has-error": this.verificaValidTouched(campo) };
  }
}
