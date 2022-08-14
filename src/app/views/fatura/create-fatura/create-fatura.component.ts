
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
  tipoFatura = 'Avulsa';
  opcoes = [
    'Cartão', 'Boleto', 'Pix'
  ]
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
  mask: (string | RegExp)[];
  maskTelefoneFixo: (string | RegExp)[];
  maskCep: (string | RegExp)[];
  maskCpf: (string | RegExp)[];
  maskCnpj: (string | RegExp)[];

  sub: Subscription[] = [];

  people$: Observable<any>;
  peopleLoading = false;
  peopleInput$ = new Subject<string>();

  lote$: Observable<any>;
  loteLoading = false;
  loteInput$ = new Subject<string>();
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
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskTelefoneFixo = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]
    this.maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    this.maskCnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]
  }

  ngOnInit() {

    this.sub.push(
      this.restangular.one('empresa').get().subscribe(
        dados => {
          this.empresas = dados.data
        }
      )
    )
    this.sub.push(
      this.restangular.one('admin/leilao').get().subscribe(
        dados => {
          this.leilao = dados.data
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
    this.formulario = this.formBuilder.group({
      origem: ['leilao', [Validators.required]],
      leilaoId: [null, [Validators.required]],
      cobrancaId: [null, [Validators.required]],
      cliente: this.formBuilder.group({
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        email: [null, [Validators.required, Validators.email]],
        telefone: [null, [Validators.required, Validators.email]],
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
      formasPagamento: this.buildOpcoes(),
      empresaCobrança: [null, [Validators.required]],
      dataLimite: [null, Validators.required],
      clienteSelecionado: [null],
      lote: [null, Validators.required],

      itensFatura: this.formBuilder.array([], Validators.required),
      adicionarItem: [],
      selectAll: [false],


    })
    this.loadLotes()
    this.loadPeople()
  }

  onSubmit() {
    console.log(this.formulario.value)
    // if(!this.formulario.valid){
    //   Object.keys(this.formulario.controls).forEach((campo)=>{
    //     const controle = this.formulario.get(campo)
    //     controle.markAsTouched()
    //   })
    //   this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
    //   return false;
    // }

    // this.restangular.all('leilao').post(this.formulario.value).subscribe(a => {
    //   this.notifierService.notify('success', 'Leilão Criado com sucesso');
    //   this.router.navigate(['/leilao']);
    // },
    //   error => {
    //     this.notifierService.notify('error', 'Erro ao atualizar o Leilão!');

    //     Object.keys(this.formulario.controls).forEach((campo)=>{
    //       const controle = this.formulario.get(campo)
    //       controle.markAsTouched()
    //     })
    //   });
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
  private loadPeople(){
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
    // this.formulario.setValue({});

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
    this.formulario = this.formBuilder.group({
      origem: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      leilaoId: [null, [Validators.required]],
      cobrancaId: [null, [Validators.required]],
      empresaCobrança: [null, [Validators.required]],
      dataLimite: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      lote: [null, Validators.required],
      formasPagamento: this.buildOpcoes(),
      itensFatura: this.formBuilder.array([], Validators.required),
      adicionarItem: [],
      selectAll: [false]

    })
  }
  buildOpcoes() {
    const values = this.opcoes.map(v => new FormControl(false))
    return this.formBuilder.array(values);
  }
  getOpcoes() {
    return this.formulario.get('formasPagamento')['controls']
  }
  adicionarItens(itemCampoId = null) {
    const form = this.formulario.value
    if (form.adicionarItem == 'outros') {
      let itens = this.formulario.get('itensFatura') as FormArray
      itens.push(this.formBuilder.group({
        descricao: ['', Validators.required],
        valor: ['', Validators.required],
        tipo: ['outros']
      }))
      return
    }
    if (form.adicionarItem == 'lote') {
      if (form.selectAll == true) {
        const desc = `Todos os lotes foram selecionados `
        let itens = this.formulario.get('itensFatura') as FormArray
        itens.push(this.formBuilder.group({
          descricao: [desc, Validators.required],
          tipo: ['lote'],
          all: [true]
        }))
        return
      }

      const desc = `Lote: ${form.lote.numeroLote} - Placa: ${form.lote ? form.lote.placa : ''} - Marca/Modelo: ${form.lote ? form.lote.marcaModelo : ''}   `
      let itens = this.formulario.get('itensFatura') as FormArray
      itens.push(this.formBuilder.group({
        descricao: [desc, Validators.required],
        valor: [form.lote.valorLanceVencedor, Validators.required],
        tipo: ['lote'],
        all: [false]
      }))
    }

  }
  deleteItens(indexCampo: number) {
    let itens = this.formulario.controls['itensFatura'] as FormArray
    let item = itens.at(indexCampo) as FormGroup;
    itens.removeAt(indexCampo)
  }

  filterList(campo: string) {
    const itens = this.formulario.get(campo) as FormArray;
    return itens.controls
  }
  openModal(template: TemplateRef<any>,item?) {
    if(item == 'fatura' && this.formulario.value.leilaoId == null){
      this.notifierService.notify('error', 'Selecione um Leilão');
      return
    }
    this.modalRef = this.modalService.show(template);

  }
  consoleInput(item) {
    console.log(item)
  }


  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErroLista(campoArray, campo, i) {
    return { 'has-error': this.verificaValidList(campoArray, campo, i) }
  }

  verificaValidList(campoArray, campo, i) {
    var lista = this.formulario.get(campoArray) as FormArray;
    var item = lista.controls[i] as FormGroup;
    return !item.get(campo).valid;
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
