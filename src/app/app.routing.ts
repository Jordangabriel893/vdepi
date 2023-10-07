import { AssinaturaComponent } from './views/assinatura/assinatura.component';
import { CreateDocumentoTemplateComponent } from './views/documento-template/create-documento-template/create-documento-template.component';
import { CreateTipodocumentoComponent } from './views/tipo-documento/create-tipodocumento/create-tipodocumento.component';
import { TipoDocumentoComponent } from './views/tipo-documento/tipo-documento.component';
import { UpdatePaginaestaticaComponent } from './views/pagina-estatica/update-paginaestatica/update-paginaestatica.component';
import { CreatePaginaestaticaComponent } from './views/pagina-estatica/create-paginaestatica/create-paginaestatica.component';
import { PaginaEstaticaComponent } from './views/pagina-estatica/pagina-estatica.component';
import { LogComponent } from './views/notificacoes/log/log.component';
import { UpdateConfiguracaoComponent } from './views/configuracao/update-configuracao/update-configuracao.component';
import { ConfiguracaoComponent } from './views/configuracao/configuracao.component';
import { CreateFaturaComponent } from './views/fatura/create-fatura/create-fatura.component';
import { FaturaComponent } from './views/fatura/fatura.component';
import { UpdateContaComponent } from './views/conta/update-conta/update-conta.component';
import { CreateContaComponent } from './views/conta/create-conta/create-conta.component';
import { ContaComponent } from './views/conta/conta.component';
import { UpdateTemplateComponent } from './views/template/update-template/update-template.component';
import { CreateTemplateComponent } from './views/template/create-template/create-template.component';
import { TemplateComponent } from './views/template/template.component';
import { PermissoesComponent } from './views/permissoes/permissoes.component';
import { EditBannerComponent } from './views/banner/edit-banner/edit-banner.component';
import { CreateBannerComponent } from './views/banner/create-banner/create-banner.component';
import { BannerComponent } from './views/banner/banner.component';
import { EditListacontatosComponent } from './views/lista-contatos/edit-listacontatos/edit-listacontatos.component';
import { EditContatosComponent } from './views/contatos/edit-contatos/edit-contatos.component';
import { CreateContatosComponent } from './views/contatos/create-contatos/create-contatos.component';
import { CreateListacontatosComponent } from './views/lista-contatos/create-listacontatos/create-listacontatos.component';
import { CreateAgendaComponent } from './views/agenda/create-agenda/create-agenda.component';
import { AgendaComponent } from './views/agenda/agenda.component';
import { EditTiponotificacaoComponent } from './views/tipo-de-notificacao/edit-tiponotificacao/edit-tiponotificacao.component';
import { EditTipomeionotificacaoComponent } from './views/tipo-meio-notificacao/edit-tipomeionotificacao/edit-tipomeionotificacao.component';
import { CreateTiponotificacaoComponent } from './views/tipo-de-notificacao/create-tiponotificacao/create-tiponotificacao.component';
import { CreateTipomeionotificacaoComponent } from './views/tipo-meio-notificacao/create-tipomeionotificacao/create-tipomeionotificacao.component';
import { CreateNotificacaoComponent } from './views/notificacoes/create-notificacao/create-notificacao.component';
import { NotificacoesComponent } from './views/notificacoes/notificacoes.component';
import { ListaContatosComponent } from './views/lista-contatos/lista-contatos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonyGuard, AuthGuard } from './_guards/index';

// Import Containers
import { FullLayoutComponent } from './containers';

import {
  LoginComponent,
  AccessDeniedComponent,
  NotasFiscaisComponent,
  LeilaoComponent,
  CreateLeilaoComponent,
  UpdateLeilaoComponent,
  MapaLanceComponent,
} from './views';

import { SourceGuard } from './_guards/source.guard';
import { HomeComponent } from './views/home';
import { LotesComponent } from './views/leilao/lotes/lotes.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { UpdateUsuariosComponent } from './views/usuarios/update-usuarios/update-usuarios.component';
import { UpdateLotesComponent } from './views/leilao/lotes/update-lotes/update-lotes.component';
import { HabilitacaoComponent } from './views/habilitacao/habilitacao.component';
import { CreateLotesComponent } from './views/leilao/lotes/create-lotes/create-lotes.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ArrematantesComponent } from './views/arrematantes/arrematantes.component';

import { LancesConsolidadoComponent } from './views/lances-consolidado/lances-consolidado.component';
import { EmpresasComponent } from './views/empresas/empresas.component';
import { ComitentesComponent } from './views/comitentes/comitentes.component';
import { LeiloeirosComponent } from './views/leiloeiros/leiloeiros.component';
import { LocaisComponent } from './views/locais/locais.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { VistoriaComponent } from './views/vistoria/vistoria.component';
import { CreateComitenteComponent } from './views/comitentes/create-comitente/create-comitente.component';
import { UpdateEmpresaComponent } from './views/empresas/update-empresa/update-empresa.component';
import { CreateEmpresaComponent } from './views/empresas/create-empresa/create-empresa.component';
import { UpdateComitenteComponent } from './views/comitentes/update-comitente/update-comitente.component';
import { UpdateLeiloeirosComponent } from './views/leiloeiros/update-leiloeiros/update-leiloeiros.component';
import { CreateLeiloeirosComponent } from './views/leiloeiros/create-leiloeiros/create-leiloeiros.component';
import { UpdateLocalComponent } from './views/locais/update-local/update-local.component';
import { CreateLocalComponent } from './views/locais/create-local/create-local.component';
import { UpdateCategoriasComponent } from './views/categorias/update-categorias/update-categorias.component';
import { CreateCategoriasComponent } from './views/categorias/create-categorias/create-categorias.component';
import { StatusLeilaoComponent } from './views/status-leilao/status-leilao.component';
import { StatusLoteComponent } from './views/status-lote/status-lote.component';
import { HistoricoLancesComponent } from './views/historico-lances/historico-lances.component';
import { ContatosComponent } from './views/contatos/contatos.component';
import { TipoMeioNotificacaoComponent } from './views/tipo-meio-notificacao/tipo-meio-notificacao.component';
import { TipoDeNotificacaoComponent } from './views/tipo-de-notificacao/tipo-de-notificacao.component';
import { EditNotificacaoComponent } from './views/notificacoes/edit-notificacao/edit-notificacao.component';
import { UpdateAgendaComponent } from './views/agenda/update-agenda/update-agenda.component';
import { LotesVistoriaComponent } from './views/vistoria/lotes/lotes-vistoria.component';
import { CreateUsuariosComponent } from './views/usuarios/create-usuarios/create-usuarios.component';
import { CreateConfiguracaoComponent } from './views/configuracao/create-configuracao/create-configuracao.component';
import { AgendamentoComponent } from './views/agendamento/agendamento.component';
import { EditTipodocumentoComponent } from './views/tipo-documento/edit-tipodocumento/edit-tipodocumento.component';
import { DocumentoTemplateComponent } from './views/documento-template/documento-template.component';
import { EditDocumentoTemplateComponent } from './views/documento-template/edit-documento-template/edit-documento-template.component';
import { GerenciadorDocumentosComponent } from './views/gerenciador-documentos/gerenciador-documentos.component';
import { CreateDocumentoComponent } from './views/gerenciador-documentos/create-documento/create-documento.component';
import { CreateAgendamentoComponent } from './views/agendamento/create/create-agendamento.component';
import { GerencialComponent } from './views/gerencial/gerencial.component';
import { CriarTipoLoteComponent } from './views/tipo-lote/criar-tipo-lote/criar-tipo-lote.component';
import { AtualizarTipoLoteComponent } from './views/tipo-lote/atualizar-tipo-lote/atualizar-tipo-lote.component';
import { TipoLoteComponent } from './views/tipo-lote/tipo-lote.component';
import { CriarLoteCampoComponent } from './views/lote-campo/criar-lote-campo/criar-lote-campo.component';
import { AtualizarLoteCampoComponent } from './views/lote-campo/atualizar-lote-campo/atualizar-lote-campo.component';
import { LoteCampoComponent } from './views/lote-campo/lote-campo.component';
import { CriarTipoFotoComponent } from './views/tipo-foto/criar-tipo-foto/criar-tipo-foto.component';
import { AtualizarTipoFotoComponent } from './views/tipo-foto/atualizar-tipo-foto/atualizar-tipo-foto.component';
import { TipoFotoComponent } from './views/tipo-foto/tipo-foto.component';
import { JuizoComponent } from './views/juizo/juizo.component';
import { CreateJuizoComponent } from './views/juizo/create-juizo/create-juizo.component';
import { UpdateJuizoComponent } from './views/juizo/update-juizo/update-juizo.component';
import { CreateVaraComponent } from './views/vara/create-vara/create-vara.component';
import { UpdateVaraComponent } from './views/vara/update-vara/update-vara.component';
import { VaraComponent } from './views/vara/vara.component';
import { UpdateAdvogadoComponent } from './views/advogado/update-advogado/update-advogado.component';
import { CreateAdvogadoComponent } from './views/advogado/create-advogado/create-advogado.component';
import { AdvogadoComponent } from './views/advogado/advogado.component';
import { JuizComponent } from './views/juiz/juiz.component';
import { CreateJuizComponent } from './views/juiz/create-juiz/create-juiz.component';
import { UpdateJuizComponent } from './views/juiz/update-juiz/update-juiz.component';
import { EscrivaoComponent } from './views/escrivao/escrivao.component';
import { CreateEscrivaoComponent } from './views/escrivao/create-escrivao/create-escrivao.component';
import { UpdateEscrivaoComponent } from './views/escrivao/update-escrivao/update-escrivao.component';
import { ReuComponent } from './views/reu/reu.component';
import { CreateReuComponent } from './views/reu/create-reu/create-reu.component';
import { UpdateReuComponent } from './views/reu/update-reu/update-reu.component';
import { AutorComponent } from './views/autor/autor.component';
import { CreateAutorComponent } from './views/autor/create-autor/create-autor.component';
import { UpdateAutorComponent } from './views/autor/update-autor/update-autor.component';
import { ParteComponent } from './views/parte/parte.component';
import { CreateParteComponent } from './views/parte/create-parte/create-parte.component';
import { UpdateParteComponent } from './views/parte/update-parte/update-parte.component';
import { UpdateCredorComponent } from './views/credor/update-credor/update-credor.component';
import { CreateCredorComponent } from './views/credor/create-credor/create-credor.component';
import { CredorComponent } from './views/credor/credor.component';
import { FielDepositarioComponent } from './views/fiel-depositario/fiel-depositario.component';
import { CreateFielDepositarioComponent } from './views/fiel-depositario/create-fiel-depositario/create-fiel-depositario.component';
import { UpdateFielDepositarioComponent } from './views/fiel-depositario/update-fiel-depositario/update-fiel-depositario.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home',
        },
        canActivate: [AnonyGuard],
      },
      {
        path: 'relatorios/notasfiscais',
        component: NotasFiscaisComponent,
        data: {
          title: 'Notas Fiscais',
          source: 'RelatorioNotasFiscais',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'leilao',
        component: LeilaoComponent,
        data: {
          title: 'Leilões',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-leilao',
        component: CreateLeilaoComponent,
        data: {
          title: 'Novo Leilao',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-leilao/:id',
        component: UpdateLeilaoComponent,
        data: {
          title: 'Editar Leilao',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'lotes/:id',
        component: LotesComponent,
        data: {
          title: 'Lotes',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'vistoria-lotes/:id',
        component: LotesVistoriaComponent,
        data: {
          title: 'Vistoria Lotes',
          source: 'VISTORIA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'lotes/:id',
        component: LotesComponent,
        data: {
          title: 'Lotes',
          source: 'RelatorioEstoque',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-lotes/:id',
        component: CreateLotesComponent,
        data: {
          title: 'Novo Lote',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-lotes/:id',
        component: UpdateLotesComponent,
        data: {
          title: 'Editar Lote',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'habilitacao',
        component: HabilitacaoComponent,
        data: {
          title: 'Habilitação',
          source: 'HABILITACAO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'vistoria',
        component: VistoriaComponent,
        data: {
          title: 'Vistoria',
          source: 'VISTORIA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'fatura',
        component: FaturaComponent,
        data: {
          title: 'Faturas',
          source: 'FATURA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-fatura',
        component: CreateFaturaComponent,
        data: {
          title: 'Nova Fatura',
          source: 'FATURA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'gerenciador-documentos',
        component: GerenciadorDocumentosComponent,
        data: {
          title: 'Gerenciador de Documentos',
          source: 'GERENCIADOR_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-documento',
        component: CreateDocumentoComponent,
        data: {
          title: 'Novo Documento',
          source: 'GERENCIADOR_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          source: 'DASHBOARD',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'mapa-lance',
        component: MapaLanceComponent,
        data: {
          title: 'Mapa de Lances',
          source: 'MAPA_LANCES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'historicolances',
        component: HistoricoLancesComponent,
        data: {
          title: 'Histórico de Lances',
          source: 'HISTORICO_LANCES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'lancesconsolidado',
        component: LancesConsolidadoComponent,
        data: {
          title: 'Lotes Consolidados',
          source: 'LANCES_CONSOLIDADOS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'arrematantes',
        component: ArrematantesComponent,
        data: {
          title: 'Arrematantes',
          source: 'ARREMATANTES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'gerencial',
        component: GerencialComponent,
        data: {
          title: 'Gerencial',
          source: 'GERENCIAL',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'listacontatos',
        component: ListaContatosComponent,
        data: {
          title: 'Lista de Contatos',
          source: 'LISTA_CONTATOS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'edit-listacontatos/:id',
        component: EditListacontatosComponent,
        data: {
          title: 'Editar Lista de Contatos',
          source: 'LISTA_CONTATOS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-listacontatos',
        component: CreateListacontatosComponent,
        data: {
          title: 'Nova Lista de Contatos',
          source: 'LISTA_CONTATOS',
        },
        canActivate: [SourceGuard],
      },

      {
        path: 'contatos',
        component: ContatosComponent,
        data: {
          title: 'Contatos',
          source: 'CONTATOS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-contatos',
        component: CreateContatosComponent,
        data: {
          title: 'Novo Contato',
          source: 'CONTATOS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'edit-contatos/:id',
        component: EditContatosComponent,
        data: {
          title: 'Editar Contatos',
          source: 'CONTATOS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'notificacoes',
        component: NotificacoesComponent,
        data: {
          title: 'Notificações',
          source: 'NOTIFICACOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-notificacoes/:id',
        component: EditNotificacaoComponent,
        data: {
          title: 'Editar Notificação',
          source: 'NOTIFICACOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-notificacoes',
        component: CreateNotificacaoComponent,
        data: {
          title: 'Nova Notificação',
          source: 'NOTIFICACOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'log-notificacoes/:id',
        component: LogComponent,
        data: {
          title: 'Visualizar Log',
          source: 'NOTIFICACOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'tipomeionotificao',
        component: TipoMeioNotificacaoComponent,
        data: {
          title: 'Tipo Meio Notificação',
          source: 'MEIO_NOTIFICACAO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-tipomeionotificao/:id',
        component: EditTipomeionotificacaoComponent,
        data: {
          title: 'Editar Tipo Meio Notificação',
          source: 'MEIO_NOTIFICACAO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-tipomeionotificao',
        component: CreateTipomeionotificacaoComponent,
        data: {
          title: 'Novo Tipo Meio Notificação',
          source: 'MEIO_NOTIFICACAO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'tiponotificacao',
        component: TipoDeNotificacaoComponent,
        data: {
          title: 'Tipo de Notificação',
          source: 'TIPO_NOTIFICACAO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-tiponotificacao',
        component: CreateTiponotificacaoComponent,
        data: {
          title: 'Novo Tipo de Notificação',
          source: 'TIPO_NOTIFICACAO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-tiponotificacao/:id',
        component: EditTiponotificacaoComponent,
        data: {
          title: 'Editar Tipo De Notificação',
          source: 'TIPO_NOTIFICACAO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'agenda',
        component: AgendaComponent,
        data: {
          title: 'Agenda',
          source: 'AGENDA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-agenda',
        component: CreateAgendaComponent,
        data: {
          title: 'Nova Agenda',
          source: 'AGENDA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-agenda/:id',
        component: UpdateAgendaComponent,
        data: {
          title: 'Editar Agenda',
          source: 'AGENDA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'agendamento',
        component: AgendamentoComponent,
        data: {
          title: 'Agendamentos de Retirada',
          source: 'AGENDAMENTO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-agendamento',
        component: CreateAgendamentoComponent,
        data: {
          title: 'Criar agendamento',
          source: 'AGENDAMENTO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'configuracao',
        component: ConfiguracaoComponent,
        data: {
          title: 'Configuração do Agendamento',
          source: 'CONFIG_AGENDAMENTO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-configuracao',
        component: CreateConfiguracaoComponent,
        data: {
          title: 'Criar Configuração do Agendamento',
          source: 'CONFIG_AGENDAMENTO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-configuracao/:id',
        component: UpdateConfiguracaoComponent,
        data: {
          title: 'Editar Configuração do Agendamento',
          source: 'CONFIG_AGENDAMENTO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'paginaEstatica',
        component: PaginaEstaticaComponent,
        data: {
          title: 'Página Estática',
          source: 'PAGINA_ESTATICA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-paginaestatica',
        component: CreatePaginaestaticaComponent,
        data: {
          title: 'Criar Página Estática',
          source: 'PAGINA_ESTATICA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-paginaestatica/:id',
        component: UpdatePaginaestaticaComponent,
        data: {
          title: 'Editar Página Estática',
          source: 'PAGINA_ESTATICA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'template',
        component: TemplateComponent,
        data: {
          title: 'Template',
          source: 'AGENDA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-template',
        component: CreateTemplateComponent,
        data: {
          title: 'Novo Template',
          source: 'AGENDA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-template/:id',
        component: UpdateTemplateComponent,
        data: {
          title: 'Editar Template',
          source: 'AGENDA',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'permissao',
        component: PermissoesComponent,
        data: {
          title: 'Permissão',
          source: 'USUARIO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          title: 'Usuários',
          source: 'USUARIO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-usuario',
        component: CreateUsuariosComponent,
        data: {
          title: 'Novo Usuário',
          source: 'USUARIO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-usuarios/:id',
        component: UpdateUsuariosComponent,
        data: {
          title: 'Editar Usuário',
          source: 'USUARIO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'empresa',
        component: EmpresasComponent,
        data: {
          title: 'Empresas',
          source: 'EMPRESAS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-empresa',
        component: CreateEmpresaComponent,
        data: {
          title: 'Nova Empresa',
          source: 'EMPRESAS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-empresa/:id',
        component: UpdateEmpresaComponent,
        data: {
          title: 'Editar Empresa',
          source: 'EMPRESAS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'comitente',
        component: ComitentesComponent,
        data: {
          title: 'Comitente',
          source: 'COMITENTES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-comitente',
        component: CreateComitenteComponent,
        data: {
          title: 'Novo Comitente',
          source: 'COMITENTES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-comitente/:id',
        component: UpdateComitenteComponent,
        data: {
          title: 'Editar Comitente',
          source: 'COMITENTES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'leiloeiro',
        component: LeiloeirosComponent,
        data: {
          title: 'Leiloeiros',
          source: 'LEILOEIROS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-leiloeiro',
        component: CreateLeiloeirosComponent,
        data: {
          title: 'Novo Leiloeiro',
          source: 'LEILOEIROS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-leiloeiro/:id',
        component: UpdateLeiloeirosComponent,
        data: {
          title: 'Editar Leiloeiro',
          source: 'LEILOEIROS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'local',
        component: LocaisComponent,
        data: {
          title: 'Locais',
          source: 'LOCAIS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-local',
        component: CreateLocalComponent,
        data: {
          title: 'Novo Local',
          source: 'LOCAIS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-local/:id',
        component: UpdateLocalComponent,
        data: {
          title: 'Editar Local',
          source: 'LOCAIS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
        data: {
          title: 'Categorias',
          source: 'CATEGORIAS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-categoria',
        component: CreateCategoriasComponent,
        data: {
          title: 'Nova Categoria',
          source: 'CATEGORIAS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-categorias/:id',
        component: UpdateCategoriasComponent,
        data: {
          title: 'Editar Categoria',
          source: 'CATEGORIAS',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'statusLote',
        component: StatusLoteComponent,
        data: {
          title: 'Status Lote',
          source: 'STATUS_LOTE',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'statusLeilao',
        component: StatusLeilaoComponent,
        data: {
          title: 'Status Leilão',
          source: 'STATUS_LEILAO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'banner',
        component: BannerComponent,
        data: {
          title: 'Banner',
          source: 'BANNER',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-banner',
        component: CreateBannerComponent,
        data: {
          title: 'Novo Banner',
          source: 'BANNER',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'edit-banner/:id',
        component: EditBannerComponent,
        data: {
          title: 'Editar Banner',
          source: 'BANNER',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'tipodocumento',
        component: TipoDocumentoComponent,
        data: {
          title: 'Tipo de Documento',
          source: 'TIPO_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-tipodocumento',
        component: CreateTipodocumentoComponent,
        data: {
          title: 'Novo Tipo de Documento',
          source: 'TIPO_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'edit-tipodocumeto/:id',
        component: EditTipodocumentoComponent,
        data: {
          title: 'Editar Tipo de Documento',
          source: 'TIPO_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'documentotemplate',
        component: DocumentoTemplateComponent,
        data: {
          title: 'Template de Documento',
          source: 'TEMPLATE_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-documentotemplate',
        component: CreateDocumentoTemplateComponent,
        data: {
          title: 'Novo Template de Documento',
          source: 'TEMPLATE_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'edit-documentotemplate/:id',
        component: EditDocumentoTemplateComponent,
        data: {
          title: 'Editar Template de Documento',
          source: 'TEMPLATE_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'gerenciadordocumento',
        component: GerenciadorDocumentosComponent,
        data: {
          title: 'Gerenciador de Documentos',
          source: 'GERENCIADOR_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-gerenciadordocumento',
        component: CreateDocumentoComponent,
        data: {
          title: 'Criar Documento',
          source: 'GERENCIADOR_DOC',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'criar-tipo-lote',
        component: CriarTipoLoteComponent,
        data: {
          title: 'Criar Tipo de Lote',
          source: 'TIPO_LOTE',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'atualizar-tipo-lote/:id',
        component: AtualizarTipoLoteComponent,
        data: {
          title: 'Atualizar tipo de lote',
          source: 'TIPO_LOTE',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'tipo-lote',
        component: TipoLoteComponent,
        data: {
          title: 'Tipos de Lote',
          source: 'TIPO_LOTE',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'criar-lote-campo',
        component: CriarLoteCampoComponent,
        data: {
          title: 'Criar Campo de Lote',
          source: 'LOTE_CAMPO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'atualizar-lote-campo/:id',
        component: AtualizarLoteCampoComponent,
        data: {
          title: 'Atualizar campo de lote',
          source: 'LOTE_CAMPO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'lote-campo',
        component: LoteCampoComponent,
        data: {
          title: 'Campos de lote',
          source: 'LOTE_CAMPO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'criar-tipo-foto',
        component: CriarTipoFotoComponent,
        data: {
          title: 'Criar tipo de foto',
          source: 'TIPO_FOTO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'atualizar-tipo-foto/:id',
        component: AtualizarTipoFotoComponent,
        data: {
          title: 'Atualizar tipo de foto',
          source: 'TIPO_FOTO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'tipo-foto',
        component: TipoFotoComponent,
        data: {
          title: 'Campos de tipo de loto',
          source: 'TIPO_FOTO',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'juizo',
        component: JuizoComponent,
        data: {
          title: 'Juizos',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },

      {
        path: 'create-juizo',
        component: CreateJuizoComponent,
        data: {
          title: 'Criar Juizo',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },

      {
        path: 'update-juizo/:id',
        component: UpdateJuizoComponent,
        data: {
          title: 'Atualizar Juizo',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },

      {
        path: 'vara',
        component: VaraComponent,
        data: {
          title: 'Varas',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },

      {
        path: 'create-vara',
        component: CreateVaraComponent,
        data: {
          title: 'Criar Vara',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },

      {
        path: 'update-vara/:id',
        component: UpdateVaraComponent,
        data: {
          title: 'Atualizar Vara',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'advogado',
        component: AdvogadoComponent,
        data: {
          title: 'Advogados',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-advogado',
        component: CreateAdvogadoComponent,
        data: {
          title: 'Criar Advogado',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-advogado/:id',
        component: UpdateAdvogadoComponent,
        data: {
          title: 'Atualizar Advogado',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'juiz',
        component: JuizComponent,
        data: {
          title: 'Juizes',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-juiz',
        component: CreateJuizComponent,
        data: {
          title: 'Criar Juiz',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-juiz/:id',
        component: UpdateJuizComponent,
        data: {
          title: 'Atualizar Juiz',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'escrivao',
        component: EscrivaoComponent,
        data: {
          title: 'Escrivães',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-escrivao',
        component: CreateEscrivaoComponent,
        data: {
          title: 'Criar Escrivão',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-escrivao/:id',
        component: UpdateEscrivaoComponent,
        data: {
          title: 'Atualizar Escrivão',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'reu',
        component: ReuComponent,
        data: {
          title: 'Réus',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-reu',
        component: CreateReuComponent,
        data: {
          title: 'Criar Reu',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-reu/:id',
        component: UpdateReuComponent,
        data: {
          title: 'Atualizar Reu',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'autor',
        component: AutorComponent,
        data: {
          title: 'Autores',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-autor',
        component: CreateAutorComponent,
        data: {
          title: 'Criar Autor',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-autor/:id',
        component: UpdateAutorComponent,
        data: {
          title: 'Atualizar Autor',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'parte',
        component: ParteComponent,
        data: {
          title: 'Partes',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-parte',
        component: CreateParteComponent,
        data: {
          title: 'Criar Partes',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-parte/:id',
        component: UpdateParteComponent,
        data: {
          title: 'Atualizar Partes',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'credor',
        component: CredorComponent,
        data: {
          title: 'Credores',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-credor',
        component: CreateCredorComponent,
        data: {
          title: 'Criar Credor',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-credor/:id',
        component: UpdateCredorComponent,
        data: {
          title: 'Atualizar Credor',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'fiel-depositario',
        component: FielDepositarioComponent,
        data: {
          title: 'Fiel Depositário',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'create-fiel-depositario',
        component: CreateFielDepositarioComponent,
        data: {
          title: 'Criar Fiel Depositário',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'update-fiel-depositario/:id',
        component: UpdateFielDepositarioComponent,
        data: {
          title: 'Atualizar Fiel Depositário',
          source: 'LEILOES',
        },
        canActivate: [SourceGuard],
      },
      {
        path: 'access-denied',
        component: AccessDeniedComponent,
        data: {
          title: 'Acesso Negado',
        },
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'assinatura/:id', component: AssinaturaComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
