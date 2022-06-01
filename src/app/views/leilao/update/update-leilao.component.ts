import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Restangular } from 'ngx-restangular';
import { NotifierService } from 'angular-notifier';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-update-leilao',
  templateUrl: './update-leilao.component.html',
  styleUrls: ['./update-leilao.component.scss'],
})
export class UpdateLeilaoComponent implements OnInit {
  @ViewChild('inputAnexos') inputAnexos: ElementRef;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  formulario:FormGroup
  id:any
  categorias:any
  comitentes:any
  leiloeiros:any
  empresas:any
  status;
  minDate: Date;

  anexosbase64: any
  anexosnome: any
  anexostamanho: any
  anexostipo: any
  numeroAdcAnexo: number
  arrayAnexos = [];
  fileToUpload: File | null = null;

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
    placeholder: 'Termos e Condições de Venda...',
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

  maskhora = [ /\d/,/\d/, ':', /\d/, /\d/, ]
  habilitacoes: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService)
  {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);

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
    this.restangular.one('Habilitacao/Regras').get().subscribe(
      dados =>{
        // const habilitac = dados.data
        // const regras = habilitac.map(x => x.regraHabilitacao)
         this.habilitacoes = dados.data
      })
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.restangular.all('admin/leilao').get(this.id).subscribe(dados => {
      this.updateForm(dados.data)
    })
  }

  onSubmit(){
    console.log(this.formulario.value)
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    this.restangular.all('leilao').customPUT(this.formulario.value, this.id) .subscribe(a => {
      this.notifierService.notify('success', 'Leilão editado com sucesso');
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

  updateForm(dados) {
    this.isImageSaved = true
    this.cardImageBase64 = dados.foto.url


    const arrayRegraHabiliacaoId = dados.regrasHabilitacao.map(regra=> regra.regraHabilitacao.regraHabilitacaoId)

    this.formulario = this.formBuilder.group({
      nome: [dados.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      titulo:[dados.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      dataLeilao: [moment.utc(dados.dataLeilao).local().toDate(), [Validators.required]],
      dataAberturaLance: [moment.utc(dados.dataAberturaLance).local().toDate(), Validators.required],
      dataInicioAgendamento: [dados.dataInicioAgendamento ? moment.utc(dados.dataInicioAgendamento).local().toDate() : null],
      dataFimAgendamento: [dados.dataFimAgendamento ? moment.utc(dados.dataFimAgendamento).local().toDate() : null],
      dataEdital: [dados.dataEdital ? moment.utc(dados.dataEdital).local().toDate() : null],
      dataNotificacao: [dados.dataNotificacao ? moment.utc(dados.dataNotificacao).local().toDate() : null],
      dataIncioLiberacao: [dados.dataInicioLiberacao ? moment.utc(dados.dataInicioLiberacao).local().toDate() : null],
      dataFimLiberacao: [dados.dataFimLiberacao ? moment.utc(dados.dataFimLiberacao).local().toDate() : null],
      dataDiarioOficial: [dados.dataDiarioOficial ? moment.utc(dados.dataDiarioOficial).local().toDate() : null],
      emailsNotificacao: [dados.emailsNotificacao],
      numeroDiarioOficial:[dados.numeroDiarioOficial],
      foto: this.formBuilder.group({
        url: [dados.foto.url],
        nome:[dados.foto.nome],
        base64:[dados.foto.base64],
        tipo:[dados.foto.tipo],
        tamanho:[dados.foto.tamanho],
      }),
      categoriaId: [dados.categoriaId, Validators.required],
      comitenteId: [dados.comitenteId, Validators.required],
      leiloeiroId: [dados.leiloeiroId, Validators.required],
      empresaId: [dados.empresaId, Validators.required],
      leilaoId: [dados.leilaoId, Validators.required],
      statusId: [dados.statusId, Validators.required],
      comissao: [dados.comissaoLeiloeiro, Validators.required],
      termoCondicaoVenda: [dados.termoCondicaoVenda],
      anexos: this.formBuilder.array(dados.anexos ? dados.anexos.map(x => this.formBuilder.group({ ...x, acao: '' })) : []),
      regrasHabilitacao: this.formBuilder.control([...arrayRegraHabiliacaoId])
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
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
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
                        'Maximum dimentions allowed ' +
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
  anexoChangeEvent(anexoInput: FileList) {
    this.fileToUpload = anexoInput.item(0);
    this.fileToUpload.name
    this.fileToUpload.size
    this.fileToUpload.type
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      this.anexosbase64 = reader.result
      const arquivo = {
        arquivoId: 0,
        nome: this.fileToUpload.name,
        base64: this.anexosbase64,
        tipo: this.fileToUpload.type,
        tamanho: this.fileToUpload.size,
        dataCadastro: moment().utc().toISOString()
      }

      this.atualizarAnexo(arquivo, this.numeroAdcAnexo)
    };
  }
  atualizarAnexo(obj, i) {
    let anexos = this.formulario.get('anexos') as FormArray

    if (i < 0) {
      anexos.push(this.formBuilder.group({
        arquivoId: 0,
        nome: [null, Validators.required],
        arquivo: obj,
        acao: 'I'
      }))
    } else {

      const valor = anexos.value[i]
      anexos.removeAt(i)
      anexos.insert(i, this.formBuilder.group({
        arquivoId: 0,
        nome: valor.nome,
        arquivo: obj,
        acao: 'A'
      }))

    }
  }
  alterarAnexo(i) {
    this.numeroAdcAnexo = i
    this.inputAnexos.nativeElement.click()
  }

  filterList(campo: string) {
    const fotos = this.formulario.get(campo) as FormArray;
    return fotos.controls.filter(x => (x as FormGroup).controls['acao'].value !== 'D');
  }

  deleteAnexo(indexAnexo: number) {
    let anexos = this.formulario.controls['anexos'] as FormArray;
    let anexo = anexos.at(indexAnexo) as FormGroup;
    if (anexo.controls['acao'].value !== 'I') {
      anexo.controls['acao'].setValue('D');
    }
    else {
      anexos.removeAt(indexAnexo)
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
    return {'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
    this.formulario.get(campo).updateValueAndValidity();
  }

}
