import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios:any
  filtroUsuarios
  loading = true;
  nome
  listaFiltradaPorNome
  nomeSetado
  documento
  documentoSetado
  descricaoDocumento
  listaFiltradaPorDocumentoENome
  listaFiltradaPorDocumento
  email
  emailSetado
  listaFiltradaPorNomeEEmail
  listaFiltradaPorEmail


  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.restangular.one("usuario").get().subscribe((response) => {
      const usuario = response.data
      this.usuarios = usuario;
      this.filtroUsuarios = usuario
      this.nome = usuario.map(x => x.nomeCompleto)
      this.nome.sort()
      this.documento = usuario.map(x => x.numeroDocumento)
      this.email = usuario.map(x => x.email.toLowerCase())
      this.email.sort()
      console.log(this.email)
      this.loading = false;
    },
    () => this.loading = false);
  }
  edit(id) {
    this.router.navigate(['/update-usuarios', id], { relativeTo: this.route });
  }

  setNome(item){
    this.nomeSetado = item
    this.listaFiltradaPorNome = this.filtroUsuarios.filter(x => x.nomeCompleto == item)
    console.log(this.listaFiltradaPorNome)
    this.documento = this.listaFiltradaPorNome.map(x => x.numeroDocumento)
    this.email =this.listaFiltradaPorNome.map(x => x.email)
    this.usuarios = this.listaFiltradaPorNome
  }
  setDocumento(item){
    this.documentoSetado = item
    if(this.nomeSetado){
    this.listaFiltradaPorDocumentoENome =  this.listaFiltradaPorNome.filter(x => x.numeroDocumento == item)
    this.usuarios = this.listaFiltradaPorDocumentoENome
    }else{
      this.listaFiltradaPorDocumento = this.filtroUsuarios.filter(x => x.numeroDocumento == item)
    }

  }
  setEmail(item){
    this.emailSetado = item
    if(this.nomeSetado){
    this.listaFiltradaPorNomeEEmail = this.listaFiltradaPorNome.filter(x => x.email == item)
      this.usuarios = this.listaFiltradaPorNomeEEmail
    }else{
     this.listaFiltradaPorEmail= this.filtroUsuarios.filter(x => x.email == item)
     this.usuarios = this.listaFiltradaPorEmail
    }
  }
}
