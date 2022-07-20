import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss']
})
export class EditBannerComponent implements OnInit, OnDestroy {
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
  id: any;
  cardImageBase64: any;
  isImageSaved: boolean;
  sub: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private router: Router,
    private restangular: Restangular,
    private route: ActivatedRoute,
    ) {
      this.id = this.route.snapshot.params['id']
     this.sub.push(
      this.restangular.all('cms/banner').get(this.id).subscribe(dados => {
        // this.updateForm(dados.data)
        this.updateForm(dados.data)
      })
     )
    }
  ngOnInit() {
    // this.formulario = this.formBuilder.group({
    //   banners: this.formBuilder.array([], Validators.required)
    // })

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

    this.restangular.all('cms/banner').customPUT(this.formulario.value, this.id) .subscribe(a => {
      this.notifierService.notify('success', 'Banner editado com sucesso');
      this.router.navigate(['/banner']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar o Banner!');
        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  updateForm(dados){
    this.formulario = this.formBuilder.group({
      linkUrl:dados.linkUrl,
      bannerId:dados.bannerHomerId,
      ativo:dados.ativo,
      arquivo:this.formBuilder.group({
        acesso:dados.arquivo.acesso,
        arquivoId:dados.arquivo.arquivoId,
        base64:dados.arquivo.base64,
        dataCadastro:dados.arquivo.dataCadastro,
        nome:dados.arquivo.nome,
        tamanho:dados.arquivo.tamanho,
        tipo:dados.arquivo.tipo,
        url:dados.arquivo.url,
      }),


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
                    var foto = this.formulario.get('arquivo') as FormGroup;
                    foto.get('base64').setValue(imgBase64Path);
                    foto.get('url').setValue(imgBase64Path);
                    foto.get('nome').setValue(fileInput.target.files[0].name);
                    foto.get('tamanho').setValue(fileInput.target.files[0].size);
                    foto.get('tipo').setValue(fileInput.target.files[0].type);
                    foto.get('arquivoId').setValue(0);
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
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
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
