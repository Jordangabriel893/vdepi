import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';

@Component({
  selector: 'app-create-escrivao',
  templateUrl: './create-escrivao.component.html',
  styleUrls: ['./create-escrivao.component.scss'],
})
export class CreateEscrivaoComponent implements OnInit {
  formulario: FormGroup;
  public mask: Array<string | RegExp>;
  public maskData: Array<string | RegExp>;
  public maskCep: Array<string | RegExp>;
  public maskCpf: Array<string | RegExp>;

  fieldTextType: boolean;
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
  }

  ngOnInit() {
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
    this.restangular
      .all('judicial/escrivao')
      .post({ pessoa: this.formulario.value })
      .subscribe(
        (a) => {
          this.notifierService.notify('success', 'Usuário criado com sucesso');
          this.router.navigateByUrl('/escrivao');
        },
        (error) => {
          const errors = error.data.Errors;
          for (const k in errors) {
            if (k.toLowerCase() === 'exception') {
              this.notifierService.notify('error', 'Erro ao atualizar usuário');
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
    // this.formulario.setValue({});

    this.formulario.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
