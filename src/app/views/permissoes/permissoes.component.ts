import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.scss']
})
export class PermissoesComponent implements OnInit {
  formulario: FormGroup;
  permissoes: any;
  perfis: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,) {
    this.restangular.one("permissao/funcionalidade").get().subscribe((response) => {
      this.permissoes = response.data;
      this.updateFrameworks(response.data)
    })
    this.restangular.one("usuario/perfis").get().subscribe((response) => {
      this.perfis = response.data
    })
  }

  ngOnInit() {

  }
  onSubmit() {
    const funcionalidades = this.formulario.value.funcionalidades
    const funcionalidadesSelecionadas = funcionalidades.filter(x => x.selecionado == true )
    const arrayfuncionalideId = funcionalidadesSelecionadas.map(funcionalidade => funcionalidade.funcionalideId)
    const formulario = {
      perfilId:this.formulario.value.perfilId,
      funcionalidades:arrayfuncionalideId,
    }
    if(!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach((campo)=>{
        const controle = this.formulario.get(campo)
        controle.markAsTouched()

      })
      this.notifierService.notify('error', 'Preencha todos os campos obrigatórios');
      return false;
    }

    this.restangular.all('permissao').customPUT(formulario) .subscribe(a => {
      this.notifierService.notify('success', 'Permissões editadas com sucesso');
      this.router.navigate(['/permissao']);
    },
      error => {
        this.notifierService.notify('error', 'Erro ao atualizar as permissões!');
        Object.keys(this.formulario.controls).forEach((campo)=>{
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
  }

  updateFrameworks(permissoes) {
    this.formulario = this.formBuilder.group({
      perfilId: [null, Validators.required],
      funcionalidades: this.formBuilder.array(permissoes ? permissoes.map(x => this.formBuilder.group({ ...x, selecionado: false })) : [], Validators.required)
    })
  }

  valueChange(event) {
    const perfil = event.target.value
    const formulario = this.formulario.value
    this.restangular.all('permissao').get(perfil).subscribe(dados => {
      const codigoDeFuncionalidadesPerfil = dados.data.funcionalidades.map(x => x.codigo)
      this.formulario = this.formBuilder.group({
        perfilId: [formulario.perfilId, Validators.required],
        funcionalidades: this.formBuilder.array(this.permissoes ? this.permissoes.map(x => {
          if (codigoDeFuncionalidadesPerfil.includes(x.codigo)) {
            return this.formBuilder.group({ ...x, selecionado: true })
          } else {
            return this.formBuilder.group({ ...x, selecionado: false })
          }
        }) : [], Validators.required)
      })
    },
      error => {
        this.notifierService.notify('error', 'Erro ao buscar permissões deste perfil!');
        this.formulario = this.formBuilder.group({
          perfilId: [formulario.perfilId, Validators.required],
          funcionalidades: this.formBuilder.array(this.permissoes ? this.permissoes.map(x => this.formBuilder.group({ ...x, selecionado: false })) : [], Validators.required)
        })


      }
    )
  }


}
