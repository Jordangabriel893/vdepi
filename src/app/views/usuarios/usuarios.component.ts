import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios:any;
  usuarioSearch;
  usuarioComLetraMinuscula;
  usuariosImutaveis;
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
  queryField = new FormControl();
  results:any;

  constructor(
    private restangular: Restangular,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.restangular.one("usuario").get().subscribe((response) => {
      const usuario = response.data
      this.usuariosImutaveis = usuario
      this.usuarios = usuario;
      this.usuarioComLetraMinuscula = this.usuarios;
      console.log(this.usuarioComLetraMinuscula)
      this.usuarios.sort( (a, b )=>{
        if (a.nomeCompleto > b.nomeCompleto) {
          return 1;
        }
        if (a.nomeCompleto < b.nomeCompleto) {
          return -1;
        }
        return 0;
      })
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

  onSearch(){
    let value = this.queryField.value
    //se o usaurio nao digitou nada e a busca é diferente de vazio
    const usuarioComLetraMinuscula = this.usuarioComLetraMinuscula
    usuarioComLetraMinuscula.forEach(element => {
      element.nomeCompleto =  element.nomeCompleto.toLowerCase();
      element.email =  element.email.toLowerCase()
    });
    let filtraValorPorNome = usuarioComLetraMinuscula.filter(objNome => objNome.nomeCompleto.includes(value))
    let filtraValorPorDocumento = usuarioComLetraMinuscula.filter(objDocumento => objDocumento.numeroDocumento.includes(value))
    let filtraValorPorEmail = usuarioComLetraMinuscula.filter(objEmail => objEmail.email.includes(value))
    if (value && (value = value.trim()) !== '') {
        let arraySearch = [...filtraValorPorNome, ...filtraValorPorDocumento, ...filtraValorPorEmail]
        this.usuarioSearch = arraySearch
  }
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
