
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NotifierService } from 'angular-notifier'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormValidations } from 'app/views/usuarios/shared/form-validation/form-validations';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { concat, Observable, of, Subject, Subscription } from 'rxjs';
import { tap, distinctUntilChanged, switchMap, catchError, filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-create-fatura',
  templateUrl: './create-fatura.component.html',
  styleUrls: ['./create-fatura.component.scss']
})
export class CreateFaturaComponent implements OnInit, OnDestroy {
  valorQualquer = true;
  lotes;
  formulario: FormGroup
  loading
  today = moment().utc();
  clientes;
  dataAtual: any;
  empresas: any
  minDate: Date;
  tipoFatura = 'Massiva';
  tiposItem = [
    'Lote', 'Outro'
  ]
  modalRef: BsModalRef;
  //anexos
  anexosbase64: any
  anexosnome: any
  anexostamanho: any
  anexostipo: any
  numeroAdcAnexo: number
  arrayAnexos = [];
  fileToUpload: File | null = null;

  leilao: any;
  leiloes: any;
  mask: (string | RegExp)[];
  maskTelefoneFixo: (string | RegExp)[];
  maskCep: (string | RegExp)[];
  maskCpf: (string | RegExp)[];
  maskCnpj: (string | RegExp)[];
  isCpf = true;
  sub: Subscription[] = [];

  people$: Observable<any>;
  peopleLoading = false;
  peopleInput$ = new Subject<string>();

  lote$: Observable<any>;
  loteLoading = false;
  loteInput$ = new Subject<string>();
  formasPagamento = [];

  get formasPagamentoFormArray() {
    return this.formulario.controls.formasPagamento as FormArray;
  }

  salvando = false;
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private cepService: ConsultaCepService,
  ) {
    localeService.use('pt-br');
    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskTelefoneFixo = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    this.maskCnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, ]
  }

  ngOnInit() {
    this.sub.push(
      this.restangular.one('admin/leilao').get().subscribe(
        dados => {
          this.leiloes = dados.data
        }
      )
    )

    this.sub.push(
      this.restangular.one('fatura/pessoas').get().subscribe(
        dados => {
          this.clientes = dados.data
        }
      )
    )

    this.setFatura(this.tipoFatura);
    this.loadLotes();
    this.loadPeople();

    this.sub.push(
      this.restangular.one('/Fatura/FormasPagamento').get().subscribe(
        dados => {
          this.formasPagamento = dados.data;
          this.buildFormaPagamento();
        }
      )
    )
  }

  onSubmit() {
    this.salvando = true;
    const formulario = {...this.formulario.value}
    Object.keys(this.formulario.controls).forEach((campo) => {
      const controle = this.formulario.get(campo)
      controle.markAsTouched()
    })

    if (moment(this.formulario.controls.dataLimite.value).utc().diff(moment().utc(), 'day') < 0) {
      this.notifierService.notify('error', 'A Data Expiração não pode ser menor que hoje');
      this.salvando = false;
      return false;
    }

    if (moment(this.formulario.controls.dataVencimento.value).utc().diff(moment().utc(), 'day') < 0) {
      this.notifierService.notify('error', 'A Data de Vencimento não pode ser menor que hoje');
      this.salvando = false;
      return false;
    }

    if (!this.formulario.valid) {
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      this.salvando = false;
      return false;
    }
    const formasSelecionadas = formulario.formasPagamento
      .map((checked, i) => checked ? this.formasPagamento[i].formaPagamentoId : null)
      .filter(v => v !== null);
    formulario.formasPagamento = formasSelecionadas

    if (this.tipoFatura == 'Massiva') {
      const existAll = this.formulario.value.itensFatura.filter(x => x.all == true)
      const formMassivo = {
        leilaoId: formulario.leilaoId,
        todosLotes: formulario.todosLotes,
        cobrancaId: formulario.cobrancaId,
        dataLimite: formulario.dataLimite,
        dataVencimento: formulario.dataVencimento,
        formasPagamento: formasSelecionadas,
        agrupar: formulario.agrupar,
        lotes: existAll.length > 0 ? [0] : formulario.itensFatura.map(x => x.loteId)
      }

      this.restangular.all('/Fatura/FaturaMassiva').post(formMassivo).subscribe(a => {
        this.notifierService.notify('success', 'Fatura massiva criada com sucesso');
        this.salvando = false;
        this.router.navigate(['/fatura']);
      },
        error => {
          this.notifierService.notify('error', 'Erro ao criar fatura massiva!');
          this.salvando = false;
          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo)
            controle.markAsTouched()
          })
        });
    }

    if (this.tipoFatura == 'Avulsa') {
      const formAvulso = {
        origem: formulario.origem,
        leilaoId: formulario.leilaoId,
        cobrancaId: formulario.cobrancaId,
        cliente: formulario.cliente,
        dataVencimento: formulario.dataVencimento,
        formasPagamento: formulario.formasPagamento,
        itensFatura: formulario.itensFatura,
      }
      this.restangular.all('/Fatura/FaturaManual').post(formAvulso).subscribe(a => {
        this.notifierService.notify('success', 'Fatura avulsa criada com sucesso');
        this.salvando = false;
        this.router.navigate(['/fatura']);
      },
        error => {
          this.notifierService.notify('error', 'Erro ao criar fatura avulsa!');
          this.salvando = false;
          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo)
            controle.markAsTouched()
          })
        });
    }
  }

  setOrigem() {
    // const origem = this.formulario.value.origem
    // if(origem == 'leilao'){
    //   this.leilao = this.leiloes;
    // }else{
    //   this.leilao = [];
    // }
  }

  setCobranca() {
   const leilaoId = this.formulario.value.leilaoId
   const leilaoCorrespondente = this.leiloes.find(x => x.id == leilaoId)
    const empresaId = leilaoCorrespondente.empresaId;
    this.sub.push(
      this.restangular.one(`configuracaoConta/Empresa/${empresaId}`).get().subscribe(
        dados => {
          this.empresas = dados.data
        }
      )
    )
  }

  private loadLotes() {
    this.lote$ = concat(
      of([]),
      this.loteInput$.pipe(
        distinctUntilChanged(),
        tap(() => { this.loteLoading = true }),
        switchMap(term => term != '' ?
          this.restangular.one(`fatura/lotes/${this.formulario.value.leilaoId}?pesquisa=${term}`).get().pipe(
            catchError(() => of([])),
            tap(() => this.loteLoading = false),
            map((x: any) => x.data)
          )
          :
          of([]).pipe(
            tap(() => this.loteLoading = false)
          )
        )
      )
    );
  }

  private loadPeople() {
    this.people$ = concat(
      of([]),
      this.peopleInput$.pipe(
        distinctUntilChanged(),
        tap(() => { this.peopleLoading = true }),
        switchMap(term => term != '' ?
          this.restangular.one(`fatura/pessoas?pesquisa=${term}`).get().pipe(
            catchError(() => of([])),
            tap(() => this.peopleLoading = false),
            map((x: any) => x.data)
          )
          :
          of([]).pipe(
            tap(() => this.peopleLoading = false)
          )
        )
      )
    );
  }

  consultaCEP() {
    const cep = this.formulario.get('cliente.cep').value;
    if (cep != null && cep !== '') {
      this.sub.push(
        this.cepService.consultaCEP(cep)
          .subscribe(dados => this.populaDadosForm(dados))
      )

    }
  }

  populaDadosPessoa(dados) {
    const clienteSelecionado = this.formulario.value.clienteSelecionado
    this.formulario.patchValue({
      cliente: ({
        nome: clienteSelecionado.nome,
        email: clienteSelecionado.email,
        telefone: clienteSelecionado.telefone,
        cpfCnpj: clienteSelecionado.cpfCnpj,
        logradouro: clienteSelecionado.logradouro,
        logradouroNumero: clienteSelecionado.logradouroNumero,
        logradouroComplemento: clienteSelecionado.logradouroComplemento,
        bairro: clienteSelecionado.bairro,
        cidade: clienteSelecionado.cidade,
        estado: clienteSelecionado.estado,
        cep: clienteSelecionado.cep,
        usuarioId: clienteSelecionado.usuarioId
      })
    });
  }

  populaDadosForm(dados) {
    this.formulario.patchValue({
      cliente: ({
        logradouro: dados.logradouro,
        logradouroComplemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      })

    });
  }

  setFatura(item) {
    this.tipoFatura = item
    if (item == 'Massiva') {
      this.formulario = this.formBuilder.group({
        origem: [null, Validators.required],
        leilaoId: [null, [Validators.required]],
        cobrancaId: [null, [Validators.required]],
        dataLimite: [null, Validators.required],
        dataVencimento: [null, Validators.required],
        lote: [null],
        formasPagamento: new FormArray([]),
        itensFatura: this.formBuilder.array([]),
        adicionarItem: [],
        todosLotes: [false],
        agrupar: [false]
      })
    }
    if (item == 'Avulsa') {
      this.formulario = this.formBuilder.group({
        origem: [ null, [Validators.required]],
        leilaoId: [null, [Validators.required]],
        cobrancaId: [null, [Validators.required]],
        cliente: this.formBuilder.group({
          nome: [null, [Validators.required, Validators.minLength(3)]],
          email: [null, [Validators.required, Validators.email]],
          telefone: [null],
          cpfCnpj: [null, [Validators.required, Validators.minLength(11)]],
          logradouro: [null],
          logradouroNumero: [null],
          logradouroComplemento: [null],
          bairro: [null],
          cidade: [null],
          estado: [null],
          cep: [null],
          usuarioId: [null]
        }),
        dataVencimento: [null, Validators.required],
        formasPagamento: new FormArray([]),
        dataLimite: [null, Validators.required],
        clienteSelecionado: [null],
        lote: [null],
        itensFatura: this.formBuilder.array([]),
        adicionarItem: [],
        todosLotes: [false],
      })
    }

    this.buildFormaPagamento();
  }

  buildFormaPagamento() {
    this.formasPagamento.forEach(() => this.formasPagamentoFormArray.push(new FormControl(false)));
  }

  adicionarItens(itemCampoId = null) {
    const form = this.formulario.value
    const existAll = this.formulario.value.itensFatura.filter(x => x.all == true)
    const existLote =  this.formulario.value.itensFatura.find(x => {
      return form.lote && x.loteId === form.lote.loteId
    })

    if (form.adicionarItem == 'outros') {
      const itens = this.formulario.get('itensFatura') as FormArray
      itens.push(this.formBuilder.group({
        loteId: [0],
        descricao: ['', Validators.required],
        valor: ['', Validators.required],
        tipo: ['outros']
      }))
      return
    }

    if (form.adicionarItem == 'lote') {
      if (form.todosLotes == true) {
        if (existAll.length > 0 || form.itensFatura.length > 0) {
          this.notifierService.notify('error', 'Um ou mais lotes foram selecionados!');
        } else {
          const desc = `Todos os lotes foram selecionados `
          const itens = this.formulario.get('itensFatura') as FormArray
          itens.push(this.formBuilder.group({
            descricao: [desc, Validators.required],
            tipo: ['lote'],
            all: [true]
          }))
          return
        }
        return
      }

      if (existAll.length < 1) {
        if (!existLote) {
          const desc = `Lote: ${form.lote.numeroLote} - Placa: ${form.lote ? form.lote.placa : ''} - Marca/Modelo: ${form.lote ? form.lote.marcaModelo : ''}   `
          const itens = this.formulario.get('itensFatura') as FormArray
          itens.push(this.formBuilder.group({
            descricao: [desc, Validators.required],
            valor: [form.lote.valorLanceVencedor, Validators.required],
            tipo: ['lote'],
            loteId: [form.lote.loteId],
            all: [false]
          }))
        } else {
          this.notifierService.notify('error', 'Lote já selecionado !');
        }
      } else {
        this.notifierService.notify('error', 'Todos os lotes já foram selecionados !');
      }
    }
  }

  deleteItens(indexCampo: number) {
    const itens = this.formulario.controls['itensFatura'] as FormArray
    itens.removeAt(indexCampo)
  }

  filterList(campo: string) {
    const itens = this.formulario.get(campo) as FormArray;
    return itens.controls
  }

  openModal(template: TemplateRef<any>, item?) {
    if (item == 'fatura' && this.formulario.value.leilaoId == null) {
      this.notifierService.notify('error', 'Selecione um leilão');
      return
    }
    this.modalRef = this.modalService.show(template);
  }

  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErroLista(campoArray, campo, i) {
    return { 'has-error': this.verificaValidList(campoArray, campo, i) }
  }

  verificaValidList(campoArray, campo, i) {
    const lista = this.formulario.get(campoArray) as FormArray;
    const item = lista.controls[i] as FormGroup;
    return !item.get(campo).valid;
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }

  public cpfcnpjmask = function (value) {
    const numbers = value.match(/\d/g);
    let numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }
    if (numberLength <= 11) {
      return [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
    } else {
      return [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
