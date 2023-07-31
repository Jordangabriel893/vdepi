import { BsModalService } from "ngx-bootstrap/modal";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { EmailEditorComponent } from "angular-email-editor";
import { NotifierService } from "angular-notifier";
import { BsModalRef } from "ngx-bootstrap";
import { Restangular } from "ngx-restangular";

@Component({
  selector: "app-edit-documento-template",
  templateUrl: "./edit-documento-template.component.html",
  styleUrls: ["./edit-documento-template.component.scss"],
})
export class EditDocumentoTemplateComponent implements OnInit {
  title = "angular-email-editor";
  templateExist = false;
  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;
  id;
  salvar = false;
  template: any;
  formulario: FormGroup;
  designJson;
  options = {
    displayMode: "email",
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
  };
  cardImageBase64;
  isImageSaved;
  openPopup: boolean = true;
  modalRef: BsModalRef;
  tiposDocumentoLote: [];

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private router: Router,
    private restangular: Restangular,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restangular
      .all("TipoDocumentoLote")
      .get("")
      .subscribe((resp) => {
        this.tiposDocumentoLote = resp.data;
      });

    this.id = this.route.snapshot.params["id"];
    this.restangular
      .all("DocumentoLoteTemplate")
      .get(this.id)
      .subscribe((dados) => {
        this.updateForm(dados.data);
        this.designJson = JSON.parse(dados.data.designJson);
      });
    this.formulario = this.formBuilder.group({
      titulo: [null, Validators.required],
      html: [null, Validators.required],
      templateId: [this.id],
      designJson: [],
      tipoDocumentoLoteId: [null, Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
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

    const template = {
      designJson:
        this.template && this.template.designJson
          ? this.template.designJson
          : this.formulario.value.designJson,
      html:
        this.template && this.template.html
          ? this.template.html
          : this.formulario.value.html,
      titulo: this.formulario.value.titulo,
      templateId: this.id,
      tipoDocumentoLoteId: this.formulario.value.tipoDocumentoLoteId,
    };

    this.restangular
      .all("/DocumentoLoteTemplate")
      .customPUT(template, this.id)
      .subscribe(
        (a) => {
          this.salvar = false;
          this.notifierService.notify(
            "success",
            "Template atualizado com sucesso"
          );
          this.router.navigate(["documentotemplate"]);
        },
        () => {
          this.salvar = false;
          this.notifierService.notify("error", "Erro ao atualizar o template!");
        }
      );
    this.modalRef.hide();
  }
  updateForm(dados) {
    this.formulario.patchValue({
      html: dados.html,
      titulo: dados.titulo,
      templateId: dados.documentoLoteTemplateId,
      designJson: dados.designJson,
      tipoDocumentoLoteId: dados.tipoDocumentoLoteId,
    });
  }

  editorUpdated(data) {
    this.template = {
      designJson: JSON.stringify(data.design),
      html: data.html,
      titulo: this.formulario.value.titulo,
    };
  }

  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  aplicaCssErro(campo) {
    return {
      "has-error": this.verificaValidTouched(campo),
    };
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
