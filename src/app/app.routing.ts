import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonyGuard, AuthGuard } from './_guards/index';

// Import Containers
import {
  FullLayoutComponent
} from './containers';

import {
  LoginComponent,
  FaturamentoUFComponent,
  OperacoesComponent,
  FinanceiroComponent,
  EstoqueComponent,
  DashboardResultadosComponent,
  EstoqueListagemComponent,
  LiberadosConsolidadoComponent,
  AccessDeniedComponent,
  NotasFiscaisComponent
} from './views';
import { PericiaLeilaoComponent } from './views/relatorios/pericialeilao';
import { SourceGuard } from './_guards/source.guard';
import { HomeComponent } from './views/home';


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
        path: 'faturamentoUF',
        component: FaturamentoUFComponent,
        data: {
          title: 'Dashboard Faturamento',
          source: 'Faturamento'
        },
        canActivate: [SourceGuard]
      }, {
        path: 'dashboardResultado',
        component: DashboardResultadosComponent,
        data: {
          title: 'Resultados Faturamento',
          source: 'Resultado'
        },
        canActivate: [SourceGuard]
      },{
        path: 'dash-operation',
        component: OperacoesComponent,
        data: {
          title: 'Dashboard Operações',
          source: 'Operacoes'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'dash-financial',
        component: FinanceiroComponent,
        data: {
          title: 'Dashboard Financeiro',
          source: 'Financeiro'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'dash-estoque',
        component: EstoqueComponent,
        data: {
          title: 'Dashboard Estoque',
          source: 'Estoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'relatorios/pericialeilao',
        component: PericiaLeilaoComponent,
        data: {
          title: 'Perícia Leilão',
          source: 'RelatorioPericiaLeilao'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'relatorios/estoque',
        component: EstoqueListagemComponent,
        data: {
          title: 'Estoque Atual',
          source: 'RelatorioEstoque'
        },
        canActivate: [SourceGuard]
      },
      {
        path: 'relatorios/liberadosConsolidados',
        component: LiberadosConsolidadoComponent,
        data: {
          title: 'Liberados Consolidado',
          source: 'RelatorioLiberadosConsolidado'
        },
        canActivate: [SourceGuard]
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
        path: 'access-denied',
        component: AccessDeniedComponent,
        data: {
          title: 'Acesso Negado'
        }
      }
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
