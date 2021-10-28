import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import { Restangular } from 'ngx-restangular';
@Component({
  selector: 'app-create-categorias',
  templateUrl: './create-categorias.component.html',
  styleUrls: ['./create-categorias.component.scss']
})
export class CreateCategoriasComponent implements OnInit {
  formulario:FormGroup
  categoriasPai;

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.restangular.one("categoria").get().subscribe((response) => {
      this.categoriasPai = response.data.filter(x => x.categoriaPaiId === null);
    })

    this.formulario = this.formBuilder.group({
      descricao:[null, Validators.required],
      categoriaPaiId: [null],
    })
  }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.formulario.value.dataCadastro)
    this.restangular.all('categoria').post(this.formulario.value).subscribe(a => {
      this.notifierService.notify('success', 'Categoria Criada com sucesso');
      this.router.navigate(['/categorias']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao criar o categoria!');

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
    return {'has-error': this.verificaValidTouched(campo) }
  }
}
