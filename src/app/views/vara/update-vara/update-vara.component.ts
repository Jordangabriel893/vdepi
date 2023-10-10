import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';

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
  public maskCep: Array<string | RegExp>

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router,
    private cepService: ConsultaCepService,
  ) { 
    this.maskCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]

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

    this.formulario.patchValue({
      nome: dados.nome,
      logo: this.formBuilder.group({
          arquivoId: dados.logo.arquivoId,
          nome: dados.logo.nome,
          base64: dados.logo.base64,
          tipo: dados.logo.tipo,
          tamanho: dados.logo.tamanho,
      }),
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
      juizoId: dados.juizoId,
      escrivaes: dados.escrivaes.map(x => x.escrivaoId),
      juizes: dados.juizes.map(x => x.juizId),
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
