import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';

@Component({
  selector: 'app-update-fiel-depositario',
  templateUrl: './update-fiel-depositario.component.html',
  styleUrls: ['./update-fiel-depositario.component.scss'],
})
export class UpdateFielDepositarioComponent implements OnInit {
  formulario: FormGroup;
  id: any;
  advogados: [];

  public mask: Array<string | RegExp>;
  public maskData: Array<string | RegExp>;
  public maskCep: Array<string | RegExp>;
  public maskCpf: Array<string | RegExp>;
  public maskCnpj: Array<string | RegExp>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private cepService: ConsultaCepService
  ) {
    this.mask = [
      '(',
      /[1-9]/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
    this.maskData = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    this.maskCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    this.maskCpf = [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ];
    this.maskCnpj = [
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '/',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ];

    this.formulario = this.formBuilder.group({
      nomeCompleto: [null, [Validators.required, Validators.minLength(3)]],
      numeroDocumento: [null],
      dataNascimento: [null],
      telefoneCelular: [null],
      telefoneConvencional: [null],
      telefoneWhatsapp: [null],
      genero: [null],
      tipoPessoa: ['PF'],
      endereco: this.formBuilder.group({
        cep: [null],
        numero: [null],
        complemento: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
        logradouro: [null],
      }),
      principal: [false],
      advogados: [null],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.restangular
      .all('judicial/atorProcesso')
      .get(this.id)
      .subscribe((dados) => {
        this.updateForm(dados.data);
      });

    this.restangular
      .one('judicial/advogado')
      .get()
      .subscribe((a) => {
        this.advogados = a.data;
      });
  }

  onSubmit() {
    if (!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      });
      this.notifierService.notify(
        'error',
        'Preencha todos os campos obrigatórios'
      );
      return;
    }

    const body = {
      pessoa: this.formulario.value,
      principal: this.formulario.get('principal').value,
      advogados: this.formulario.get('advogados').value,
    };

    this.restangular
      .all('judicial/fielDepositario')
      .customPUT(body, this.id)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'fielDepositario atualizado com sucesso'
          );
          this.router.navigateByUrl('/fiel-depositario');
        },
        (error) => {
          const errors = error.data.Errors;
          for (const k in errors) {
            if (k.toLowerCase() === 'exception') {
              this.notifierService.notify(
                'error',
                'Erro ao atualizar fielDepositario'
              );
            } else {
              this.notifierService.notify('error', errors[k]);
            }
          }
          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService
        .consultaCEP(cep)
        .subscribe((dados) => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  updateForm(dados) {
    this.formulario.patchValue({
      fielDepositarioId: dados.fielDepositarioId,
      nomeCompleto: dados.nomeCompleto,
      numeroDocumento: dados.numeroDocumento,
      dataNascimento: dados.dataNascimento
        ? moment.utc(dados.dataNascimento).local().toDate()
        : '',
      telefoneCelular: dados.telefoneCelular,
      telefoneConvencional: dados.telefoneConvencional,
      telefoneWhatsapp: dados.telefoneWhatsapp,
      genero: dados.genero,
      tipoPessoa: dados.tipoPessoa,
      endereco: {
        enderecoId: dados.endereco ? dados.endereco.enderecoId : 0,
        cep: dados.endereco ? dados.endereco.cep : '',
        numero: dados.endereco ? dados.endereco.numero : '',
        complemento: dados.endereco ? dados.endereco.complemento : '',
        bairro: dados.endereco ? dados.endereco.bairro : '',
        cidade: dados.endereco ? dados.endereco.cidade : '',
        estado: dados.endereco ? dados.endereco.estado : '',
        logradouro: dados.endereco ? dados.endereco.logradouro : '',
      },
      principal: dados.principal,
      advogados: dados.advogados.map((a) => a.pessoaId),
    });
    console.log(this.formulario.value);
  }

  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
    };
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
