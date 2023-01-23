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
  contatos = [];
  contato = [];
  loading;
  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,

  ) {

   }

  ngOnInit() {
    this.contatos = [];
    this.contato = [];
    this.id = this.route.snapshot.params['id']

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
    this.restangular.one("marketing/Contato", '').get().subscribe((response) => {
      this.contato = response.data

       this.loading = false;
       this.restangular.all('marketing/ListaContato').get(this.id).subscribe(dados => {
        this.updateContatos(dados.data);
      }

      )
     },
     () => this.loading = false);



  }
  onSubmit(){
    const contatosSelecionados = this.formulario.value.contatos.filter(x => x.value == true)
    const arrayContatosIds = contatosSelecionados.map(x => x.contatoId)
    const form = {
       listaContatoId:this.formulario.value.listaContatoId,
       descricao:this.formulario.value.descricao,
       empresaId:this.formulario.value.empresaId,
       contatos:arrayContatosIds }

    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    this.restangular.all('marketing/ListaContato').customPUT(form,  this.id ) .subscribe(a => {
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
        let listaContatos = contatos.contatos
        for(let i = 0; i < this.contato.length; i ++ ){
          for(let i = 0; i < this.contato.length; i ++ ){

            if(listaContatos[i] == this.contato[i].contatoId){
              this.contato[i] = {...this.contato[i], value:true}
            }
            if(listaContatos[i] != this.contato[i].contatoId){
              this.contato[i] = {...this.contato[i], value:false}
            }
          }
        }
        this.formulario = this.formBuilder.group({
          listaContatoId:[contatos.listaContatoId],
          descricao: [contatos.descricao, Validators.required],
          empresaId: [contatos.empresaId, Validators.required],
          contatos: this.formBuilder.array(this.contato ? this.contato.map(x => this.formBuilder.group({ ...x })) : [], Validators.required),
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


}
