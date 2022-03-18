import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Restangular } from 'ngx-restangular';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AngularEditorConfig } from '@kolkov/angular-editor';
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
    private route: ActivatedRoute,
    private localeService: BsLocaleService
    ) {
    
    this.id = this.route.snapshot.params['id']
    this.restangular.one("leiloeiro", this.id).get().subscribe((response) => {
    this.updateForm(response.data)
    })
      
    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/,/\d/,/\d/,  '.', /\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/ ]
    this.maskCnpj = [ /\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/, ]
    
    this.formulario = this.formBuilder.group({
      nome:[null, Validators.required],
      razaoSocial:[null],
      cpfCnpj:[null, Validators.required],
      telefone:[null, Validators.required],
      email:[null, Validators.required],
      foto: this.formBuilder.group({
        arquivoId:[0],
        nome:[null],
        base64:[null, Validators.required],
        tipo:[null],
        tamanho:[0]
      }, Validators.required),
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
      })
    }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.formulario.value)
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }
    this.restangular.all('leiloeiro').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Leiloeiro Criado com sucesso');
      this.router.navigate(['/leiloeiro']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar o Leiloeiro!');
        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  updateForm(dados){
    this.formulario.patchValue({
      descricao:dados.descricao,
      empresa:dados.empresa,
      telefone:dados.telefone,
      empresaId:dados.empresaId,
      endereco: dados.endereco,
      enderecoId:dados.enderecoId,
      localLoteId:dados.localLoteId
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

  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return { 'has-error': this.verificaValidTouched(campo) }
  }

}
