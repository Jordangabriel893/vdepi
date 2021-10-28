import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-update-categorias',
  templateUrl: './update-categorias.component.html',
  styleUrls: ['./update-categorias.component.scss']
})
export class UpdateCategoriasComponent implements OnInit {
  formulario:FormGroup
  id

  constructor( 
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.id = this.route.snapshot.params['id']
    this.restangular.one("categoria").get().subscribe((response) => {
      const categorias = response.data
      let categoriaCorrespondente = categorias.filter(x =>x.categoriaId == this.id )
      this.updateForm(categoriaCorrespondente)
      console.log(categoriaCorrespondente)
    })


    this.formulario = this.formBuilder.group({
      categoriaId:[this.id],
      descricao:[null, Validators.required],
      ativo:[null]


    })
  }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.formulario.value)
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }
    this.restangular.all('categoria').customPUT(this.formulario.value,  this.id ) .subscribe(a => {
      this.notifierService.notify('success', 'Categoria editada com sucesso');
      this.router.navigate(['/categorias']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar a Categoria!');
        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }
  updateForm(dados){
    this.formulario.patchValue({
      categoriaId:dados[0].categoriaId,
      descricao:dados[0].descricao,
      ativo:dados[0].ativo
    })
  }
  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return {'has-error': this.verificaValidTouched(campo) }
  }
}
