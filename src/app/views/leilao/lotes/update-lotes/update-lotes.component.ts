import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
import 'moment/locale/pt-br';


@Component({
  selector: 'app-update-lotes',
  templateUrl: './update-lotes.component.html',
  styleUrls: ['./update-lotes.component.scss']
})
export class UpdateLotesComponent implements OnInit {

  @ViewChild('inputFotos') inputFotos: ElementRef;
  @ViewChild('inputAnexos') inputAnexos: ElementRef;
  isCollapsed = false;
  modalRef: BsModalRef;
  message = 'expanded';
  formulario: FormGroup
  id: any
  lote: any
  leilaoId;
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
  loteStatus;
  mostrarCampoJudicial: boolean = false

  //fotos
  fotosbase64: any
  fotosnome: any
  fotostamanho: any
  fotostipo: any
  numeroAdcFoto: number
  arrayFotos = [];
  //anexos
  anexosbase64: any
  anexosnome: any
  anexostamanho: any
  anexostipo: any
  numeroAdcAnexo: number

  //Valor Avaliação
  modalValorAvalicao: FormGroup
  tipos
  periodoReferencia
  marcas
  modelos
  ano
  valor

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
    private notifierService: NotifierService,
    private modalService: BsModalService,
  ) {
    this.modalValorAvalicao = this.formBuilder.group({
      tipo:[, Validators.required],
      referencia: [, Validators.required ],
      marcas: [, Validators.required],
      modelos: [, Validators.required ],
      ano:[Validators.required],
      combustivel:[],
      valor:[],
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    forkJoin([
      this.restangular.one("lotecampo").get().pipe(),
      this.restangular.one("tipolote").get().pipe(),
      this.restangular.one('tipofoto').get().pipe(),
      this.restangular.one('local').get().pipe(),
      this.restangular.one("lote", this.id).get().pipe(),
      this.restangular.one('categoria').get().pipe(),
      this.restangular.one('lotestatus').get().pipe(),
      this.restangular.one("tabelafipe/tipos").get().pipe()
    ]).subscribe((allResp: any[]) => {
      this.loteCampos = allResp[0].data;
      this.tiposLote = allResp[1].data
      this.tipoFoto = allResp[2].data.filter(x => x.visivelSite);;
      this.local = allResp[3].data;

      this.lote = allResp[4].data;
      this.leilaoId = this.lote.leilaoId;
      const fotos = this.lote.fotos.filter(x => x.tipoFoto.visivelSite)
      this.updateForm(this.lote, fotos);

      this.categorias = allResp[5].data;
      this.categoriasFilhas = this.categorias.filter(categoria => categoria.categoriaPaiId === this.lote.categoria.categoriaPaiId);

      this.loteStatus = allResp[6].data;
      this.tipos = allResp[7].data

      this.restangular.one("admin/leilao", this.leilaoId).get()
      .subscribe((resp) => this.leilao = resp.data)
    });
  }

  onSubmit() {
    if (this.formulario.value.judicial == false) {
      this.removeControls()
    }
    if (this.formulario.invalid) {
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios')
      return;
    }

    const formulario = this.formulario.value
    this.restangular.all('lote').customPUT(formulario, this.id).subscribe(a => {
      this.notifierService.notify('success', 'Lote Alterado com sucesso');
      this.router.navigate(['lotes', this.leilaoId])
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar o Lote!');
      });

  }

  fileChangeEvent(fileInput: any) {

    this.imageError = null;
    const arrayImagens = fileInput.target.files.length
    console.log(arrayImagens)
    for(let i = 0; i < arrayImagens; i ++){
     console.log(fileInput.target.files[i])
     this.arrayFotos.push(fileInput.target.files[i])
    }
    console.log(this.arrayFotos)
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

  adicionarCampo() {
    let campos = this.formulario.get('campos') as FormArray
    campos.push(this.formBuilder.group({
      loteCampoId: [null, Validators.required],
      valor: ['', Validators.required],
      acao: "I"
    }))
  }

  atualizarFoto(obj, i) {
    let fotos = this.formulario.get('fotos') as FormArray

    if (i < 0) {
      fotos.insert(0, this.formBuilder.group({
        tipoFotoId: ['', Validators.required],
        loteFotoId: 0,
        arquivoId: 0,
        arquivo: obj,
        acao: 'I'
      }))
    } else {
      const valor = fotos.value[i]
      fotos.removeAt(i)
      fotos.insert(i, this.formBuilder.group({
        tipoFotoId: valor.tipoFotoId,
        loteFotoId: valor.loteFotoId,
        arquivoId: valor.arquivoId,
        arquivo: obj,
        acao: valor.acao !== 'I' ? 'A' : 'I'
      }))
    }
  }

  alterarFoto(i) {
    // console.log(i)
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

      console.log(anexos)
    }
  }

  alterarAnexo(i) {
    this.numeroAdcAnexo = i
    this.inputAnexos.nativeElement.click()
  }

  updateForm(dados, fotos) {
    this.formulario = this.formBuilder.group({
      loteId: [dados.loteId, Validators.required],
      descricao: [dados.descricao, Validators.required],
      descricaoDetalhada: [dados.descricaoDetalhada, Validators.required],
      dataEncerramento: [dados.dataEncerramento],
      itemLote: [dados.itemLote],
      numeroLote: [dados.numeroLote, Validators.required],
      leilaoId: [dados.leilaoId, Validators.required],
      statusId: [dados.statusId, Validators.required],
      categoriaId: [dados.categoriaId, Validators.required],
      localId: [dados.localId, Validators.required],
      valorLanceInicial: [dados.valorLanceInicial, Validators.required],
      valorMinimoVenda: [dados.valorMinimoVenda, Validators.required],
      valorAvaliacao: [dados.valorAvaliacao, Validators.required],
      valorIncremento: [dados.valorIncremento, Validators.required],
      valorTaxaAdministrativa: [dados.valorTaxaAdministrativa, Validators.required],
      valorOutrasTaxas: [dados.valorOutrasTaxas],
      observacao: [dados.observacao],
      judicial: [dados.judicial],
      loteJudicial: this.formBuilder.group(dados.loteJudicial == null ? this.criarCampoJudicial() : dados.loteJudicial),
      loteJudicialId: [dados.loteJudicialId],
      tipoLoteId: [dados.tipoLoteId, Validators.required],
      campos: this.formBuilder.array(dados.campos ? dados.campos.map(x => this.formBuilder.group({ ...x, acao: '' })) : [], Validators.required),
      anexos: this.formBuilder.array(dados.anexos ? dados.anexos.map(x => this.formBuilder.group({ ...x, acao: '' })) : []),
      fotos: this.formBuilder.array(fotos ? fotos.map(x => this.formBuilder.group({ ...x, acao: '' })) : [], Validators.required),
    })
    setTimeout(() => { this.mostrarCampoJudicial = true }, 3000)
  }

  filterList(campo: string) {
    const fotos = this.formulario.get(campo) as FormArray;
    return fotos.controls.filter(x => (x as FormGroup).controls['acao'].value !== 'D');
  }

  deleteCampo(indexCampo: number) {
    let campos = this.formulario.controls['campos'] as FormArray
    let campo = campos.at(indexCampo) as FormGroup;
    if (campo.controls['acao'].value !== 'I') {
      campo.controls['acao'].setValue('D');
    }
    else {
      campos.removeAt(indexCampo)
    }

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


  deleteFoto(indexFoto: number) {
    let fotos = this.formulario.controls['fotos'] as FormArray;
    let foto = fotos.at(indexFoto) as FormGroup;
    if (foto.controls['acao'].value !== 'I') {
      foto.controls['acao'].setValue('D');
    }
    else {
      fotos.removeAt(indexFoto)
    }
  }

  criarCampoJudicial() {


    return {
      loteJudicialId: 0,
      numProcesso: null,
      autor: null,
      reu: null,
      depositario: null,
      localDepositario: null,
      recursoPendente: false,
      anoProcesso: null,
      tipoAcao: null,
      recursos: false,
      comarca: null,
      natureza: null
    }
  }
  removeControls() {
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  collapsed(): void {
    this.message = 'collapsed';
  }

  collapses(): void {
    this.message = 'collapses';
  }

  expanded(): void {
    this.message = 'expanded';
  }

  expands(): void {
    this.message = 'expands';
  }

  buscarReferencias(){
    const tipo = this.modalValorAvalicao.value.tipo
    this.restangular.one(`tabelafipe/referencias`,).get({tipo:tipo}).subscribe((response) => {
       console.log(moment(response.data[0]).format("MMMM Do YYYY") )
       const referencia = moment(response.data[0]).format("MMMM/YYYY")
       this.periodoReferencia = response.data[0]
       this.modalValorAvalicao.patchValue({
        referencia: referencia
       })

    });
  }
  buscarMarcas(){
    const tipo = this.modalValorAvalicao.value.tipo
    const referencia = this.periodoReferencia
    this.restangular.one(`tabelafipe/marcas`,).get( {referencia:referencia, tipo:tipo}).subscribe((response) => {
       this.marcas = response.data
    });
  }
  buscarModelos(){
    const tipo = this.modalValorAvalicao.value.tipo
    const referencia = this.periodoReferencia
    const marca = this.modalValorAvalicao.value.marcas
    this.restangular.one(`tabelafipe/modelos`,).get( {referencia:referencia, tipo:tipo, marca:marca}).subscribe((response) => {
      this.modelos = response.data
   });
  }
  buscarAno(){
    const tipo = this.modalValorAvalicao.value.tipo
    const referencia = this.periodoReferencia
    const marca = this.modalValorAvalicao.value.marcas
    const modelo = this.modalValorAvalicao.value.modelos
    this.restangular.one(`tabelafipe/anos`,).get( {referencia:referencia, tipo:tipo, marca:marca, modelo:modelo}).subscribe((response) => {
      this.ano = response.data
   });
  }
  buscarValor(){
    const anoString = this.modalValorAvalicao.value.ano.substring(0, 4)
    const anoFormatado = parseInt(anoString)
    const combustivel = this.modalValorAvalicao.value.ano.substring(7, 15)
    const automovel = {
      loteId: this.formulario.value.loteId,
      referencia:this.periodoReferencia,
      tipo:this.modalValorAvalicao.value.tipo,
      marca:this.modalValorAvalicao.value.marcas,
      modelo:this.modalValorAvalicao.value.modelos,
      ano:anoFormatado,
      combustivel: combustivel

    }
    console.log(automovel)
    this.restangular.all('tabelafipe/consultar').post(automovel).subscribe(a => {
      this.valor = a.data.valor
      this.modalValorAvalicao.patchValue({
        valor:this.valor
       })
    })
  }

  consultaFipe(){
    this.formulario.patchValue({
      valorAvaliacao:this.valor
     })
  }

  verificaValidTouched(campo){
    this.formulario.controls [campo].valueChanges.subscribe ((val) => {
      if (String (val) === "NaN") {
        this.formulario.controls [campo].setValue(null);
      }
    });
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
