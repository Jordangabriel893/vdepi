import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Restangular } from 'ngx-restangular';
import { NotifierService } from 'angular-notifier';
import {  Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-create-leilao',
  templateUrl: './create-leilao.component.html',
  styleUrls: ['./create-leilao.component.scss'],
  providers: [DatePipe]
})
export class CreateLeilaoComponent implements OnInit {

  context = {
    message: 'Hello there!'
  };
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  formulario:FormGroup

  today = moment().utc();
  dataAtual:any;
  categorias:any
  comitentes:any
  leiloeiros:any
  empresas:any
  status:any
  minDate: Date;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Temos e Condição de Venda...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
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

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService
    ) {
      localeService.use('pt-br');
      this.minDate = new Date();
      this.minDate.setDate(this.minDate.getDate() + 1);
    }

  ngOnInit() {
    this.restangular.one('categoria').get().subscribe(dados =>{
      const categoriaPai = dados.data.filter(x => x.categoriaPaiId == null)
        this.categorias = categoriaPai
      }
    )
    this.restangular.one('comitente').get().subscribe(
      dados =>{
        this.comitentes = dados.data
      }
    )
    this.restangular.one('leiloeiro').get().subscribe(
      dados =>{

        this.leiloeiros = dados.data
      }
    )
    this.restangular.one('empresa').get().subscribe(
      dados =>{
        this.empresas= dados.data
      }
    )
    this.restangular.all('leilao').one('status').get().subscribe(
      dados =>{
        this.status= dados.data
      }
    )

    this.formulario = this.formBuilder.group({
      nome:  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      titulo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      dataLeilao: [null, Validators.required],
      dataAberturaLance: [null, Validators.required],
      dataInicioAgendamento: [null],
      dataFimAgendamento: [null],
      dataEdital: [null],
      dataNotificacao: [null],
      dataIncioLiberacao: [null],
      dataFimLiberacao: [null],
      emailsNotificacao: [null],
      dataDiarioOficial: [null],
      numeroDiarioOficial: [null],
      foto: this.formBuilder.group({
        arquivoId:[0],
        nome:[null],
        base64:[null, Validators.required],
        tipo:[null],
        tamanho:[0]
      }, Validators.required),
      categoriaId: [null, Validators.required],
      comitenteId: [null, Validators.required],
      leiloeiroId: [null, Validators.required],
      empresaId: [null, Validators.required],
      statusId: [null, Validators.required],
      comissao: ["5", Validators.required],
      termoCondicaoVenda: [null],
    })
  }

  onSubmit() {
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()
      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    const dataLeilao = moment(this.formulario.value.dataLeilao).utc();
    const dataAberturaLance = moment(this.formulario.value.dataAberturaLance).utc();
    const dataLeilaoMaiorHoje = dataLeilao.isSameOrAfter(this.today);
    const dataAberturaLanceMaior = dataAberturaLance.isSameOrAfter(this.today);
    const ehMenorOuIgualLancesToday = dataAberturaLance.isSameOrBefore(dataLeilao);

    if(!dataLeilao.isSameOrAfter(this.today)) {
      this.notifierService.notify('error', 'Data do Leilão deve ser maior que hoje');
      return false;
    }

    if(!dataAberturaLance.isSameOrAfter(this.today)) {
      this.notifierService.notify('error', 'Data da Abertura de Lances deve ser maior que hoje');
      return false;
    }

    if(!dataAberturaLance.isSameOrBefore(dataLeilao)) {
      this.notifierService.notify('error', 'Data da Abertura de Lances deve ser menor que a Data do leilão');
      return false;
    }

    this.restangular.all('leilao').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Leilão Criado com sucesso');
      this.router.navigate(['/leilao']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar o Leilão!');

        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'O tamanho máximo permitido é ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Somente imagens são permitidas ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Tamanho máximo permitido ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    var foto = this.formulario.get('foto') as FormGroup;
                    foto.get('base64').setValue(imgBase64Path);
                    foto.get('nome').setValue(fileInput.target.files[0].name);
                    foto.get('tamanho').setValue(fileInput.target.files[0].size);
                    foto.get('tipo').setValue(fileInput.target.files[0].type);
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage(input) {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    input.value = "";
  }

  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
