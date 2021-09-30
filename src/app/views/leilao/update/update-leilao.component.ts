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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService)
  {

    this.restangular.one('categoria').get().subscribe(dados =>{
     
      this.categorias = dados.data
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
        arquivoId:[0],
        nome:[null, Validators.required],
        base64:[null, Validators.required],
        tipo:[null, Validators.required],
        tamanho:[null, Validators.required]
        
      }),
      categoriaId: [null, Validators.required],
      comitenteId: [null, Validators.required],
      leiloeiroId: [null, Validators.required],
      empresaId: [null, Validators.required],
      leilaoId: [null]

    })



    

  }

  ngOnInit() {
  this.id = this.route.snapshot.params['id']
   console.log(this.id )
   this.restangular.all('leilao').get( this.id).subscribe(dados => {
     console.log(dados),
     this.updateForm(dados)
   })
   

  }

  onSubmit(){
    console.log(this.formulario.value)
    this.restangular.all('leilao').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Leilão Criado com sucesso');
      this.router.navigateByUrl('/leilao');
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar o Leilão!');
      });
  }

  updateForm(dados) {
    this.formulario.patchValue({
      nome: dados.nome,
      titulo:dados.titulo,
      dataLeilao: moment(dados.dataLeilao).format("YYYY-MM-DD"),
      dataAberturaLance: moment(dados.dataAberturaLance).format("YYYY-MM-DD"),
      dataInicioAgendamento:moment(dados.dataInicioAgendamento).format("YYYY-MM-DD"),
      dataFimAgendamento:moment(dados.dataFimAgendamento).format("YYYY-MM-DD"),
      dataEdital:moment(dados.dataEdital).format("YYYY-MM-DD"),
      dataNotificacao:moment(dados.dataNotificacao).format("YYYY-MM-DD"),
      dataIncioLiberacao:moment(dados.dataInicioLiberacao).format("YYYY-MM-DD"),
      dataFimLiberacao:moment(dados.dataFimLiberacao).format("YYYY-MM-DD"),
      emailsNotificacao:dados.emailsNotificacao,
      dataDiarioOficial:moment(dados.dataDiarioOficial).format("YYYY-MM-DD"),
      numeroDiarioOficial:dados.numeroDiarioOficial,
      arquivoId:dados.arquivoId,
      categoriaId:dados.categoriaId,
      comitenteId:dados.comitenteId,
      leiloeiroId:dados.leiloeiroId,
      empresaId:dados.empresaId,
      leilaoId:dados.leilaoId,


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
                    this.formulario.value.foto.base64 = this.cardImageBase64.substring(23, 100000) 
                    this.formulario.value.foto.nome = fileInput.target.files[0].name
                    this.formulario.value.foto.tamanho = fileInput.target.files[0].size
                    this.formulario.value.foto.tipo = fileInput.target.files[0].type
                    console.log(fileInput.target.files[0])
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}
 

}
