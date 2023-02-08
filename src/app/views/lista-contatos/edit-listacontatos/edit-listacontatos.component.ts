import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-edit-listacontatos',
  templateUrl: './edit-listacontatos.component.html',
  styleUrls: ['./edit-listacontatos.component.scss']
})
export class EditListacontatosComponent implements OnInit {
  id;
  empresas: any;
  formulario:FormGroup;
  status: any;
  loading;
  file: File;
  fileName = "";
  fileOption: boolean = true;
  textoption: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id']

    this.restangular.one('empresa').get().subscribe(
      dados =>{
        this.empresas= dados.data
      });

    this.restangular.all('leilao').one('status').get().subscribe(
      dados =>{
        this.status= dados.data
      });

    this.restangular.all('marketing/ListaContato').get(this.id).subscribe(dados => {
      this.updateContatos(dados.data);
    });
  }

  onSubmit(){

    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    if (this.fileOption) {
      let formData: FormData = new FormData();
      formData.append('file', this.file)
      formData.append('descricao', this.formulario.value.descricao)
      formData.append('empresaId', this.formulario.value.empresaId)
      formData.append('listaContatoId', this.id)

      this.restangular.all('marketing/listaContato/file')
      .customPUT(formData, this.id).subscribe(a => {
        this.notifierService.notify('success', 'Lista editada com sucesso');
        this.router.navigate(['/listacontatos']);
      },
      error => {
        this.notifierService.notify('error', 'Erro ao editar lista de contato!');

        Object.keys(this.formulario.controls).forEach((campo) => {
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
    }else{

      const form = {
        listaContatoId:this.formulario.value.listaContatoId,
        descricao:this.formulario.value.descricao,
        empresaId:this.formulario.value.empresaId,
        emails: this.formulario.value.emails
      }

      this.restangular.all('marketing/ListaContato/text').customPUT(form,  this.id ) .subscribe(a => {
        this.notifierService.notify('success', 'Lista de contatos editado com sucesso');
        this.router.navigate(['/listacontatos']);
      },
        error => {
          this.notifierService.notify('error', 'Erro ao atualizar lista de contatos!');
          Object.keys(this.formulario.controls).forEach((campo)=>{
            const controle = this.formulario.get(campo)
            controle.markAsTouched()
          })
        });
    }
  }

  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }

  updateContatos(contatos){
    this.formulario = this.formBuilder.group({
      listaContatoId:[contatos.listaContatoId],
      descricao: [contatos.descricao, Validators.required],
      empresaId: [contatos.empresaId, Validators.required],
      file: [null],
      emails: [""]
    })
  }

  desativar(){
    this.restangular.all('marketing/ListaContato/Desativar').customPUT( '',this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Lista de contatos desativada com sucesso');
      this.router.navigate(['/listacontatos']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao desativar lista de contatos!');

      });
  }

  handleFile(file: File) {
    this.file = file;
  }

  showMenu(menuName: string) {
    let menus = ['fileOption', 'textOption'];
    menus.splice(menus.indexOf(menuName), 1);
    for (const menu of menus) {
      this[menu] = false;
    };
    this[menuName] = true;
  }
}
