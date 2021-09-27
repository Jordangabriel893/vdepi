import * as moment from 'moment';
import { DatePipe, formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Restangular } from 'ngx-restangular';



@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss'],
  providers: [DatePipe]
})
export class CriarComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  formulario:FormGroup

  today: string = moment().format();
  dataAtual:any;
  categorias:any
  comitentes:any
  leiloeiros:any
  empresas:any

  constructor( 
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private datePipe: DatePipe,
  
    ) { }

  ngOnInit() {

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
      nome: [null, Validators.required],
      titulo: [null, Validators.required],
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
        base64:[this.cardImageBase64, Validators.required],
        tipo:[null, Validators.required],
        tamanho:[null, Validators.required]
        
      }),
      categoriaId: [1, Validators.required],
      comitenteId: [1, Validators.required],
      leiloeiroId: [1, Validators.required],
      empresaId: [1, Validators.required],

    })

  }
  onSubmit(){
    this.datePipe.transform(this.formulario.value.dataLeilao, 'dd/MM/yyyy')
    this.datePipe.transform(this.formulario.value.dataAberturaLance, 'dd/MM/yyyy')
    
    const ehMaiorOuIgualLeilao = moment(this.formulario.value.dataLeilao).isSameOrAfter(this.today);
    const ehMaiorOuIgualLances = moment(this.formulario.value.dataAberturaLance).isSameOrAfter(this.today);
    const ehMenorOuIgualLancesToday = moment(this.formulario.value.dataAberturaLance).isSameOrBefore(this.formulario.value.dataLeilao);

    if(ehMaiorOuIgualLeilao === true && ehMaiorOuIgualLances === true && ehMenorOuIgualLancesToday === true){

      this.restangular.all('leilao').post(this.formulario.value).subscribe(dados => console.log(dados))
    }
    
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
