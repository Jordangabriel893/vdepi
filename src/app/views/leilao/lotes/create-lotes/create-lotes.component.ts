import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { forkJoin } from 'rxjs';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-lotes',
  templateUrl: './create-lotes.component.html',
  styleUrls: ['./create-lotes.component.scss'],
})
export class CreateLotesComponent implements OnInit {
  @ViewChild('inputFotos') inputFotos: ElementRef;
  @ViewChild('inputAnexos') inputAnexos: ElementRef;
  @ViewChild('btnFaixa') btnFaixa!: ElementRef;
  @ViewChild('btnFaixaIncremento') btnFaixaIncremento!: ElementRef;

  loading: boolean = false;
  formulario: FormGroup;
  id: any;
  leilaoId;
  loteStatus;
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
  codigoComum = true;
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
  arrayAnexos = [];

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
    sanitize: true,
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
      loteId: [0],
      descricao: [null, Validators.required],
      descricaoDetalhada: [null],
      itemLote: [],
      numeroLote: [null, Validators.required],
      leilaoId: [this.id],
      statusId: [null, Validators.required],
      categoriaId: [null, Validators.required],
      localId: [null],
      valorLanceInicial: [null, Validators.required],
      valorMinimoVenda: [null, Validators.required],
      valorAvaliacao: [null, Validators.required],
      valorIncremento: [null, Validators.required],
      valorTaxaAdministrativa: [{ value: null, disabled: this.taxaFaixa }],
      tipoTaxa: ['V'],
      valorOutrasTaxas: [0],
      observacao: [],
      judicial: [false],
      loteJudicial: this.formBuilder.group({
        loteJudicialId: [0],
        numProcesso: [null],
        localDepositario: [null],
        anoProcesso: [null],
        tipoAcao: [null],
        comarca: [null],
        natureza: [null],
        juizoId: [null],
        varaId: [null],
        juizes: [null],
        escrivaes: [null],
        autores: [null],
        reus: [null],
        fieisDepositarios: [null],
        partes: [null],
        credores: [null],
      }),
      loteJudicialId: [null],
      tipoLoteId: [null],
      campos: this.formBuilder.array([], Validators.required),
      anexos: this.formBuilder.array([]),
      fotos: this.formBuilder.array([], Validators.required),
      pracasValorLanceInicial: this.formBuilder.array([]),
      // faixas: this.formBuilder.array([]),
      // pracas: this.formBuilder.array([]),
      // faixasIncremento: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    forkJoin([
      this.restangular.one('lotecampo').get().pipe(),
      this.restangular.one('tipolote').get().pipe(),
      this.restangular.one('tipofoto').get().pipe(),
      this.restangular.one('local').get().pipe(),
      this.restangular.one('categoria').get().pipe(),
      this.restangular.one('lotestatus').get().pipe(),
      this.restangular.one('admin/leilao', this.id).get(),
      this.restangular.one('judicial/autor').get(),
      this.restangular.one('judicial/juiz').get(),
      this.restangular.one('judicial/escrivao').get(),
      this.restangular.one('judicial/reu').get(),
      this.restangular.one('judicial/fielDepositario').get(),
      this.restangular.one('judicial/parte').get(),
      this.restangular.one('judicial/credor').get(),
      this.restangular.one('judicial/juizo').get(),
      this.restangular.one('judicial/vara').get(),
    ]).subscribe((allResp: any[]) => {
      this.local = allResp[3].data;
      this.categorias = allResp[4].data;

      this.loteStatus = allResp[5].data;
      this.leilao = allResp[6].data;
      this.categoriasFilhas = this.categorias.filter(
        (categoria) => categoria.categoriaPaiId === this.leilao.categoriaId
      );
      this.loteCampos = allResp[0].data.filter(
        (x) => x.categoriaId === this.leilao.categoriaId
      );
      this.tiposLote = allResp[1].data.filter(
        (x) => x.categoriaId === this.leilao.categoriaId
      );
      this.loteCampos.forEach((x) => {
        if (x.destaqueSite) {
          this.adicionarCampo(x.loteCampoId);
        }
      });

      if (this.leilao.tipoLeilaoId == 1) {
        this.formulario.get('valorLanceInicial').disable();
        this.formulario.get('valorLanceInicial').setValidators(null);
        this.formulario.get('valorLanceInicial').updateValueAndValidity();
        this.formulario.get('judicial').patchValue(true);
      }

      this.leilao.pracas.forEach((praca) =>
        (<FormArray>this.formulario.get('pracasValorLanceInicial')).push(
          this.formBuilder.group({
            lotePracaValorId: [0],
            pracaId: [praca.pracaLeilaoId],
            numeroPraca: [praca.numeroPraca],
            valorLanceInicial: [null, Validators.required],
          })
        )
      );

      this.autores = allResp[7].data;
      this.juizes = allResp[8].data;
      this.escrivaes = allResp[9].data;
      this.reus = allResp[10].data;
      this.fieisDepositarios = allResp[11].data;
      this.partes = allResp[12].data;
      this.credores = allResp[13].data;
      this.juizos = allResp[14].data;
      this.varas = allResp[15].data;
    });
  }

  onSubmit() {
    if (this.formulario.value.judicial == false) {
      this.removeControls();
    }

    if (!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      });
      this.notifierService.notify(
        'error',
        'Preencha todos os campos obrigatórios'
      );
      return false;
    }

    const formulario = this.formulario.value;

    this.restangular
      .all('lote')
      .post(formulario)
      .subscribe(
        (a) => {
          this.notifierService.notify('success', 'Lote Criado com sucesso');
          this.router.navigate(['/lotes', this.leilaoId]);
        },
        (error) => {
          this.notifierService.notify('error', 'Erro ao Criar o Lote!');
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

  adicionarCampo(loteCampoId = null) {
    const campos = this.formulario.get('campos') as FormArray;
    campos.push(
      this.formBuilder.group({
        loteCampoId: [loteCampoId, Validators.required],
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
          tipoFotoId: [null, Validators.required],
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
          tipoFotoId: [valor.tipoFotoId, Validators.required],
          loteFotoId: valor.loteFotoId,
          arquivoId: valor.arquivoId,
          arquivo: obj,
          acao: 'I',
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
          this.tipoFoto = allResp.data;
        },
        (error) => {
          console.log(error);
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

  verificaValidTouched(campo) {
    if (!this.formulario.get(campo).disabled) {
      return (
        !this.formulario.get(campo).valid && this.formulario.get(campo).touched
      );
    }
    return false;
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

  // onValueChangeFaixa(event, campo, i) {
  //   let faixasForm = this.formulario.get("faixas") as FormArray;
  //   let faixa = faixasForm.at(i) as FormGroup;
  //   faixa.controls[campo].markAsTouched();
  //   faixa.controls[campo].setValue(event);
  // }

  selecionarTipoTaxa(tipo: string) {
    this.formulario.get('tipoTaxa').setValue(tipo);
  }

  // adicionarFaixa() {
  //   let faixas = this.formulario.get("faixas") as FormArray;
  //   faixas.push(
  //     this.formBuilder.group({
  //       faixaInicial: [null, Validators.required],
  //       faixaFinal: [null, Validators.required],
  //       valorTaxaAdministrativa: [null, Validators.required],
  //     })
  //   );
  // }

  // deleteFaixa(index: number) {
  //   let faixas = this.formulario.controls["faixas"] as FormArray;
  //   faixas.removeAt(index);
  // }

  // changeCheckBoxFaixa() {
  //   if (this.taxaFaixa) {
  //     this.formulario.get("valorTaxaAdministrativa").enable();
  //     this.btnFaixa.nativeElement.disabled = false;
  //   } else {
  //     this.formulario.get("valorTaxaAdministrativa").disable();
  //     this.btnFaixa.nativeElement.disabled = true;
  //   }

  //   this.taxaFaixa = !this.taxaFaixa;
  // }

  // onValueChangeFaixaIncremento(event, campo, i) {
  //   let faixasIncrementoForm = this.formulario.get(
  //     "faixasIncremento"
  //   ) as FormArray;
  //   let faixaIncremento = faixasIncrementoForm.at(i) as FormGroup;
  //   faixaIncremento.controls[campo].markAsTouched();
  //   faixaIncremento.controls[campo].setValue(event);
  // }

  // adicionarFaixaIncremento() {
  //   let faixasIncremento = this.formulario.get("faixasIncremento") as FormArray;
  //   faixasIncremento.push(
  //     this.formBuilder.group({
  //       faixaInicial: [null, Validators.required],
  //       faixaFinal: [null, Validators.required],
  //       valorIncremento: [null, Validators.required],
  //     })
  //   );
  // }

  // deleteFaixaIncremento(index: number) {
  //   let faixasIncremento = this.formulario.controls[
  //     "faixasIncremento"
  //   ] as FormArray;
  //   faixasIncremento.removeAt(index);
  // }

  // changeCheckBoxFaixaIncremento() {
  //   if (this.faixasIncremento) {
  //     this.formulario.get("valorIncremento").enable();
  //     this.btnFaixaIncremento.nativeElement.disabled = false;
  //   } else {
  //     this.formulario.get("valorIncremento").disable();
  //     this.btnFaixaIncremento.nativeElement.disabled = true;
  //   }

  //   this.faixasIncremento = !this.faixasIncremento;
  // }
}
