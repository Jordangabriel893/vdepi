import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConsultaCepService } from 'app/views/usuarios/shared/consulta-cep/consulta-cep.service';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-criar-tipo-foto',
  templateUrl: './criar-tipo-foto.component.html',
  styleUrls: ['./criar-tipo-foto.component.scss']
})
export class CriarTipoFotoComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      descricao: [null, Validators.required],
      visivelSite: [false, Validators.required],
      obrigatorio: [false, Validators.required],
      vistoria: [false, Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.restangular
      .all('TipoFoto')
      .post(this.formulario.value)
      .subscribe(
        (a) => {
          this.notifierService.notify(
            'success',
            'Tipo de foto criado com sucesso'
          );
          this.router.navigate(['/tipo-foto']);
        },
        (error) => {
          this.notifierService.notify(
            'error',
            'Erro ao criar o tipo de foto!'
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
