import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import * as moment from 'moment';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-empresa',
  templateUrl: './update-empresa.component.html',
  styleUrls: ['./update-empresa.component.scss']
})
export class UpdateEmpresaComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  formulario:FormGroup
  id
  empresa
  gruposEconomico;

  context = {
    message: 'Hello there!'
  };

  public mask: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private cepService: ConsultaCepService,
  ) {

    this.id = this.route.snapshot.params['id']
    this.restangular.one("empresa", this.id).get().subscribe((response) => {
    this.updateForm(response.data)
    })

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]

        this.restangular.one("GrupoEconomico").get().subscribe((response) => {
      this.gruposEconomico = response.data
    })
    this.formulario = this.formBuilder.group({
      ativo:[null, Validators.required],
      cnpj:[null, Validators.required],
      codigoTributarioMunicipio:[null],
      foto: this.formBuilder.group({
        arquivoId:[0],
        nome:[null],
        base64:[null],
        tipo:[null],
        tamanho:[0]
      }, Validators.required),
      empresaId:[this.id],
      endereco: this.formBuilder.group({
        enderecoId: [0],
        cep: [null, [Validators.required]],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        logradouro:[null, Validators.required]
      }),
      grupoEconomicoId:[0],
      inscricaoEstadual:[null],
      inscricaoMunicipal:[null],
      nomeFantasia:[null, Validators.required],
      razaoSocial:[null, Validators.required],
      telefone:[null, Validators.required],
    })
  }

  ngOnInit() {

  }
  onSubmit(){
    console.log(this.formulario.value)
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }
    this.restangular.all('empresa').customPUT(this.formulario.value, this.id).subscribe(a => {
      this.notifierService.notify('success', 'Empresa atualizada com sucesso');
      this.router.navigate(['/empresa']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar a empresa!');

        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  updateForm(dados){
    if(dados.foto) {
      this.isImageSaved = true
      this.cardImageBase64 = dados.foto.url
    }
    this.formulario.patchValue({
      ativo:dados.ativo,
      cnpj:dados.cnpj,
      codigoTributarioMunicipio:dados.codigoTributarioMunicipio,
      foto: [dados.foto],
      fotoId: dados.fotoId,
      endereco: dados.endereco,
      enderecoId: dados.enderecoId,
      grupoEconomicoId:dados.grupoEconomicoId,
      inscricaoEstadual:dados.inscricaoEstadual,
      inscricaoMunicipal:dados.inscricaoMunicipal,
      nomeFantasia:dados.nomeFantasia,
      razaoSocial:dados.razaoSocial,
      telefone: dados.telefone
    })
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'O tamanho máximo permitido é ' + max_size / 1000 + 'Mb';

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

  removeImage(input) {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    input.value = "";
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
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
        estado: dados.uf
      }
    });
  }
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return {'has-error': this.verificaValidTouched(campo) }
  }
}
