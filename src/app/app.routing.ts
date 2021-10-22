import { StatusLeilaoComponent } from './views/status-leilao/status-leilao.component';
import { StatusLoteComponent } from './views/status-lote/status-lote.component';
import { HistoricoLancesComponent } from './views/historico-lances/historico-lances.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonyGuard, AuthGuard } from './_guards/index';

// Import Containers
import {
  FullLayoutComponent
} from './containers';

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
import { EmpresasComponent } from './views/empresas/empresas.component';
import { ComitentesComponent } from './views/comitentes/comitentes.component';
import { LeiloeirosComponent } from './views/leiloeiros/leiloeiros.component';
import { LocaisComponent } from './views/locais/locais.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { VistoriaComponent } from './views/vistoria/vistoria.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home'
        },
        canActivate: [AnonyGuard]
      },


      {
        path: 'relatorios/notasfiscais',
        component: NotasFiscaisComponent,
        data: {
          title: 'Notas Fiscais',
          source: 'RelatorioNotasFiscais'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'leilao',
        component: LeilaoComponent,
        data: {
          title: 'Leilao',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },

      {
        path: 'leilao',
        component: LeilaoComponent,
        data: {
          title: 'Leilao',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'create-leilao',
        component: CreateLeilaoComponent,
        data: {
          title: 'Novo Leilao',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'update-leilao/:id',
        component: UpdateLeilaoComponent,
        data: {
          title: 'Editar Leilao',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'vistoria',
        component: VistoriaComponent,
        data: {
          title: 'Vistoria',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'lotes/:id',
        component: LotesComponent,
        data: {
          title: 'Lotes',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'create-lotes/:id',
        component: CreateLotesComponent,
        data: {
          title: 'Novo Lote',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'update-lotes/:id',
        component: UpdateLotesComponent,
        data: {
          title: 'Editar Lote',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          title: 'Usuários',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'update-usuarios/:id',
        component: UpdateUsuariosComponent,
        data: {
          title: 'Editar Usuário',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'habilitacao',
        component: HabilitacaoComponent,
        data: {
          title: 'Habilitação',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'historicolances',
        component: HistoricoLancesComponent,
        data: {
          title: 'Histórico de Lances',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'arrematantes',
        component: ArrematantesComponent,
        data: {
          title: 'Arrematantes',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'empresa',
        component: EmpresasComponent,
        data: {
          title: 'Empresas',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'comitente',
        component: ComitentesComponent,
        data: {
          title: 'Comitente',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'leiloeiro',
        component: LeiloeirosComponent,
        data: {
          title: 'Leiloeiros',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'local',
        component: LocaisComponent,
        data: {
          title: 'Locais',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
        data: {
          title: 'Categorias',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'statusLote',
        component: StatusLoteComponent,
        data: {
          title: 'Status Lote',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'statusLeilao',
        component: StatusLeilaoComponent,
        data: {
          title: 'Status Leilão',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'access-denied',
        component: AccessDeniedComponent,
        data: {
          title: 'Acesso Negado'
        }
      },
      {
        path: 'mapa-lance',
        component: MapaLanceComponent,
        data: {
          title: 'Mapa de Lances',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
