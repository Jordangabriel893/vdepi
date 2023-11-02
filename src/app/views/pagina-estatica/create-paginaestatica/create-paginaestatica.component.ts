import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { Restangular } from 'ngx-restangular';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create-paginaestatica',
  templateUrl: './create-paginaestatica.component.html',
  styleUrls: ['./create-paginaestatica.component.scss'],
})
export class CreatePaginaestaticaComponent implements OnInit {
  formulario: FormGroup;
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

  sub: Subscription[] = [];
  empresas = [];

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private cepService: ConsultaCepService
  ) {
    const now = new Date();
    this.formulario = this.formBuilder.group({
      html: [null, Validators.required],
      dataCriacao: [now, Validators.required],
      titulo: [null, Validators.required],
      rota: [null],
      menu: [false, Validators.required],
      empresaId: [null],
    });
  }

  ngOnInit() {
    // this.sub.push(
    //   this.restangular
    //     .one('empresa')
    //     .get()
    //     .subscribe((x) => {
    //       this.empresas = x.data;
    //     })
    // );
  }
  onSubmit() {
    this.restangular
      .all('paginaEstatica')
      .post(this.formulario.value)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Página Estática criada com sucesso'
          );
          this.router.navigate(['/paginaEstatica']);
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao criar o Página Estática!'
          );

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }

  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
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

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) };
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
