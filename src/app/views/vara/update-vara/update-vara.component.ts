import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-vara',
  templateUrl: './update-vara.component.html',
  styleUrls: ['./update-vara.component.scss']
})
export class UpdateVaraComponent implements OnInit {

  formulario: FormGroup;
  id;
  cardImageBase64: any;
  imageError: string;
  isImageSaved: boolean;
  juizos;
  escrivaes;
  juizes;

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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

    this.id = this.route.snapshot.params['id'];
    this.restangular
      .all('judicial/vara')
      .get(this.id)
      .subscribe((dados) => {
        this.updateForm(dados.data);
      });
  }

  onSubmit() {
    this.restangular
      .all('judicial/vara')
      .customPUT(this.formulario.value, this.id)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Tipo de foto atualizado com sucesso'
          );
          this.router.navigate(['/vara']);
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao atualizar o tipo de foto!'
          );

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }

  updateForm(dados) {
    this.isImageSaved = true;
    this.cardImageBase64 = dados.logo.url;

    this.formulario = this.formBuilder.group({
      nome: [dados.nome, Validators.required],
      logo: this.formBuilder.group({
          arquivoId: [dados.logo.arquivoId],
          nome: [dados.logo.nome],
          base64: [dados.logo.base64],
          tipo: [dados.logo.tipo],
          tamanho: [dados.logo.tamanho],
      }),
      endereco: [dados.endereco, Validators.required],
      juizoId: [dados.juizoId, Validators.required],
      escrivaes: [dados.escrivaes.map(x => x.escrivaoId), Validators.required],
      juizes: [dados.juizes.map(x => x.juizId), Validators.required],
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

  removeImage(input) {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    input.value = '';
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
