import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
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
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-update-lotes',
  templateUrl: './update-lotes.component.html',
  styleUrls: ['./update-lotes.component.scss'],
})
export class UpdateLotesComponent implements OnInit {
  @ViewChild('inputFotos') inputFotos: ElementRef;
  @ViewChild('inputAnexos') inputAnexos: ElementRef;
  @ViewChild('btnFaixa') btnFaixa!: ElementRef;
  @ViewChild('btnFaixaIncremento') btnFaixaIncremento!: ElementRef;

  loading = false;
  modalRef: BsModalRef;
  formulario: FormGroup;
  id: any;
  lote: any;
  leilaoId;
  leilao: any;
  tiposLote: any;
  loteCampos: any;
  categorias: any;
  categoriaPaiId: any;
  categoriasFilhas: any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  tipoFoto: any;
  fileToUpload: File | null = null;
  loteStatus;
  taxaFaixa = false;
  faixasIncremento = false;

  //fotos
  fotosbase64: any;
  fotosnome: any;
  fotostamanho: any;
  fotostipo: any;
  numeroAdcFoto: number;
  arrayFotos = [];
  //anexos
  anexosbase64: any;
  anexosnome: any;
  anexostamanho: any;
  anexostipo: any;
  numeroAdcAnexo: number;

  //judicial
  juizes: any[];
  escrivaes: any[];
  autores: any[];
  reus: any[];
  fieisDepositarios: any[];
  partes: any[];
  credores: any[];
  juizos: any[];
  varas: any[];

  //Valor Avaliação
  modalValorAvalicao: FormGroup;
  tipos;
  periodoReferencia;
  marcas;
  modelos;
  ano;
  valor;

  local: any;
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
    placeholder: 'Descrição detalhada...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'roboto', name: 'Roboto' },
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  juizoId: number = 0;
  varaId: number = 0;

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private modalService: BsModalService,
    private renderer: Renderer2
  ) {
    this.modalValorAvalicao = this.formBuilder.group({
      tipo: [, Validators.required],
      referencia: [, Validators.required],
      marcas: [, Validators.required],
      modelos: [, Validators.required],
      ano: [Validators.required],
      combustivel: [],
      valor: [],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    forkJoin([
      this.restangular.one('lotecampo').get().pipe(),
      this.restangular.one('tipolote').get().pipe(),
      this.restangular.one('tipofoto').get().pipe(),
      this.restangular.one('local').get().pipe(),
      this.restangular.one('lote', this.id).get().pipe(),
      this.restangular.one('categoria').get().pipe(),
      this.restangular.one('lotestatus').get().pipe(),
      this.restangular.one('tabelafipe/tipos').get().pipe(),
      this.restangular.one('judicial/autor').get(),
      //this.restangular.one('judicial/juiz').get(),
      //this.restangular.one('judicial/escrivao').get(),
      this.restangular.one('judicial/reu').get(),
      this.restangular.one('judicial/fielDepositario').get(),
      this.restangular.one('judicial/parte').get(),
      this.restangular.one('judicial/credor').get(),
      this.restangular.one('judicial/juizo').get(),
      //this.restangular.one('judicial/vara').get(),
    ]).subscribe((allResp: any[]) => {
      this.local = allResp[3].data;

      this.lote = allResp[4].data;
      this.leilaoId = this.lote.leilaoId;
      const fotos = this.lote.fotos.filter((x) => x.tipoFoto.visivelSite);

      this.updateForm(this.lote, fotos);

      this.categorias = allResp[5].data;

      this.loteStatus = allResp[6].data;
      this.tipos = allResp[7].data;

      this.restangular
        .one('admin/leilao', this.leilaoId)
        .get()
        .subscribe((resp) => {
          this.leilao = resp.data;
          this.categoriasFilhas = this.categorias.filter(
            (categoria) => categoria.categoriaPaiId === this.leilao.categoriaId
          );
          this.loteCampos = allResp[0].data.filter(
            (x) => x.categoriaId === this.leilao.categoriaId
          );
          this.tiposLote = allResp[1].data.filter(
            (x) => x.categoriaId === this.leilao.categoriaId
          );

          // if (this.taxaFaixa) {
          //   this.formulario.get("valorTaxaAdministrativa").disable();
          //   this.btnFaixa.nativeElement.disabled = true;
          // } else {
          //   this.formulario.get("valorTaxaAdministrativa").enable();
          //   this.btnFaixa.nativeElement.disabled = false;
          // }

          this.autores = allResp[8].data;
          //this.juizes = allResp[9].data;
          //this.escrivaes = allResp[10].data;
          this.reus = allResp[9].data;
          this.fieisDepositarios = allResp[10].data;
          this.partes = allResp[11].data;
          this.credores = allResp[12].data;
          this.juizos = allResp[13].data;
          //this.varas = allResp[16].data;

          this.formulario
            .get('judicial')
            .patchValue(this.leilao.tipoLeilaoId == 1);
        });
    });
  }

  onSubmit() {
    if (this.formulario.value.judicial == false) {
      this.removeControls();
    }
    if (this.formulario.invalid) {
      this.notifierService.notify(
        'error',
        'Preencha todos os campos obrigatórios'
      );
      return;
    }

    const formulario = this.formulario.value;
    this.restangular
      .all('lote')
      .customPUT(formulario, this.id)
      .subscribe(
        (a) => {
          this.notifierService.notify('success', 'Lote Alterado com sucesso');
          this.router.navigate(['lotes', this.leilaoId]);
        },
        (error) => {
          this.notifierService.notify('error', 'Erro ao atualizar o Lote!');
        }
      );
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    const arrayImagens = fileInput.target.files.length;
    for (let i = 0; i < arrayImagens; i++) {
      this.arrayFotos.push(fileInput.target.files[i]);
    }
    this.arrayFotos.forEach((x: any) => {
      if (x) {
        // Size Filter Bytes
        const max_size = 5242880;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (x.size > max_size) {
          this.imageError = 'Maximum size allowed is 5Mb';
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
          image.onload = (rs) => {
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
              const arquivo = {
                url: imgBase64Path,
                nome: x.name,
                base64: imgBase64Path,
                tipo: x.type,
                tamanho: x.size,
              };
              this.arrayFotos = [];
              this.atualizarFoto(arquivo, this.numeroAdcFoto);
            }
          };
        };

        reader.readAsDataURL(x);
      }
    });
  }

  anexoChangeEvent(anexoInput: FileList) {
    this.fileToUpload = anexoInput.item(0);
    this.fileToUpload.name;
    this.fileToUpload.size;
    this.fileToUpload.type;
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      this.anexosbase64 = reader.result;
      const arquivo = {
        arquivoId: 0,
        nome: this.fileToUpload.name,
        base64: this.anexosbase64,
        tipo: this.fileToUpload.type,
        tamanho: this.fileToUpload.size,
        dataCadastro: moment().utc().toISOString(),
      };

      this.atualizarAnexo(arquivo, this.numeroAdcAnexo);
    };
  }

  adicionarCampo() {
    const campos = this.formulario.get('campos') as FormArray;
    campos.push(
      this.formBuilder.group({
        loteCampoId: [null, Validators.required],
        valor: ['', Validators.required],
        acao: 'I',
      })
    );
  }

  atualizarFoto(obj, i) {
    const fotos = this.formulario.get('fotos') as FormArray;

    if (i < 0) {
      fotos.insert(
        0,
        this.formBuilder.group({
          tipoFotoId: ['', Validators.required],
          loteFotoId: 0,
          arquivoId: 0,
          arquivo: obj,
          acao: 'I',
        })
      );
    } else {
      const valor = fotos.value[i];
      fotos.removeAt(i);
      fotos.insert(
        i,
        this.formBuilder.group({
          tipoFotoId: valor.tipoFotoId,
          loteFotoId: valor.loteFotoId,
          arquivoId: valor.arquivoId,
          arquivo: obj,
          acao: valor.acao !== 'I' ? 'A' : 'I',
        })
      );
    }
  }

  alterarFoto(i) {
    if (this.formulario.value.categoriaId == null) {
      this.notifierService.notify(
        'error',
        'Selecione uma categoria para adicionar uma foto'
      );
      this.formulario.controls['categoriaId'].markAsTouched();
      return false;
    }

    this.numeroAdcFoto = i;
    this.inputFotos.nativeElement.click();
  }

  carregarTipoFoto() {
    this.restangular
      .one('tipofoto/categoria/' + this.formulario.value.categoriaId)
      .get()
      .subscribe(
        (allResp) => {
          //console.log(allResp);
          this.tipoFoto = allResp.data;
        },
        (error) => {
          //console.log(error);
        }
      );
  }

  atualizarAnexo(obj, i) {
    const anexos = this.formulario.get('anexos') as FormArray;

    if (i < 0) {
      anexos.push(
        this.formBuilder.group({
          loteId: this.id,
          arquivoId: 0,
          nome: [null, Validators.required],
          arquivo: obj,
          acao: 'I',
        })
      );
    } else {
      const valor = anexos.value[i];
      anexos.removeAt(i);
      anexos.insert(
        i,
        this.formBuilder.group({
          loteId: this.id,
          arquivoId: 0,
          nome: valor.nome,
          arquivo: obj,
          acao: 'A',
        })
      );
    }
  }

  alterarAnexo(i) {
    this.numeroAdcAnexo = i;
    this.inputAnexos.nativeElement.click();
  }

  preencherCampoJudicial(dados) {
    const juizes = dados.loteJudicial.juizes;
    const escrivaes = dados.loteJudicial.escrivaes;
    const autores = dados.loteJudicial.autores;
    const reus = dados.loteJudicial.reus;
    const fieisDepositarios = dados.loteJudicial.fieisDepositarios;
    const partes = dados.loteJudicial.partes;
    const credores = dados.loteJudicial.credores;

    this.juizoId = dados.loteJudicial.juizoId;
    this.varaId = dados.loteJudicial.varaId;

    if (this.juizoId && this.juizoId > 0) {
      this.carregarVaras(this.juizoId).subscribe((resp: any) => {
        this.varas = resp.data;
        if (this.varaId && this.varaId > 0) {
          this.carregarJuizesEscrivaes(this.varaId);
        }
      });
    }

    return {
      loteJudicialId: [dados.loteJudicial.loteJudicialId],
      numProcesso: [dados.loteJudicial.numProcesso],
      localDepositario: [dados.loteJudicial.localDepositario],
      anoProcesso: [dados.loteJudicial.anoProcesso],
      tipoAcao: [dados.loteJudicial.tipoAcao],
      comarca: [dados.loteJudicial.comarca],
      natureza: [dados.loteJudicial.natureza],
      juizoId: [dados.loteJudicial.juizoId],
      varaId: [dados.loteJudicial.varaId],
      juizes: [juizes ? juizes.map((x) => x.juizId) : []],
      escrivaes: [escrivaes ? escrivaes.map((x) => x.escrivaoId) : []],
      autores: [autores ? autores.map((x) => x.autorId) : []],
      reus: [reus ? reus.map((x) => x.reuId) : []],
      fieisDepositarios: [
        fieisDepositarios
          ? fieisDepositarios.map((x) => x.fielDepositarioId)
          : [],
      ],
      partes: [partes ? partes.map((x) => x.parteId) : []],
      credores: [credores ? credores.map((x) => x.credorId) : []],
    };
  }

  updateForm(dados, fotos) {
    this.formulario = this.formBuilder.group({
      loteId: [dados.loteId, Validators.required],
      descricao: [dados.descricao, Validators.required],
      descricaoDetalhada: [dados.descricaoDetalhada],
      itemLote: [dados.itemLote],
      numeroLote: [dados.numeroLote, Validators.required],
      leilaoId: [dados.leilaoId, Validators.required],
      statusId: [dados.statusId, Validators.required],
      categoriaId: [dados.categoriaId, Validators.required],
      localId: [dados.localId],
      valorLanceInicial: [dados.valorLanceInicial, Validators.required],
      valorMinimoVenda: [dados.valorMinimoVenda, Validators.required],
      valorAvaliacao: [dados.valorAvaliacao, Validators.required],
      valorIncremento: [dados.valorIncremento, Validators.required],
      valorTaxaAdministrativa: [
        dados.valorTaxaAdministrativa,
        Validators.required,
      ],
      valorOutrasTaxas: [dados.valorOutrasTaxas],
      observacao: [dados.observacao],
      judicial: [dados.judicial],
      loteJudicial: this.formBuilder.group(
        dados.loteJudicial == null
          ? this.criarCampoJudicial()
          : this.preencherCampoJudicial(dados)
      ),
      loteJudicialId: [dados.loteJudicialId],
      tipoLoteId: [dados.tipoLoteId],
      campos: this.formBuilder.array(
        dados.campos
          ? dados.campos.map((x) => this.formBuilder.group({ ...x, acao: '' }))
          : [],
        Validators.required
      ),
      anexos: this.formBuilder.array(
        dados.anexos
          ? dados.anexos.map((x) => this.formBuilder.group({ ...x, acao: '' }))
          : []
      ),
      fotos: this.formBuilder.array(
        fotos
          ? fotos.map((x) => this.formBuilder.group({ ...x, acao: '' }))
          : [],
        Validators.required
      ),
      tipoTaxa: [dados.tipoTaxa],
      // faixas: this.formBuilder.array(dados.faixas ? dados.faixas.map(x => this.formBuilder.group({ ...x })) : []),
      pracasValorLanceInicial: this.formBuilder.array(
        dados.pracasValorLanceInicial
          ? dados.pracasValorLanceInicial.map((x) =>
              this.formBuilder.group({ ...x })
            )
          : []
      ),
      // faixasIncremento: this.formBuilder.array(dados.faixasIncremento ? dados.faixasIncremento.map(x => this.formBuilder.group({ ...x })) : []),
    });

    if (dados.judicial) {
      this.formulario.get('valorLanceInicial').disable();
      this.formulario.get('valorLanceInicial').setValidators(null);
      this.formulario.get('valorLanceInicial').updateValueAndValidity();
    }

    // if(this.lote.faixas.length > 0){
    //   this.taxaFaixa = true
    // }

    // if(this.lote.faixasIncremento.length > 0){
    //   this.faixasIncremento = true
    // }

    //setTimeout(() => { this.mostrarCampoJudicial = true }, 3000)

    this.carregarTipoFoto();

    this.formulario
      .get('loteJudicial')
      .get('juizoId')
      .valueChanges.subscribe((value) => {
        if (isNullOrUndefined(value)) {
          this.formulario.get('loteJudicial').get('varaId').reset();
          this.juizoId = 0;
          return;
        }
        this.juizoId = value;

        this.formulario.get('loteJudicial').get('varaId').reset();

        this.carregarVaras(value).subscribe((resp: any) => {
          this.varas = resp.data;
        });
      });

    this.formulario
      .get('loteJudicial')
      .get('varaId')
      .valueChanges.subscribe((value) => {
        if (isNullOrUndefined(value)) {
          this.formulario.get('loteJudicial').get('juizes').patchValue([]);
          this.formulario.get('loteJudicial').get('escrivaes').patchValue([]);

          this.varaId = 0;
          return;
        }

        this.varaId = value;

        this.formulario.get('loteJudicial').get('juizes').patchValue([]);
        this.formulario.get('loteJudicial').get('escrivaes').patchValue([]);
        this.carregarJuizesEscrivaes(value);
        //console.log(this.formulario);
      });
  }

  carregarVaras(juizoId: number) {
    return this.restangular.one('judicial/vara').get({ juizoId: juizoId });
  }

  carregarJuizesEscrivaes(varaId: number) {
    const vara = this.varas.find((x) => x.varaId == varaId);
    this.juizes = vara.juizes ? vara.juizes.map((x) => x.juiz) : [];
    this.escrivaes = vara.escrivaes
      ? vara.escrivaes.map((x) => x.escrivao)
      : [];
  }

  filterList(campo: string) {
    const fotos = this.formulario.get(campo) as FormArray;
    return fotos.controls.filter(
      (x) => (x as FormGroup).controls['acao'].value !== 'D'
    );
  }

  deleteCampo(indexCampo: number) {
    const campos = this.formulario.controls['campos'] as FormArray;
    const campo = campos.at(indexCampo) as FormGroup;
    if (campo.controls['acao'].value !== 'I') {
      campo.controls['acao'].setValue('D');
    } else {
      campos.removeAt(indexCampo);
    }
  }

  deleteAnexo(indexAnexo: number) {
    const anexos = this.formulario.controls['anexos'] as FormArray;
    const anexo = anexos.at(indexAnexo) as FormGroup;
    if (anexo.controls['acao'].value !== 'I') {
      anexo.controls['acao'].setValue('D');
    } else {
      anexos.removeAt(indexAnexo);
    }
  }

  deleteFoto(indexFoto: number) {
    const fotos = this.formulario.controls['fotos'] as FormArray;
    const foto = fotos.at(indexFoto) as FormGroup;
    if (foto.controls['acao'].value !== 'I') {
      foto.controls['acao'].setValue('D');
    } else {
      fotos.removeAt(indexFoto);
    }
  }

  criarCampoJudicial() {
    return {
      loteJudicialId: [0],
      numProcesso: [null],
      localDepositario: [null],
      anoProcesso: [null],
      tipoAcao: [null],
      comarca: [null],
      natureza: [null],
      juizoId: [null],
      varaId: [null],
      juizes: [[]],
      escrivaes: [[]],
      autores: [[]],
      reus: [[]],
      fieisDepositarios: [[]],
      partes: [[]],
      credores: [[]],
    };
  }

  removeControls() {
    const loteJudicial = this.formulario.get('loteJudicial') as FormGroup;
    loteJudicial.removeControl('loteJudicialId');
    loteJudicial.removeControl('numProcesso');
    loteJudicial.removeControl('localDepositario');
    loteJudicial.removeControl('anoProcesso');
    loteJudicial.removeControl('tipoAcao');
    loteJudicial.removeControl('comarca');
    loteJudicial.removeControl('natureza');
    loteJudicial.removeControl('juizoId');
    loteJudicial.removeControl('varaId');
    loteJudicial.removeControl('juizes');
    loteJudicial.removeControl('escrivaes');
    loteJudicial.removeControl('autores');
    loteJudicial.removeControl('reus');
    loteJudicial.removeControl('fieisDepositarios');
    loteJudicial.removeControl('partes');
    loteJudicial.removeControl('credores');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  buscarReferencias() {
    const tipo = this.modalValorAvalicao.value.tipo;
    this.restangular
      .one(`tabelafipe/referencias`)
      .get({ tipo: tipo })
      .subscribe((response) => {
        const referencia = moment(response.data[0]).format('MMMM/YYYY');
        this.periodoReferencia = response.data[0];
        this.modalValorAvalicao.patchValue({
          referencia: referencia,
        });
      });
  }

  buscarMarcas() {
    const tipo = this.modalValorAvalicao.value.tipo;
    const referencia = this.periodoReferencia;
    this.restangular
      .one(`tabelafipe/marcas`)
      .get({ referencia: referencia, tipo: tipo })
      .subscribe((response) => {
        this.marcas = response.data;
      });
  }

  buscarModelos() {
    const tipo = this.modalValorAvalicao.value.tipo;
    const referencia = this.periodoReferencia;
    const marca = this.modalValorAvalicao.value.marcas;
    this.restangular
      .one(`tabelafipe/modelos`)
      .get({ referencia: referencia, tipo: tipo, marca: marca })
      .subscribe((response) => {
        this.modelos = response.data;
      });
  }

  buscarAno() {
    const tipo = this.modalValorAvalicao.value.tipo;
    const referencia = this.periodoReferencia;
    const marca = this.modalValorAvalicao.value.marcas;
    const modelo = this.modalValorAvalicao.value.modelos;
    this.restangular
      .one(`tabelafipe/anos`)
      .get({ referencia: referencia, tipo: tipo, marca: marca, modelo: modelo })
      .subscribe((response) => {
        this.ano = response.data;
      });
  }

  buscarValor() {
    const anoString = this.modalValorAvalicao.value.ano.substring(0, 4);
    const anoFormatado = parseInt(anoString);
    const combustivel = this.modalValorAvalicao.value.ano.substring(7, 15);
    const automovel = {
      loteId: this.formulario.value.loteId,
      referencia: this.periodoReferencia,
      tipo: this.modalValorAvalicao.value.tipo,
      marca: this.modalValorAvalicao.value.marcas,
      modelo: this.modalValorAvalicao.value.modelos,
      ano: anoFormatado,
      combustivel: combustivel,
    };
    this.restangular
      .all('tabelafipe/consultar')
      .post(automovel)
      .subscribe((a) => {
        this.valor = a.data.valor;
        this.modalValorAvalicao.patchValue({
          valor: this.valor,
        });
      });
  }

  consultaFipe() {
    this.formulario.patchValue({
      valorAvaliacao: this.valor,
    });
  }

  verificaValidTouched(campo) {
    this.formulario.controls[campo].valueChanges.subscribe((val) => {
      if (String(val) === 'NaN') {
        this.formulario.controls[campo].setValue(null);
      }
    });
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  verificaValidList(campoArray, campo, i) {
    const lista = this.formulario.get(campoArray) as FormArray;
    const item = lista.controls[i] as FormGroup;
    return !item.get(campo).valid;
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) };
  }

  aplicaCssErroLista(campoArray, campo, i) {
    return { 'has-error': this.verificaValidList(campoArray, campo, i) };
  }

  getFormatacao(i) {
    const campos = this.formulario.get('campos') as FormArray;
    const campo = campos.controls[i] as FormGroup;
    const loteCampoId = campo.get('loteCampoId').value;
    const loteCampo = this.loteCampos.find((x) => x.loteCampoId == loteCampoId);
    const formatacao =
      loteCampo && loteCampo.formatacao
        ? loteCampo.formatacao
            .split('')
            .map((x) => (x === '#' ? new RegExp(x.replace('#', '\\w')) : x))
        : false;
    return formatacao;
  }

  onValueChangeFaixa(event, campo, i) {
    const faixasForm = this.formulario.get('faixas') as FormArray;
    const faixa = faixasForm.at(i) as FormGroup;
    faixa.controls[campo].markAsTouched();
    faixa.controls[campo].setValue(event);
  }

  selecionarTipoTaxa(tipo: string) {
    this.formulario.get('tipoTaxa').setValue(tipo);
  }

  adicionarFaixa() {
    const faixas = this.formulario.get('faixas') as FormArray;
    faixas.push(
      this.formBuilder.group({
        faixaInicial: [null, Validators.required],
        faixaFinal: [null, Validators.required],
        valorTaxaAdministrativa: [null, Validators.required],
      })
    );
  }

  deleteFaixa(index: number) {
    const faixas = this.formulario.controls['faixas'] as FormArray;
    faixas.removeAt(index);
  }

  changeCheckBoxFaixa() {
    if (this.taxaFaixa) {
      this.formulario.get('valorTaxaAdministrativa').enable();
      this.btnFaixa.nativeElement.disabled = false;
    } else {
      this.formulario.get('valorTaxaAdministrativa').disable();
      this.btnFaixa.nativeElement.disabled = true;
    }

    this.taxaFaixa = !this.taxaFaixa;

    //console.log(this.btnFaixa);
  }

  onValueChangeFaixaIncremento(event, campo, i) {
    const faixasIncrementoForm = this.formulario.get(
      'faixasIncremento'
    ) as FormArray;
    const faixaIncremento = faixasIncrementoForm.at(i) as FormGroup;
    faixaIncremento.controls[campo].markAsTouched();
    faixaIncremento.controls[campo].setValue(event);
  }

  adicionarFaixaIncremento() {
    const faixasIncremento = this.formulario.get(
      'faixasIncremento'
    ) as FormArray;
    faixasIncremento.push(
      this.formBuilder.group({
        faixaInicial: [null, Validators.required],
        faixaFinal: [null, Validators.required],
        valorIncremento: [null, Validators.required],
      })
    );
  }

  deleteFaixaIncremento(index: number) {
    const faixasIncremento = this.formulario.controls[
      'faixasIncremento'
    ] as FormArray;
    faixasIncremento.removeAt(index);
  }

  changeCheckBoxFaixaIncremento() {
    if (this.faixasIncremento) {
      this.formulario.get('valorIncremento').enable();
      this.btnFaixaIncremento.nativeElement.disabled = false;
    } else {
      this.formulario.get('valorIncremento').disable();
      this.btnFaixaIncremento.nativeElement.disabled = true;
    }

    this.faixasIncremento = !this.faixasIncremento;
  }
}
