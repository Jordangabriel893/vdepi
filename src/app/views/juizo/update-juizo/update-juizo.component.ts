import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-juizo',
  templateUrl: './update-juizo.component.html',
  styleUrls: ['./update-juizo.component.scss'],
})
export class UpdateJuizoComponent implements OnInit {
  formulario: FormGroup;
  id;
  cardImageBase64: any;
  imageError: string;
  isImageSaved: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.restangular
      .all('judicial/juizo')
      .get(this.id)
      .subscribe((dados) => {
        this.updateForm(dados.data);
      });
  }

  onSubmit() {
    this.restangular
      .all('judicial/juizo')
      .customPUT(this.formulario.value, this.id)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Juizo atualizado com sucesso'
          );
          this.router.navigate(['/juizo']);
        },
        (error) => {
          //console.log(error);
          this.notifierService.notify('error', 'Erro ao atualizar Juizo!');

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }

  updateForm(dados) {
    this.isImageSaved = dados.logo ? true : false;
    this.cardImageBase64 = dados.logo ? dados.logo.url : null;

    this.formulario = this.formBuilder.group({
      nome: [dados.nome, Validators.required],
      logo: dados.logo
        ? this.formBuilder.group({
            arquivoId: [dados.logo.arquivoId],
            nome: [dados.logo.nome],
            base64: [dados.logo.base64],
            tipo: [dados.logo.tipo],
            tamanho: [dados.logo.tamanho],
          })
        : null,
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
            if (logo.controls) {
              logo.get('base64').setValue(imgBase64Path);
              logo.get('nome').setValue(fileInput.target.files[0].name);
              logo.get('tamanho').setValue(fileInput.target.files[0].size);
              logo.get('tipo').setValue(fileInput.target.files[0].type);
            } else {
              logo.setValue({
                arquivoId: 0,
                nome: fileInput.target.files[0].name,
                base64: imgBase64Path,
                tipo: fileInput.target.files[0].type,
                tamanho: fileInput.target.files[0].size,
              });
            }
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

    const logo = this.formulario.get('logo') as FormGroup;
    if (logo.controls) {
      logo.patchValue({
        arquivoId: 0,
        nome: null,
        base64: null,
        tipo: null,
        tamanho: 0,
      });
    }
  }

  verificaValidTouched(campo) {
    if (this.formulario.value) {
      return (
        !this.formulario.get(campo).valid && this.formulario.get(campo).touched
      );
    }
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) };
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
