import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Restangular } from 'ngx-restangular';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-update-leilao',
  templateUrl: './update-leilao.component.html',
  styleUrls: ['./update-leilao.component.scss'],
})
export class UpdateLeilaoComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  formulario:FormGroup
  id:any
  categorias:any
  comitentes:any
  leiloeiros:any
  empresas:any
  status;
  minDate: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService)
  {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

    this.restangular.one('categoria').get().subscribe(dados =>{
      const categoriaPai = dados.data.filter(x => x.categoriaPaiId == null)
      this.categorias = categoriaPai
    }
    )
    this.restangular.one('comitente').get().subscribe(
      dados =>{
        this.comitentes = dados.data
      }
    )
    this.restangular.one('leiloeiro').get().subscribe(
      dados =>{
        this.leiloeiros = dados.data
      }
    )
    this.restangular.one('empresa').get().subscribe(
      dados =>{
        this.empresas= dados.data
      }
    )
    this.restangular.all('leilao').one('status').get().subscribe(
      dados =>{
        this.status= dados.data
      }
    )

    this.formulario = this.formBuilder.group({
      nome:  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      titulo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      dataLeilao: [null,[Validators.required]],
      dataAberturaLance: [null, Validators.required],
      dataInicioAgendamento: [null],
      dataFimAgendamento: [null],
      dataEdital: [null],
      dataNotificacao: [null],
      dataIncioLiberacao: [null],
      dataFimLiberacao: [null],
      emailsNotificacao: [null],
      dataDiarioOficial: [null],
      numeroDiarioOficial: [null],
      foto: this.formBuilder.group({
        arquivoId:[null, [Validators.required]],
        nome:[null],
        base64:[null],
        tipo:[null],
        tamanho:[0],
        url:[]
      }, Validators.required),
      categoriaId: [null, Validators.required],
      comitenteId: [null, Validators.required],
      leiloeiroId: [null, Validators.required],
      empresaId: [null, Validators.required],
      leilaoId: [null, Validators.required],
      statusId: [null, Validators.required]
    })
  }

  ngOnInit() {
  this.id = this.route.snapshot.params['id']
   console.log(this.id )
   this.restangular.all('admin/leilao').get(this.id).subscribe(dados => {
     this.updateForm(dados.data)
   })
  }

  onSubmit(){
    // console.log(this.formulario.value)
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    this.restangular.all('leilao').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Leilão editado com sucesso');
      this.router.navigate(['/leilao']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar o Leilão!');
        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }

  updateForm(dados) {
    this.isImageSaved = true
    this.cardImageBase64 = dados.foto.url
    this.formulario.patchValue({
      nome: dados.nome,
      titulo:dados.titulo,
      dataLeilao: moment.utc(dados.dataLeilao).local().toDate(),
      dataAberturaLance: moment.utc(dados.dataAberturaLance).local().toDate(),
      dataInicioAgendamento: dados.dataInicioAgendamento ? moment.utc(dados.dataInicioAgendamento).local().toDate() : null,
      dataFimAgendamento: dados.dataFimAgendamento ? moment.utc(dados.dataFimAgendamento).local().toDate() : null,
      dataEdital: dados.dataEdital ? moment.utc(dados.dataEdital).local().toDate() : null,
      dataNotificacao: dados.dataNotificacao ? moment.utc(dados.dataNotificacao).local().toDate() : null,
      dataIncioLiberacao: dados.dataInicioLiberacao ? moment.utc(dados.dataInicioLiberacao).local().toDate() : null,
      dataFimLiberacao: dados.dataFimLiberacao ? moment.utc(dados.dataFimLiberacao).local().toDate() : null,
      dataDiarioOficial: dados.dataDiarioOficial ? moment.utc(dados.dataDiarioOficial).local().toDate() : null,
      emailsNotificacao: dados.emailsNotificacao,
      numeroDiarioOficial:dados.numeroDiarioOficial,
      arquivoId:dados.arquivoId,
      foto:{
        url: dados.foto.url,
        arquivoId: dados.foto.arquivoId,
        nome:dados.foto.nome,
        base64:dados.foto.base64,
        tipo:dados.foto.tipo,
        tamanho:dados.foto.tamanho,
      },
      categoriaId:dados.categoriaId,
      comitenteId:dados.comitenteId,
      leiloeiroId:dados.leiloeiroId,
      empresaId:dados.empresaId,
      leilaoId:dados.leilaoId,
      statusId: dados.statusId
    })
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    console.log(fileInput.target.files[0])
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
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
    return {'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
    this.formulario.get(campo).updateValueAndValidity();
  }

}
