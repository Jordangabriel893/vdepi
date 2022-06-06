import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.scss']
})
export class CreateBannerComponent implements OnInit {
  @ViewChild('inputBanners') inputBanners: ElementRef;
  formulario:FormGroup
    //fotos
    fotosbase64: any
    fotosnome: any
    fotostamanho: any
    fotostipo: any
    numeroAdcFoto: number
    arrayFotos = [ ];
    imageError: string;
    tipoFoto: any;


  constructor(
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private router: Router,
    private restangular: Restangular,
    ) {
    }
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      banners: this.formBuilder.array([], Validators.required)
    })
  }
  onSubmit(i) {
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()
      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }
    const formulario = this.formulario.value
    this.restangular.all('cms/banner').post(formulario).subscribe(a => {
      this.notifierService.notify('success', 'Banner criado com sucesso');
      this.router.navigate(['/banner', ]);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar o banner!');
      });
  }
  fileChangeEvent(fileInput: any) {

    this.imageError = null;
    const arrayImagens = fileInput.target.files.length

    for(let i = 0; i < arrayImagens; i ++){

     this.arrayFotos.push(fileInput.target.files[i])
    }

    this.arrayFotos.forEach((x: any)=>{
      if (x ) {
        // Size Filter Bytes
        const max_size = 5242880;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (x.size > max_size) {
          this.imageError =
            'Maximum size allowed is 5Mb';
            this.arrayFotos = [];
          return false;
        }

        if (!_.includes(allowed_types, x.type)) {
          this.arrayFotos = [];
          this.imageError = 'Only Images are allowed ( JPG | PNG )';
          return false;

        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];
            this.arrayFotos = [];


            if (img_height > max_height && img_width > max_width) {
              this.imageError =
                'Maximum dimentions allowed ' +
                max_height +
                '*' +
                max_width +
                'px';
              return false;
            } else {
              const imgBase64Path = e.target.result;
              const arquivo =
              {
                url: imgBase64Path,
                nome: x.name,
                base64: imgBase64Path,
                tipo: x.type,
                tamanho: x.size
              }
              this.arrayFotos = [];
              this.atualizarFoto(arquivo, this.numeroAdcFoto)

            }
          };
        };

        reader.readAsDataURL(x);

      }

    })

  }
  alterarFoto(i) {
    this.numeroAdcFoto = i
    this.inputBanners.nativeElement.click()
  }
  atualizarFoto(obj, i) {
    let banners = this.formulario.get('banners') as FormArray

    if (i < 0) {
      banners.insert(0, this.formBuilder.group({
        linkUrl:'',
        arquivo: obj,
        acao: 'I',
      }))
    } else {
      const valor = banners.value[i]
      banners.removeAt(i)
      banners.insert(i, this.formBuilder.group({
        linkUrl:'',
        arquivo: obj,
        acao: 'I'
      }))
    }
  }
  filterList(campo: string) {
    const banners = this.formulario.get(campo) as FormArray;
    return banners.controls.filter(x => (x as FormGroup).controls['acao'].value !== 'D');
  }

  deleteFoto(indexFoto: number) {
    let banners = this.formulario.controls['banners'] as FormArray;
    let banner = banners.at(indexFoto) as FormGroup;
    if(banner.controls['acao'].value !== 'I') {
      banner.controls['acao'].setValue('D');
    }
    else {
      banners.removeAt(indexFoto)
    }
  }
  aplicaCssErroLista(campoArray, campo, i){
    return{ 'has-error': this.verificaValidList(campoArray, campo, i) }
  }
  verificaValidList(campoArray, campo, i){
    var lista = this.formulario.get(campoArray) as FormArray;
    var item = lista.controls[i] as FormGroup;
    return !item.get(campo).valid;
  }
}
