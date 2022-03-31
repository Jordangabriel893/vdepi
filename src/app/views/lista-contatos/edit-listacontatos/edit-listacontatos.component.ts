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
    this.restangular.one("marketing/Contato", '').get({PageSize:100}).subscribe((response) => {
      this.contato = response.data
      this.updateContatos(response.data)
       console.log(response.data)
       this.loading = false;
     },
     () => this.loading = false);

    this.restangular.all('marketing/ListaContato').get(this.id).subscribe(dados => {
      this.updateContatos(dados.data);
      console.log(dados.data)
    }

    )

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

    this.restangular.all('marketing/ListaContato').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
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
    // return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
  incluirContato(contato, i){
    console.log(this.contatos.includes(contato))
        if(this.contatos.includes(contato) == false ){
          this.contatos.push(contato)
          console.log(this.contatos)
        }else{
          const retiraObjeto = this.contatos.filter(x => x.contatoId == contato.contatoId)
          const novoArray = this.contatos.filter(x => !retiraObjeto.includes(x))
          this.contatos = novoArray
          console.log(novoArray)
        }



      }
      updateContatos(contatos){
        this.formulario = this.formBuilder.group({
          listaContatoId:[0],
          descricao: [null, Validators.required],
          empresaId: [null, Validators.required],
          contatos: this.formBuilder.array(contatos ? contatos.map(x => this.formBuilder.group({ ...x, value: false })) : [], Validators.required),
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
