import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-comitente',
  templateUrl: './update-comitente.component.html',
  styleUrls: ['./update-comitente.component.scss']
})
export class UpdateComitenteComponent implements OnInit, OnDestroy {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  formulario: FormGroup
  comitente
  id
  sub: Subscription[] = [];

  public mask: Array<string | RegExp>
  public maskCep: Array<string | RegExp>
  public maskCpf: Array<string | RegExp>
  public maskCnpj: Array<string | RegExp>

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.id = this.route.snapshot.params['id']
   this.sub.push(
    this.restangular.one('comitente', this.id).get().subscribe((response) => {
      this.updateForm(response.data)
      })
   )

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.maskCep = [ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ]
    this.maskCpf = [ /\d/, /\d/, /\d/,  '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ]
    this.maskCnpj = [ /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, ]

    this.formulario = this.formBuilder.group({
      comitenteId: [this.id],
      cnpj: [null, Validators.required],
      ativo: [null, Validators.required],
      nome: [null, Validators.required],
      razaoSocial: [null],
      foto: this.formBuilder.group({
        arquivoId: [0],
        nome: [null],
        base64: [null],
        tipo: [null],
        tamanho: [0]
      }, Validators.required),
      usuarioId: [null]
    })
  }

  ngOnInit() {

  }
  onSubmit() {
    if (!this.formulario.valid) {
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo)
        controle.markAsTouched()
      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    this.restangular.all('comitente').customPUT(this.formulario.value, this.id).subscribe(a => {
      this.notifierService.notify('success', 'Comitente Criado com sucesso');
      this.router.navigate(['/comitente']);
    },
      err => {
      const errors = err.data.Errors;
      for (const key in errors) {
        this.notifierService.notify('error', errors[key]);
      }
    });
  }
  updateForm(dados) {
    if (dados.foto) {
      this.isImageSaved = true
      this.cardImageBase64 = dados.foto.url
    }
    this.formulario.patchValue({
      cnpj: dados.cnpj,
      ativo: dados.ativo,
      nome: dados.nome,
      razaoSocial: dados.razaoSocial,
      foto: [dados.foto],
      fotoId: dados.fotoId,
      usuarioId: dados.usuarioId
    })
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
                    const foto = this.formulario.get('foto') as FormGroup;
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
    input.value = '';
  }

  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo) {
    return {'has-error': this.verificaValidTouched(campo) }
  }
  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
