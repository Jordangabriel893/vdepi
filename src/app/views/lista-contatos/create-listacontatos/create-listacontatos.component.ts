import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-create-listacontatos',
  templateUrl: './create-listacontatos.component.html',
  styleUrls: ['./create-listacontatos.component.scss']
})
export class CreateListacontatosComponent implements OnInit {
  empresas: any;
  formulario:FormGroup;
  status: any;
  loading = true;
  contato;
  contatos = [];

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
    private localeService: BsLocaleService
  ) {

   }

  ngOnInit() {

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

  }
  onSubmit(){
    const form = {
       listaContatoId:this.formulario.value.listaContatoId,
       descricao:this.formulario.value.descricao,
       empresaId:this.formulario.value.empresaId,
       contatos:this.contatos }
    console.log(form)

    this.restangular.all('marketing/listaContato').post(form).subscribe(a => {
      this.notifierService.notify('success', 'Lista criada com sucesso');
      this.router.navigate(['/listacontatos']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar lista de contato!');

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
}
