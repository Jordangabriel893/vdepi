import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-edit-documento-template',
  templateUrl: './edit-documento-template.component.html',
  styleUrls: ['./edit-documento-template.component.scss']
})
export class EditDocumentoTemplateComponent implements OnInit {
  formulario:FormGroup
  templates = [];
  perfis = [];
  fieldTextType: boolean;
  hasAssinatura = false;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: '300px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: '',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'roboto', name: 'Roboto' },
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
  ) {

   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.restangular.all('DocumentoLoteTemplate').get(this.id).subscribe(dados => {
      this.updateForm(dados.data)
    })
    this.formulario = this.formBuilder.group({
      titulo: [null, Validators.required],
      html: [null, Validators.required],
      templateId:[this.id]
    })
  }

  onSubmit() {
    this.restangular.all('/DocumentoLoteTemplate').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Template do documento editado com sucesso');
      this.router.navigate(['/documentotemplate']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao editar o template do documento!');

        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      })
  }
  updateForm(dados) {
    this.formulario.patchValue({
      html:dados.html,
      titulo: dados.titulo,
      templateId: dados.documentoLoteTemplateId,
    })
  }
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return{
      'has-error': this.verificaValidTouched(campo),

    }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
