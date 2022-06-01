
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { forkJoin } from 'rxjs';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
import { TabHeadingDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-create-lotes',
  templateUrl: './create-lotes.component.html',
  styleUrls: ['./create-lotes.component.scss']
})
export class CreateLotesComponent implements OnInit {
  @ViewChild('inputFotos') inputFotos: ElementRef;
  @ViewChild('inputAnexos') inputAnexos: ElementRef;

  formulario: FormGroup
  id: any
  leilaoId;
  loteStatus;
  leilao: any
  tiposLote: any
  loteCampos: any
  categorias: any
  categoriaPaiId: any
  categoriasFilhas: any
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  tipoFoto: any
  fileToUpload: File | null = null;
  codigoComum:boolean = true
  //fotos
  fotosbase64: any
  fotosnome: any
  fotostamanho: any
  fotostipo: any
  numeroAdcFoto: number
  arrayFotos = [ ];

  //anexos
  anexosbase64: any
  anexosnome: any
  anexostamanho: any
  anexostipo: any
  numeroAdcAnexo: number
  arrayAnexos = [];

  local: any
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
    placeholder: 'Descrição detalhada...',
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
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.leilaoId = this.id;

    this.formulario = this.formBuilder.group({
      loteId:[0],
      descricao: [null, Validators.required],
      descricaoDetalhada: [null,Validators.required],
      itemLote: [],
      numeroLote: [null, Validators.required],
      leilaoId: [this.id],
      statusId: [null , Validators.required],
      categoriaId: [null ,Validators.required],
      localId: [null, Validators.required],
      valorLanceInicial: [null, Validators.required],
      valorMinimoVenda: [null, Validators.required],
      valorAvaliacao: [null, Validators.required],
      valorIncremento: [null, Validators.required],
      valorTaxaAdministrativa: [0],
      valorOutrasTaxas: [0],
      observacao: [],
      judicial: [false],
      loteJudicial: this.formBuilder.group({
        loteJudicialId:[0],
        numProcesso:[null],
        autor:[null],
        reu: [null],
        depositario:[null],
        localDepositario:[null],
        recursoPendente: [false],
        anoProcesso:[null],
        tipoAcao: [null],
        recursos:[false],
        comarca:[null],
        natureza:[null]
      }),
      loteJudicialId: [null],
      tipoLoteId: [null, Validators.required],
      campos: this.formBuilder.array([], Validators.required),
      anexos: this.formBuilder.array([]),
      fotos: this.formBuilder.array([], Validators.required)
    })

  }
  ngOnInit() {
    forkJoin([
      this.restangular.one("lotecampo").get().pipe(),
      this.restangular.one("tipolote").get().pipe(),
      this.restangular.one('tipofoto').get().pipe(),
      this.restangular.one('local').get().pipe(),
      this.restangular.one("admin/leilao", this.id).get().pipe(),
      this.restangular.one('categoria').get().pipe(),
      this.restangular.one('lotestatus').get().pipe()
    ]).subscribe((allResp: any[]) => {
      this.loteCampos = allResp[0].data;

      this.loteCampos.forEach(x => {
        if(x.destaqueSite) {
          this.adicionarCampo(x.loteCampoId);
        }
      });

      this.tiposLote = allResp[1].data;
      this.tipoFoto = allResp[2].data.filter(x => x.visivelSite);
      this.local = allResp[3].data;

      this.leilao = allResp[4].data;

      this.categorias = allResp[5].data;
      this.categoriasFilhas = this.categorias.filter(categoria => categoria.categoriaPaiId === this.leilao.categoriaId);

      this.loteStatus = allResp[6].data;
    });

  }

  onSubmit() {
    if(this.formulario.value.judicial == false){
      this.removeControls()
    }

    if(!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()
      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    const formulario = this.formulario.value

    this.restangular.all('lote').post(formulario).subscribe(a => {
      this.notifierService.notify('success', 'Lote Criado com sucesso');
      this.router.navigate(['/lotes', this.leilaoId]);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao Criar o Lote!');
      });
  }

  fileChangeEvent(fileInput: any) {

    this.imageError = null;
    const arrayImagens = fileInput.target.files.length

    for(let i = 0; i < arrayImagens; i ++){

     this.arrayFotos.push(fileInput.target.files[i])
    }

    this.arrayFotos.forEach((x: any)=>{
      if (x ) {
        // Size Filter Bytes
        const max_size = 5242880;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (x.size > max_size) {
          this.imageError =
            'Maximum size allowed is 5Mb';
            this.arrayFotos = [];
          return false;
        }

        if (!_.includes(allowed_types, x.type)) {
          this.arrayFotos = [];
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
            this.arrayFotos = [];


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
              const arquivo =
              {
                url: imgBase64Path,
                nome: x.name,
                base64: imgBase64Path,
                tipo: x.type,
                tamanho: x.size
              }
              this.arrayFotos = [];
              this.atualizarFoto(arquivo, this.numeroAdcFoto)

            }
          };
        };

        reader.readAsDataURL(x);

      }

    })

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

  adicionarCampo(loteCampoId = null) {
    let campos = this.formulario.get('campos') as FormArray
    campos.push(this.formBuilder.group({
      loteCampoId: [loteCampoId, Validators.required],
      valor: ['', Validators.required],
      acao: "I"
    }))
  }

  atualizarFoto(obj, i) {
    let fotos = this.formulario.get('fotos') as FormArray

    if (i < 0) {
      fotos.insert(0, this.formBuilder.group({
        tipoFotoId: [null, Validators.required],
        loteFotoId: 0,
        arquivoId: 0,
        arquivo: obj,
        acao: 'I'
      }))
    } else {
      const valor = fotos.value[i]
      fotos.removeAt(i)
      fotos.insert(i, this.formBuilder.group({
        tipoFotoId: [valor.tipoFotoId, Validators.required],
        loteFotoId: valor.loteFotoId,
        arquivoId: valor.arquivoId,
        arquivo: obj,
        acao: 'I'
      }))
    }
  }

  alterarFoto(i) {
    this.numeroAdcFoto = i
    this.inputFotos.nativeElement.click()
  }

  atualizarAnexo(obj, i) {
    let anexos = this.formulario.get('anexos') as FormArray

    if (i < 0) {
      anexos.push(this.formBuilder.group({
        loteId: this.id,
        arquivoId: 0,
        nome: [null, Validators.required],
        arquivo: obj,
        acao: 'I'
      }))
    } else {
      const valor = anexos.value[i]
      anexos.removeAt(i)
      anexos.insert(i, this.formBuilder.group({
        loteId: this.id,
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

  deleteCampo(indexCampo: number) {
    let campos = this.formulario.controls['campos'] as FormArray
    let campo = campos.at(indexCampo) as FormGroup;
    if(campo.controls['acao'].value !== 'I') {
      campo.controls['acao'].setValue('D');
    }
    else {
      campos.removeAt(indexCampo)
    }

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


  deleteFoto(indexFoto: number) {
    let fotos = this.formulario.controls['fotos'] as FormArray;
    let foto = fotos.at(indexFoto) as FormGroup;
    if(foto.controls['acao'].value !== 'I') {
      foto.controls['acao'].setValue('D');
    }
    else {
      fotos.removeAt(indexFoto)
    }
  }

  removeControls(){
    let loteJudicial = this.formulario.get('loteJudicial') as FormGroup
    loteJudicial.removeControl('loteJudicialId');
    loteJudicial.removeControl('numProcesso');
    loteJudicial.removeControl('autor');
    loteJudicial.removeControl('reu');
    loteJudicial.removeControl('depositario');
    loteJudicial.removeControl('localDepositario');
    loteJudicial.removeControl('recursoPendente');
    loteJudicial.removeControl('anoProcesso');
    loteJudicial.removeControl('tipoAcao');
    loteJudicial.removeControl('recursos');
    loteJudicial.removeControl('comarca');
    loteJudicial.removeControl('natureza');
  }

  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  verificaValidList(campoArray, campo, i){
    var lista = this.formulario.get(campoArray) as FormArray;
    var item = lista.controls[i] as FormGroup;
    return !item.get(campo).valid;
  }

  aplicaCssErro(campo){
    return{ 'has-error': this.verificaValidTouched(campo) }
  }

  aplicaCssErroLista(campoArray, campo, i){
    return{ 'has-error': this.verificaValidList(campoArray, campo, i) }
  }

  getFormatacao(i) {
    var campos = this.formulario.get("campos") as FormArray;
    var campo = campos.controls[i] as FormGroup;
    var loteCampoId = campo.get("loteCampoId").value;
    var loteCampo = this.loteCampos.find(x => x.loteCampoId == loteCampoId);
    var formatacao = loteCampo && loteCampo.formatacao ? loteCampo.formatacao.split('').map(x => x === '#' ? new RegExp(x.replace('#', '\\w')) : x) : false;
    return formatacao;
  }

}
