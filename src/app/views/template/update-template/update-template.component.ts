import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import { EmailEditorComponent } from 'angular-email-editor';
@Component({
  selector: 'app-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.scss']
})
export class UpdateTemplateComponent implements OnInit {

  title = 'angular-email-editor';
  templateExist = false;
  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;
  id;
  salvar = false;
  // template: { codigoHtml: string; descricao: string; };
  template: any;
  formulario: any;
  constructor(
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private router: Router,
    private restangular: Restangular,
    private route: ActivatedRoute,
  ) {

    this.id = this.route.snapshot.params['id']

    this.formulario = this.formBuilder.group({
      descricao: [null, Validators.required]
    })


  }

  ngOnInit() {
    this.restangular.all('marketing/TemplateNotificacao').get(this.id).subscribe(dados => {
      this.template = {
        codigoHtml: JSON.parse(dados.data.codigoHtml),
      }
      this.formulario = this.formBuilder.group({
        descricao: [dados.data.descricao, Validators.required]
      })
      this.getDesign(this.template)
      // this.templateExist = true
    })

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
            this.salvar = false;
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
  // exportHtml() {

  //   this.emailEditor.editor.exportHtml((data) => {

  //     this.template = {
  //       codigoHtml: JSON.stringify(data.design),
  //       descricao: 'Teste',
  //     }
  //   });
  //   this.notifierService.notify('success', 'Template exportado');
  // }

  save() {
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
      descricao: this.formulario.value.descricao,
      templateNotificacaoId:this.id

    }
    this.restangular.all('Marketing/TemplateNotificacao').customPUT(this.template, this.id).subscribe(a => {
      this.salvar = false;
      this.notifierService.notify('success', 'Template atualizado com sucesso');
      this.router.navigate(['template'])
    },
      error => {
        this.salvar = false;
        this.notifierService.notify('error', 'Erro ao atualizar o template!');
      });


  }
  getDesign(template: any) {

    this.emailEditor.editor.loadDesign(template.codigoHtml);

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
}
