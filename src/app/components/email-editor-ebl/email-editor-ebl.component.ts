import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from "@angular/core";
import { Restangular } from "ngx-restangular";
import { EmailEditorComponent } from "angular-email-editor";
import { mergeTags } from "../../views/_models/merge-tags";

@Component({
  selector: "app-email-editor-ebl",
  templateUrl: "./email-editor-ebl.component.html",
  styleUrls: ["./email-editor-ebl.component.scss"],
})
export class EmailEditorEblComponent {
  @Output() updated = new EventEmitter();
  @Input() options;
  @Input() tools;
  @Input() bodyValues;
  @Input() designJson;

  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;

  cardImageBase64;
  isImageSaved;
  idEditor = "emaileditor";
  optionsDefault = {
    id: this.idEditor,
    locale: "pt-BR",
    features: {
      textEditor: {
        tables: true,
      },
    },
    mergeTagsConfig: {
      autocompleteTriggerChar: "@",
    },
  };
  body;

  constructor(private restangular: Restangular) {
    if (this.options) {
      this.optionsDefault = {
        ...this.optionsDefault,
        ...this.options,
      };
    }

    this.body = this.bodyValues || {
      backgroundColor: "#ffffff",
      contentWidth: "650px", // or percent "50%"
    };
  }

  editorReady() {
    this.emailEditor.editor.setBodyValues(this.body);
    this.emailEditor.editor.setMergeTags(mergeTags);

    if (this.designJson) {
      this.setDesign();
    }

    const that = this;
    this.emailEditor.editor.addEventListener("design:updated", () => {
      //this.salvar = true;
      this.emailEditor.editor.exportHtml((data) => {
        this.updated.emit(data);
      });
    });

    this.emailEditor.editor.registerCallback("image", function (file, done) {
      var imagem: any = {
        base64: "",
        tipo: "",
        nome: "",
      };

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          that.cardImageBase64 = imgBase64Path;
          that.isImageSaved = true;
          imagem.base64 = imgBase64Path;
          imagem.nome = file.attachments[0].name;
          imagem.tipo = file.attachments[0].type;

          that.restangular
            .all("marketing/imageTemplate")
            .post(imagem)
            .subscribe((a) => {
              done({ progress: 100, url: a.data.url });
            });
        };
      };
      reader.readAsDataURL(file.attachments[0]);
    });
  }

  setDesign() {
    this.emailEditor.editor.loadDesign(this.designJson);
  }
}
