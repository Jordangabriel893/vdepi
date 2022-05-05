import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Restangular } from 'ngx-restangular';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';

@Component({
  selector: 'app-update-leiloeiros',
  templateUrl: './update-leiloeiros.component.html',
  styleUrls: ['./update-leiloeiros.component.scss']
})
export class UpdateLeiloeirosComponent implements OnInit {
  @ViewChild('inputAnexos') inputAnexos: ElementRef;
  context = {
    message: 'Hello there!'
  };
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  formulario:FormGroup
  leiloeiros
  id
  public mask: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>

  //anexos
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
    private cepService: ConsultaCepService,
    private route: ActivatedRoute,
    private localeService: BsLocaleService
    ) {

    this.id = this.route.snapshot.params['id']
    this.restangular.one("leiloeiro", this.id).get().subscribe((response) => {
    this.updateForm(response.data)
    })

    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]

    this.formulario = this.formBuilder.group({
      leiloeiroId: [this.id, Validators.required],
      nome:[null, Validators.required],
      razaoSocial:[null],
      cpfCnpj:[null, Validators.required],
      telefone:[null, Validators.required],
      email:[null, Validators.required],
      orgaoRegistro:[null, Validators.required],
      uf: [null],
      matricula: [null],
      genero:[null],
      nomeComercial:[null],
      anexos: this.formBuilder.array([]),
      foto: this.formBuilder.group({
        nome:[null],
        base64:[null],
        tipo:[null],
        tamanho:[0]
      }, Validators.required),
      endereco: this.formBuilder.group({
        enderecoId: [0],
        cep: [null, [Validators.required]],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        logradouro:[null, Validators.required]
      }),
      ativo: [null]
      })
    }

  ngOnInit() {

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
    this.restangular.all('leiloeiro').customPUT(this.formulario.value, this.id).subscribe(a => {
      this.notifierService.notify('success', 'Leiloeiro atualizado com sucesso');
      this.router.navigate(['/leiloeiro']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar o Leiloeiro!');
        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  updateForm(dados){
    if(dados.foto) {
      this.isImageSaved = true
      this.cardImageBase64 = dados.foto.url
    }
    this.formulario.patchValue({
      nome:dados.nome,
      razaoSocial:dados.razaoSocial,
      genero:dados.genero,
      orgaoRegistro:dados.orgaoRegistro,
      uf:dados.uf,
      matricula:dados.matricula,
      nomeComercial:dados.nomeComercial,
      anexos:dados.anexos,
      cpfCnpj:dados.cpfCnpj,
      telefone: dados.telefone,
      email: dados.email,
      endereco: dados.endereco,
      enderecoId:dados.enderecoId,
      foto: [dados.foto],
      fotoId: dados.fotoId,
      ativo: dados.ativo
    })
  }
  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }
  populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
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
    if(anexo.controls['acao'].value !== 'I') {
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
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  public maskcpfCnpj = function (rawValue) {
    var numbers = rawValue.match(/\d/g);
    var numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }
    if (numberLength <= 11) {
      return [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
    } else {
      return [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/,  /[0-9]/, '-', /[0-9]/, /[0-9]/];
    }
  }

  public maskTelefone = function (rawValue) {
    var numbers = rawValue.match(/\d/g);
    var numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }
    if (numberLength <= 10) {
      return ['(', /\d/, /\d/, ')', ' ',/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    } else {
      return ['(', /\d/, /\d/, ')', ' ',/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
  }
}
