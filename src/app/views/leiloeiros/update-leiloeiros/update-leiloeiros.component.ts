import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Restangular } from 'ngx-restangular';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';

@Component({
  selector: 'app-update-leiloeiros',
  templateUrl: './update-leiloeiros.component.html',
  styleUrls: ['./update-leiloeiros.component.scss']
})
export class UpdateLeiloeirosComponent implements OnInit {
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  imageErrorAss: string;
  isImageSavedAss: boolean;
  cardImageBase64Ass: string;

  formulario:FormGroup
  leiloeiros
  id
  public mask: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private cepService: ConsultaCepService,
    private route: ActivatedRoute
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
      telefone:[null],
      orgaoRegistro:[null, Validators.required],
      ufRegistro: [null, Validators.required],
      matricula: [null, Validators.required],
      genero:[null, Validators.required],
      nomeComercial:[null],
      foto: this.formBuilder.group({
        nome:[null],
        base64:[null],
        tipo:[null],
        tamanho:[0]
      }, Validators.required),
      assinatura: this.formBuilder.group({
        nome:[null],
        base64:[null],
        tipo:[null],
        tamanho:[0]
      }),
      endereco: this.formBuilder.group({
        enderecoId: [0],
        cep: [null],
        numero: [null],
        complemento: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
        logradouro:[null]
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
      err => {
        const errors = err.data.Errors;
        for (var key in errors) {
          this.notifierService.notify('error', errors[key]);
        }
      });
  }

  updateForm(dados){
    if(dados.foto) {
      this.isImageSaved = true
      this.cardImageBase64 = dados.foto.url
    }
    if(dados.assinatura) {
      this.isImageSavedAss = true
      this.cardImageBase64Ass = dados.assinatura.url
    }
    this.formulario.patchValue({
      nome:dados.nome,
      razaoSocial:dados.razaoSocial,
      genero:dados.genero,
      orgaoRegistro:dados.orgaoRegistro,
      ufRegistro:dados.ufRegistro,
      matricula:dados.matricula,
      nomeComercial:dados.nomeComercial,
      anexos:dados.anexos,
      cpfCnpj:dados.cpfCnpj,
      telefone: dados.telefone,
      endereco: dados.endereco,
      enderecoId:dados.enderecoId,
      foto: [dados.foto],
      assinatura: [dados.assinatura],
      fotoId: dados.fotoId,
      ativo: dados.ativo,
      usuarioId: dados.usuarioId
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
        const max_size = 5242880;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'O tamanho máximo permitido é 5Mb';

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

  fileChangeEventAss(fileInput: any) {
    this.imageErrorAss = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 5242880;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageErrorAss =
                'O tamanho máximo permitido é 5Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageErrorAss = 'Somente imagens são permitidas ( JPG | PNG )';
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
                    this.imageErrorAss =
                        'Tamanho máximo permitido ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64Ass = imgBase64Path;
                    this.isImageSavedAss = true;
                    var assinatura = this.formulario.get('assinatura') as FormGroup;
                    assinatura.get('base64').setValue(imgBase64Path);
                    assinatura.get('nome').setValue(fileInput.target.files[0].name);
                    assinatura.get('tamanho').setValue(fileInput.target.files[0].size);
                    assinatura.get('tipo').setValue(fileInput.target.files[0].type);
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage(input) {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    input.value = "";
  }

  removeImageAss(input) {
    this.cardImageBase64Ass = null;
    this.isImageSavedAss = false;
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
