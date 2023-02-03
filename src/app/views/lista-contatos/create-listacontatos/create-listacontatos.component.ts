import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BsLocaleService } from 'ngx-bootstrap';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-listacontatos',
  templateUrl: './create-listacontatos.component.html',
  styleUrls: ['./create-listacontatos.component.scss']
})
export class CreateListacontatosComponent implements OnInit {
  empresas: any;
  formulario: FormGroup;
  status: any;
  file: File;
  loading = true;
  contato;
  contatos = [];
  fileName = "";
  fileOption: boolean = true;
  textoption: boolean = false;
  sub: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private restangular: Restangular,
    private notifierService: NotifierService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.restangular.one('empresa').get().subscribe(
      dados => {
        this.empresas = dados.data
      }
    )

    this.restangular.all('leilao').one('status').get().subscribe(
      dados => {
        this.status = dados.data
      }
    )

    this.restangular.one("marketing/Contato", '').get().subscribe((response) => {
      this.contato = response.data
      this.updateContatos(response.data)
      this.loading = false;
    },
      () => this.loading = false);

  }
  onSubmit() {
    const arrayContatosIds = this.contatos.map(x => x.contatoId)

    if (this.fileOption) {
      let formData: FormData = new FormData();
      formData.append('file', this.file)
      formData.append('descricao', this.formulario.value.descricao)
      formData.append('empresaId', this.formulario.value.empresaId)

      this.restangular.all('marketing/listaContato/file')
      .customPOST(formData, undefined, undefined, {'Content-Type': undefined}).subscribe(a => {
        this.notifierService.notify('success', 'Lista criada com sucesso');
        this.router.navigate(['/listacontatos']);
      },
      error => {
        this.notifierService.notify('error', 'Erro ao criar lista de contato!');

        Object.keys(this.formulario.controls).forEach((campo) => {
          const controle = this.formulario.get(campo)
          controle.markAsTouched()
        })
      });
    } else {
      const form = {
        listaContatoId: this.formulario.value.listaContatoId,
        descricao: this.formulario.value.descricao,
        empresaId: this.formulario.value.empresaId,
        contatos: arrayContatosIds,
        emails: this.formulario.value.emails
      };

      this.restangular.all('marketing/listaContato/text').post(form).subscribe(a => {
        this.notifierService.notify('success', 'Lista criada com sucesso');
        this.router.navigate(['/listacontatos']);
      },
        error => {
          this.notifierService.notify('error', 'Erro ao criar lista de contato!');

          Object.keys(this.formulario.controls).forEach((campo) => {
            const controle = this.formulario.get(campo)
            controle.markAsTouched()
          })
        });
    }

  }
  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo) {
    return { 'has-error': this.verificaValidTouched(campo) }
  }

  onValueChange(event, campo) {
    this.formulario.get(campo).markAsTouched();
    this.formulario.get(campo).setValue(event);
  }

  updateContatos(contatos) {
    this.formulario = this.formBuilder.group({
      listaContatoId: [0],
      descricao: [null, Validators.required],
      empresaId: [null],
      contatos: this.formBuilder.array(contatos ? contatos.map(x => this.formBuilder.group({ ...x, value: false })) : [], Validators.required),
      file: [null],
      emails: [""]
    })
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
