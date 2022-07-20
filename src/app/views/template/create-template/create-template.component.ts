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
  options = {
    locale: 'pt-BR',
    features: {
      textEditor: {
        tables: true
      }
    }
  }
  cardImageBase64;
  isImageSaved
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

  editorReady(event) {
    const that = this
    this.emailEditor.editor.addEventListener('design:updated', () => {
      this.salvar = true;
      this.emailEditor.editor.exportHtml((data) => {
        this.template = {
          designJson:JSON.stringify(data.design),
          codigoHtml: data.html,
          descricao:this.formulario.value.descricao
        }
        this.salvar = false
      })
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
      mensagem: {
        name: 'Mensagem',
        value: '{{mensagem}}',
      },
    });

    this.emailEditor.editor.registerCallback('image', function(file, done) {
      var imagem:any = {
        base64:'',
        tipo:'',
        nome:'',
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const imgBase64Path = e.target.result;
            that.cardImageBase64 = imgBase64Path;
            that.isImageSaved = true;
            imagem.base64 = imgBase64Path
            imagem.nome = file.attachments[0].name
            imagem.tipo =file.attachments[0].type

            that.restangular.all('marketing/imageTemplate')
            .post(imagem)
            .subscribe(a => {
              done({ progress: 100, url: a.data.url })
            })
          }
      }
      reader.readAsDataURL(file.attachments[0]);
    })
  }

  save(){
    this.salvar = true;

    if(!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()
      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      this.salvar = false
      return false;
    }
    this.template = {
      designJson: this.template.designJson,
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
