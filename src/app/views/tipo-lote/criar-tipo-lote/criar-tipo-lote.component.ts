import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-criar-tipo-lote',
  templateUrl: './criar-tipo-lote.component.html',
  styleUrls: ['./criar-tipo-lote.component.scss']
})
export class CriarTipoLoteComponent implements OnInit {

  formulario: FormGroup;
  categorias: [];
  categoriasAgrupadas: any[] = [];
  regras: [];

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      descricao: [null, Validators.required],
      categoriaId: [null, Validators.required],
      regraHabilitacaoId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getCategorias();
    this.getRegras();
  }

  getCategorias() {
    this.restangular.one('categoria').get().subscribe((res) => {
      this.categorias = res.data;

      // agrupa as categorias por pai
      this.categoriasAgrupadas = this.categorias.reduce((result, categoria: any) => {
        const categoriaPaiId = categoria.categoriaPaiId;
        if (!categoriaPaiId) {// se for pai
          result.push({ label: categoria.descricao, id: categoria.categoriaId, filhos: [] }); // cria um novo pai com array de filhos
        } else {// se for filho
          const pai = result.find(item => item.id === categoriaPaiId);// recupera o pai
          if (pai) {
            pai.filhos.push(categoria);// adiciona o filho ao pai
          }
        }
        return result;
      }, []);

      // Ordenar categorias e filhos em ordem alfabética
      this.categoriasAgrupadas.sort((a, b) => a.label.localeCompare(b.label));
      this.categoriasAgrupadas.forEach(categoria => {
        categoria.filhos.sort((a, b) => a.descricao.localeCompare(b.descricao));
      });
      
      console.log(this.categoriasAgrupadas);
    });
  }

  getRegras() {
    this.restangular.one('habilitacao/regras').get().subscribe((res) => {
      this.regras = res.data;
    });
  }

  onSubmit() {
    this.restangular
      .all('tipoLote')
      .post(this.formulario.value)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Tipo de lote criado com sucesso'
          );
          this.router.navigate(['/tipo-lote']);
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao criar o tipo de lote!'
          );

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo);
            controle.markAsTouched();
          });
        }
      );
  }

  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) };
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }
}
