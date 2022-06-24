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
        designJson: JSON.parse(dados.data.designJson),
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
              designJson: JSON.stringify(data.design),
              codigoHtml: JSON.stringify(data.html),
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
      comissao_leiloeiro: {
        name: 'Comissão do Leiloeiro',
        value: '{{comissao_leiloeiro}}',
      },
      data_leilao: {
        name: 'Data do Leilão',
        value: '{{data_leilao}}',
      },
      descricao_lote: {
        name: 'Descrição do Lote',
        value: '{{descricao_lote}}',
      },
      email_usuario: {
        name: 'Email do Usuário',
        value: '{{email_usuario}}',
      },
      lotes: {
        name: 'Lista de Lotes',
        value: '{{lotes}}',
      },
      link_confirmacao: {
        name: 'Link de Confirmação',
        value: '{{link_confirmacao}}',
      },
      nome_comitente: {
        name: 'Nome do Comitente',
        value: '{{nome_comitente}}',
      },
      nome_empresa: {
        name: 'Nome da Empresa',
        value: '{{nome_empresa}}',
      },
      nome_leilao: {
        name: 'Nome do Leilão',
        value: '{{nome_leilao}}',
      },
      nome_leiloeiro: {
        name: 'Nome do Leiloeiro',
        value: '{{nome_leiloeiro}}',
      },
      nome_usuario: {
        name: 'Nome do Usuário',
        value: '{{nome_usuario}}',
      },
      numero_lote: {
        name: 'Numero do Lote',
        value: '{{numero_lote}}',
      },
      taxa_adm: {
        name: 'Taxa Administrativa',
        value: '{{taxa_adm}}',
      },
      telefone_usuario: {
        name: 'Telefone do Usuário',
        value: '{{telefone_usuario}}',
      },
      valor_arrematacao: {
        name: 'Valor Arrematação',
        value: '{{valor_arrematacao}}',
      },
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

    if(!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()
      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }
    this.template = {
      designJson: this.template.designJson,
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

    this.emailEditor.editor.loadDesign(template.designJson);

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
