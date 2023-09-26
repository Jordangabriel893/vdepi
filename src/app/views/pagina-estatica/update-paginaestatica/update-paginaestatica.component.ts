import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-update-paginaestatica',
  templateUrl: './update-paginaestatica.component.html',
  styleUrls: ['./update-paginaestatica.component.scss'],
})
export class UpdatePaginaestaticaComponent implements OnInit {
  formulario: FormGroup;
  id;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: '600px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'HTML',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'roboto', name: 'Roboto' },
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.restangular
      .all('PaginaEstatica')
      .get(this.id)
      .subscribe((dados) => {
        this.updateForm(dados.data);
      });
  }
  onSubmit() {
    if (!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      });
      this.notifierService.notify(
        'error',
        'Preencha todos os campos obrigatórios'
      );
      return false;
    }
    this.restangular
      .all('PaginaEstatica')
      .customPUT(this.formulario.value, this.id)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Página Estática editada com sucesso'
          );
          this.router.navigate(['/paginaEstatica']);
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao atualizar a Página Estática!'
          );
          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }
  updateForm(dados) {
    this.formulario = this.formBuilder.group({
      paginaEstaticaId: [dados.paginaEstaticaId, Validators.required],
      html: [dados.html, Validators.required],
      titulo: [dados.titulo, Validators.required],
      rota: [dados.rota, Validators.required],
    });
  }

  formatRota() {
    let titulo = this.formulario.value.titulo;
    titulo = titulo
      .trim()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w ]/g, '')
      .replace(/\s|_|\(|\)/g, '-')
      .toLowerCase();
    this.formulario.get('rota').patchValue(titulo);
  }
  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) };
  }
  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
