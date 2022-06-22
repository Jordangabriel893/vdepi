import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailEditorComponent } from 'angular-email-editor';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit,  OnDestroy {

  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;
  title = 'angular-email-editor';
  salvar = false;
  template;
  formulario;

  constructor(
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private router: Router,
    private restangular: Restangular,
  ) {
    this.formulario =this.formBuilder.group({
      descricao:[null, Validators.required]
    })

   }


  ngOnInit() {


  }

  editorLoaded(event) {

  }

  editorReady(event) {


    this.emailEditor.editor.addEventListener('design:updated', (updates) => {
      this.salvar = true;
      this.emailEditor.editor.exportHtml((data) => {
        this.template = {
              codigoHtml: JSON.stringify(data.design),
              descricao:this.formulario.value.descricao
            }
            this.salvar = false
      })
    })
    this.emailEditor.editor.registerCallback('image', function(file, done) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        done({ progress: 100, url: e.target.result })
      }
         reader.readAsDataURL(file.accepted[0]);

    })

    this.emailEditor.editor.setMergeTags({
      first_name: {
        name: "First Name",
        value: "{{first_name}}",
        sample: "John"
      },
      last_name: {
        name: "Last Name",
        value: "{{last_name}}",
        sample: "Doe"
      },
      cidade:{
        name:'Cidade',
        value: "{{city}}",
        sample: 'Rio de Janeiro'
      },
      estado:{
        name:'Estado',
        value: "{{state}}",
        sample: 'São Paulo'
      }
    });

  }

  save(){
    this.salvar = true;

    if(this.template == undefined){
      this.notifierService.notify('error', 'Exporte o template antes de salvar')
      return;
    }
    if(!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()
      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }
    this.template = {
      codigoHtml: this.template.codigoHtml,
      descricao: this.formulario.value.descricao
    }
      this.restangular.all('Marketing/TemplateNotificacao').post(this.template).subscribe(a => {
        this.notifierService.notify('success', 'Template criado com sucesso');
        this.salvar = false
        this.router.navigate(['/template']);
      },

        error => {
          this.salvar = false
          this.notifierService.notify('error', 'Erro ao criar o template!');
        });

  }

  verificaValidTouched(campo){
    this.formulario.controls [campo].valueChanges.subscribe ((val) => {
      if (String (val) === "NaN") {
        this.formulario.controls [campo].setValue(null);
      }
    });
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return{ 'has-error': this.verificaValidTouched(campo) }
  }
  ngOnDestroy(): void {
  }


}
