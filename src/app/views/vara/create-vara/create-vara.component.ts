import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-vara',
  templateUrl: './create-vara.component.html',
  styleUrls: ['./create-vara.component.scss']
})
export class CreateVaraComponent implements OnInit {

  formulario: FormGroup;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  juizos;
  escrivaes;
  juizes;
  public maskCep: Array<string | RegExp>

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private cepService: ConsultaCepService,
  ) {
    this.maskCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]
  }

  ngOnInit() {

    forkJoin([
      this.restangular.one('Judicial/juizo').get().pipe(),
      this.restangular.one('Judicial/Escrivao').get().pipe(),
      this.restangular.one('Judicial/Juiz').get().pipe()
    ]).subscribe(([juizos, escrivaes, juizes] : any[]) => {
      this.juizos = juizos.data;
      this.escrivaes = escrivaes.data;
      this.juizes = juizes.data;
    });

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      logo: this.formBuilder.group(
        {
          arquivoId: [0],
          nome: [null],
          base64: [null],
          tipo: [null],
          tamanho: [0],
        },
      ),
      juizoId: [null, Validators.required],
      escrivaes: [null],
      juizes: [null],
      endereco: this.formBuilder.group({
        cep: [null],
        numero: [null],
        complemento: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
        logradouro: [null]
      }),
    });

  }

  fileChangeEvent(fileInput: any) {
    console.log(this.formulario)

    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 5242880;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'O tamanho máximo permitido é 5Mb';

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
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Tamanho máximo permitido ' + max_height + '*' + max_width + 'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            const logo = this.formulario.get('logo') as FormGroup;
            logo.get('base64').setValue(imgBase64Path);
            logo.get('nome').setValue(fileInput.target.files[0].name);
            logo.get('tamanho').setValue(fileInput.target.files[0].size);
            logo.get('tipo').setValue(fileInput.target.files[0].type);
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onSubmit() {

    this.restangular
      .all('Judicial/vara')
      .post(this.formulario.value)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Registro adicionado com sucesso'
          );
          this.router.navigate(['/vara']);
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao adicionar registro!'
          );

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }

  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  removeImage(input) {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    input.value = '';
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) };
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
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
}
