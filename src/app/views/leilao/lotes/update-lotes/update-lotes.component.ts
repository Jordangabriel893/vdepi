import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-update-lotes',
  templateUrl: './update-lotes.component.html',
  styleUrls: ['./update-lotes.component.scss']
})
export class UpdateLotesComponent implements OnInit {

  formulario: FormGroup
  id: any
  lote: any
  tiposLote:any
  loteCampos:any
  categorias: any
  categoriaPaiId:any
  categoriasFilhas:any
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  tipoFoto:any
  fileToUpload: File | null = null;
  base64:any
  nome:any
  tamanho:any
  tipo:any
  local:any
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
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
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
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

    this.formulario = this.formBuilder.group({
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricaoDetalhada: [null, [Validators.required, Validators.minLength(6)]],
      itemLote: [null, Validators.required],
      leilao: [null, [Validators.required]],
      status: this.formBuilder.group({
        ativo: [true, [Validators.required]],
        descricao: [null, Validators.required],
      }),
      categoria: this.formBuilder.group({
        descricao: [null, Validators.required],
        categoriaPaiId: [null],

      }),
      local: this.formBuilder.group({
        descricao: [null, [Validators.required]],
        localLoteId: [null],

      }),
      campos: this.formBuilder.array([]),
      anexos: this.formBuilder.array([]),

      valorLanceInicial: [null, [Validators.required, Validators.email]],
      valorMinimoVenda: [null, [Validators.required]],
      valorAvaliacao: [null, [Validators.required]],
      valorIncremento: ["null"],
      valorTaxaAdministrativa: ["null"],
      valorOutrasTaxas: [null, [Validators.required]],
      observacao: [null, [Validators.required]],
      judicial: [null, [Validators.required]],
      loteJudicial: [null, [Validators.required]],
      fotos: this.formBuilder.array([]),
      tipoLoteId:[],
      tipoLote:[],
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.restangular.one("lote", this.id).get({}).subscribe(
      (lote) => {
        console.log(lote.data)
        this.categoriaPaiId = lote.data.categoria.categoriaPaiId
        this.updateForm(lote.data)
        this.updateFormArrays(lote.data)
      })
      this.restangular.one("lotecampo").get().subscribe(
        (dados) => {
          this.loteCampos=dados.data
        })
        this.restangular.one("tipolote").get().subscribe(
          (dados) => {
            this.tiposLote = dados.data
          })

    this.restangular.one('categoria').get().subscribe(dados => {
      this.categorias = dados.data
    })
    this.restangular.one('tipofoto').get().subscribe(dados => {
      this.tipoFoto = dados.data
    })
    this.restangular.one('categoria').get().subscribe(dados => {
      const categorias = dados.data
      const filtrarCategorias = categoria => categoria.categoriaPaiId === this.categoriaPaiId;
      const categoriasFilhas = categorias.filter(filtrarCategorias)
      this.categoriasFilhas = categoriasFilhas

    })
    this.restangular.one('local').get().subscribe(dados => {
      this.local = dados.data
    })
  }

  onSubmit() {
    console.log(this.formulario.value)
  }

  fileChangeEvent(fileInput: any, i ) {
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
            this.base64 = this.cardImageBase64.substring(23, 100000)
            this.nome = fileInput.target.files[0].name
            this.tamanho = fileInput.target.files[0].size
            this.tipo = fileInput.target.files[0].type
            console.log(fileInput.target.files[0])
            // this.previewImagePath = imgBase64Path;
            this.atualizarFoto(i)
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);

    }

  }
  anexoChangeEvent(anexoInput:FileList, i){
    this.fileToUpload = anexoInput.item(0);
    this.nome = this.fileToUpload.name
    this.tamanho = this.fileToUpload.size
    this.tipo = this.fileToUpload.type
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
        console.log(reader.result);
    };
    this.atualizarAnexo(i)
  }

  adicionarCampo() {
    let campos = this.formulario.get('campos') as FormArray
    campos.push(this.formBuilder.group({
      tipoFotoId: this.id,
      loteCampoId: 0,
      valor: "",
      loteCampo:this.formBuilder.group({
        descricao:"--",
      }),
    }))

    console.log(this.formulario.value.campos)
  }
  adicionarFoto(){
    let fotos = this.formulario.get('fotos') as FormArray
    fotos.push(this.formBuilder.group({
      tipoFotoId: "",
      loteFotoId: 0,
      arquivo: this.formBuilder.group({
        url:"",
        tipo:"",
        base64:"",
        arquivoId:"",
        nome:"",
        tamanho:""
    })})
    )
  }
  adicionarAnexo(){
    let anexos = this.formulario.get('anexos') as FormArray
    anexos.push(this.formBuilder.group({
      loteId: this.id,
      arquivoId: 0,
      arquivo: {
      arquivoId: 0,
      nome: null,
      base64: null,
      tipo: null,
      tamanho: null
      }
    }))
  }
  qualquer(i){
    console.log(i)
  }
  atualizarAnexo(i){
    this.formulario.controls['anexos'].value[i] = {
      loteId: this.id,
      arquivoId: 0,
      arquivo: {
      arquivoId: 0,
      nome: this.nome,
      base64: null,
      tipo: this.tipo,
      tamanho: this.tamanho
      }
      }

    console.log(this.formulario.controls['anexos'].value[i])
  }
  atualizarFoto(i){
    this.formulario.controls['fotos'].value[i] = {
      arquivoId:[0],
      arquivo:{
        nome:this.nome,
        base64:this.base64,
        tipo:this.tipo,
        tamanho:this.tamanho
      }
      }
    console.log(this.formulario.controls['fotos'].value[i])
  }
  updateFormArrays(dados) {
    let campos = dados.campos
    campos.forEach(obj => (this.formulario.controls['campos'] as FormArray).push(this.formBuilder.group(obj)))

    let objetos = dados.fotos
    objetos.forEach(obj => (this.formulario.controls['fotos'] as FormArray).push(this.formBuilder.group(obj)))
    console.log(this.formulario.value.campos)
    console.log(this.formulario.value.fotos)
  }
  updateForm(dados) {
    this.formulario.patchValue({
      descricao: dados.descricao,
      descricaoDetalhada: dados.descricaoDetalhada,
      itemLote: dados.itemLote,
      leilao: dados.leilao,
      status: dados.status,
      categoria: dados.categoria,
      local: dados.local,
      valorLanceInicial: dados.valorLanceInicial,
      valorMinimoVenda: dados.valorMinimoVenda,
      valorAvaliacao: dados.valorAvaliacao,
      valorIncremento: dados.valorIncremento,
      valorTaxaAdministrativa: dados.valorTaxaAdministrativa,
      valorOutrasTaxas: dados.valorOutrasTaxas,
      observacao: dados.observacao,
      judicial: dados.judicial,
      loteJudicial: dados.loteJudicial,
      tipoLoteId: dados.tipoLoteId,
      tipoLote: dados.tipoLote,

    })

  }
  deleteCampo(indexCampo:number) {
    let campos = this.formulario.controls['campos'] as FormArray
    campos.removeAt(indexCampo)
  }
  deleteFoto(indexFoto:number){
    let fotos = this.formulario.controls['fotos'] as FormArray
    fotos.removeAt(indexFoto)
  }
}
