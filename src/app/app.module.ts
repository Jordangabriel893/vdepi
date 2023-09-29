import { AssinaturaComponent } from './views/assinatura/assinatura.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LocationStrategy,
  HashLocationStrategy,
  registerLocaleData,
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
import { FlipModule } from 'ngx-flip';

registerLocaleData(localePt);
// Import containers
import { FullLayoutComponent } from './containers';

const APP_CONTAINERS = [FullLayoutComponent];

// Import components
import {
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  EmailEditorEblComponent,
} from './components';

// Import views
import {
  LoginComponent,
  AccessDeniedComponent,
  NotasFiscaisComponent,
  LeilaoComponent,
  CreateLeilaoComponent,
  UpdateLeilaoComponent,
  MapaLanceComponent,
} from './views';

const APP_COMPONENTS = [
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  LoginComponent,
  LoginComponent,
  AccessDeniedComponent,
  HomeComponent,
  NotasFiscaisComponent,
  LeilaoComponent,
  CreateLeilaoComponent,
  UpdateLeilaoComponent,
  MapaLanceComponent,
  EmailEditorEblComponent,
];

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES,
} from './directives';

import { DataFilterPipe } from './directives/data-filter.pipe';
import { DateValidPipe } from './directives/datevalid.pipe';
import { GroupByPipe2 } from './directives/groupBy2.pipe';
import { SumByPipe } from './directives/sumBy.pipe';
import { RandomColorDirective } from './directives/random-color-directive';
import { NotLink } from './directives/not-link-directive';
import { FormatCpfCnpjPipe } from './directives/format-cpfcnpj.pipe';
import { FormatPhonePipe } from './directives/format-phone.pipe';
import { KeyEnterDirective } from './directives/keyenter.directive';
import { AppFocusDirective } from './directives/appFocus.directive';
import { DisableControlDirective } from './directives/disable-control.directive';
import { CurrencyFormatPipe } from './directives/currency-format.pipe';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES,
  DataFilterPipe,
  DateValidPipe,
  GroupByPipe2,
  RandomColorDirective,
  NotLink,
  FormatCpfCnpjPipe,
  FormatPhonePipe,
  SumByPipe,
  GroupByPipe2,
  KeyEnterDirective,
  AppFocusDirective,
  DisableControlDirective,
  CurrencyFormatPipe,
];

// Import routing module
import { AppRoutingModule } from './app.routing';
import { Router } from '@angular/router';

// Import 3rd party components
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ChartsModule } from 'ng2-charts';
import { CustomFormsModule } from 'ng2-validation';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { Restangular, RestangularModule } from 'ngx-restangular';
import { TextMaskModule } from 'angular2-text-mask';
import { NgPipesModule } from 'ngx-pipes';
import {
  JasperoConfirmationsModule,
  ConfirmationService,
} from '@jaspero/ng-confirmations';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MomentModule } from 'ngx-moment';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { LoadingModule } from 'ngx-loading';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CountoModule } from 'angular2-counto';
import { NguiMapModule } from '@ngui/map';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AlertModule } from 'ngx-bootstrap/alert';
import { EmailEditorModule } from 'angular-email-editor';

import { environment } from '../environments/environment';
import { AuthGuard, AnonyGuard } from './_guards/index';
import { AuthenticationService } from './_services/index';
import { PdfService } from './_services/pdf.service';
import { DataTableModule } from 'angular2-datatable';
import { SourceGuard } from './_guards/source.guard';
import { AuthorizationService } from './_services/authorization.service';
import { HomeComponent } from './views/home';
import { LotesComponent } from './views/leilao/lotes/lotes.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { UpdateUsuariosComponent } from './views/usuarios/update-usuarios/update-usuarios.component';
import { ErrorMsgComponent } from './views/error-msg/error-msg.component';
import { UpdateLotesComponent } from './views/leilao/lotes/update-lotes/update-lotes.component';
import { HabilitacaoComponent } from './views/habilitacao/habilitacao.component';
import { CreateLotesComponent } from './views/leilao/lotes/create-lotes/create-lotes.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ArrematantesComponent } from './views/arrematantes/arrematantes.component';
import { LancesConsolidadoComponent } from './views/lances-consolidado/lances-consolidado.component';
import { HistoricoLancesComponent } from './views/historico-lances/historico-lances.component';
import { EmpresasComponent } from './views/empresas/empresas.component';
import { ComitentesComponent } from './views/comitentes/comitentes.component';
import { LeiloeirosComponent } from './views/leiloeiros/leiloeiros.component';
import { LocaisComponent } from './views/locais/locais.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { VistoriaComponent } from './views/vistoria/vistoria.component';
import { StatusLoteComponent } from './views/status-lote/status-lote.component';
import { StatusLeilaoComponent } from './views/status-leilao/status-leilao.component';
import { CreateCategoriasComponent } from './views/categorias/create-categorias/create-categorias.component';
import { UpdateCategoriasComponent } from './views/categorias/update-categorias/update-categorias.component';
import { CreateLocalComponent } from './views/locais/create-local/create-local.component';
import { UpdateLocalComponent } from './views/locais/update-local/update-local.component';
import { CreateLeiloeirosComponent } from './views/leiloeiros/create-leiloeiros/create-leiloeiros.component';
import { UpdateLeiloeirosComponent } from './views/leiloeiros/update-leiloeiros/update-leiloeiros.component';
import { UpdateEmpresaComponent } from './views/empresas/update-empresa/update-empresa.component';
import { CreateEmpresaComponent } from './views/empresas/create-empresa/create-empresa.component';
import { CreateComitenteComponent } from './views/comitentes/create-comitente/create-comitente.component';
import { UpdateComitenteComponent } from './views/comitentes/update-comitente/update-comitente.component';
import { ListaContatosComponent } from './views/lista-contatos/lista-contatos.component';
import { ContatosComponent } from './views/contatos/contatos.component';
import { NotificacoesComponent } from './views/notificacoes/notificacoes.component';
import { TipoMeioNotificacaoComponent } from './views/tipo-meio-notificacao/tipo-meio-notificacao.component';
import { TipoDeNotificacaoComponent } from './views/tipo-de-notificacao/tipo-de-notificacao.component';
import { CreateNotificacaoComponent } from './views/notificacoes/create-notificacao/create-notificacao.component';
import { EditNotificacaoComponent } from './views/notificacoes/edit-notificacao/edit-notificacao.component';
import { EditTiponotificacaoComponent } from './views/tipo-de-notificacao/edit-tiponotificacao/edit-tiponotificacao.component';
import { CreateTiponotificacaoComponent } from './views/tipo-de-notificacao/create-tiponotificacao/create-tiponotificacao.component';
import { CreateTipomeionotificacaoComponent } from './views/tipo-meio-notificacao/create-tipomeionotificacao/create-tipomeionotificacao.component';
import { EditTipomeionotificacaoComponent } from './views/tipo-meio-notificacao/edit-tipomeionotificacao/edit-tipomeionotificacao.component';
import { AgendaComponent } from './views/agenda/agenda.component';
import { CreateAgendaComponent } from './views/agenda/create-agenda/create-agenda.component';
import { CreateContatosComponent } from './views/contatos/create-contatos/create-contatos.component';
import { EditContatosComponent } from './views/contatos/edit-contatos/edit-contatos.component';
import { EditListacontatosComponent } from './views/lista-contatos/edit-listacontatos/edit-listacontatos.component';
import { CreateListacontatosComponent } from './views/lista-contatos/create-listacontatos/create-listacontatos.component';
import { UpdateAgendaComponent } from './views/agenda/update-agenda/update-agenda.component';
import { BannerComponent } from './views/banner/banner.component';
import { EditBannerComponent } from './views/banner/edit-banner/edit-banner.component';
import { CreateBannerComponent } from './views/banner/create-banner/create-banner.component';
import { PermissoesComponent } from './views/permissoes/permissoes.component';
import { TemplateComponent } from './views/template/template.component';
import { CreateTemplateComponent } from './views/template/create-template/create-template.component';
import { UpdateTemplateComponent } from './views/template/update-template/update-template.component';
import { ContaComponent } from './views/conta/conta.component';
import { UpdateContaComponent } from './views/conta/update-conta/update-conta.component';
import { CreateContaComponent } from './views/conta/create-conta/create-conta.component';
import { FaturaComponent } from './views/fatura/fatura.component';
import { CreateFaturaComponent } from './views/fatura/create-fatura/create-fatura.component';

import { SwiperModule } from 'swiper/angular';
import { LotesVistoriaComponent } from './views/vistoria/lotes/lotes-vistoria.component';
import { SearchLeilaoComponent } from './components/search-leilao/search-leilao.component';
import { CreateUsuariosComponent } from './views/usuarios/create-usuarios/create-usuarios.component';
import { ConfiguracaoComponent } from './views/configuracao/configuracao.component';
import { CreateConfiguracaoComponent } from './views/configuracao/create-configuracao/create-configuracao.component';
import { UpdateConfiguracaoComponent } from './views/configuracao/update-configuracao/update-configuracao.component';
import { AgendamentoComponent } from './views/agendamento/agendamento.component';
import { LogComponent } from './views/notificacoes/log/log.component';
import { PaginaEstaticaComponent } from './views/pagina-estatica/pagina-estatica.component';
import { CreatePaginaestaticaComponent } from './views/pagina-estatica/create-paginaestatica/create-paginaestatica.component';
import { UpdatePaginaestaticaComponent } from './views/pagina-estatica/update-paginaestatica/update-paginaestatica.component';
import { SaveCancelButtonsComponent } from './components/form/save-cancel-buttons/save-cancel-buttons.component';
import { BackButtonComponent } from './components/form/back-button/back-button.component';
import { TipoDocumentoComponent } from './views/tipo-documento/tipo-documento.component';
import { EditTipodocumentoComponent } from './views/tipo-documento/edit-tipodocumento/edit-tipodocumento.component';
import { CreateTipodocumentoComponent } from './views/tipo-documento/create-tipodocumento/create-tipodocumento.component';
import { DocumentoTemplateComponent } from './views/documento-template/documento-template.component';
import { CreateDocumentoTemplateComponent } from './views/documento-template/create-documento-template/create-documento-template.component';
import { EditDocumentoTemplateComponent } from './views/documento-template/edit-documento-template/edit-documento-template.component';
import { GerenciadorDocumentosComponent } from './views/gerenciador-documentos/gerenciador-documentos.component';
import { CreateDocumentoComponent } from './views/gerenciador-documentos/create-documento/create-documento.component';
import { CreateAgendamentoComponent } from './views/agendamento/create/create-agendamento.component';
import { GerencialComponent } from './views/gerencial/gerencial.component';
import { TipoLoteComponent } from './views/tipo-lote/tipo-lote.component';
import { CriarTipoLoteComponent } from './views/tipo-lote/criar-tipo-lote/criar-tipo-lote.component';
import { AtualizarTipoLoteComponent } from './views/tipo-lote/atualizar-tipo-lote/atualizar-tipo-lote.component';
import { LoteCampoComponent } from './views/lote-campo/lote-campo.component';
import { CriarLoteCampoComponent } from './views/lote-campo/criar-lote-campo/criar-lote-campo.component';
import { AtualizarLoteCampoComponent } from './views/lote-campo/atualizar-lote-campo/atualizar-lote-campo.component';

export function RestangularConfigFactory(
  RestangularProvider,
  NotifierService: NotifierService
) {
  RestangularProvider.setBaseUrl(environment.apiDados);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
    RestangularProvider.setDefaultHeaders({
      Authorization: 'Bearer ' + currentUser.token,
      withCredentials: true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    });
  }

  RestangularProvider.addErrorInterceptor(
    (response, subject, responseHandler) => {
      if (response.status === 401) {
        window.location.href = '/#/login';
        return false;
      }

      if (response.status === 403) {
        NotifierService.notify('error', 'Acesso Negado');
        return false;
      }

      return true;
    }
  );
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10,
        },
      },
    }),
    RestangularModule.forRoot([NotifierService], RestangularConfigFactory),
    TextMaskModule,
    NgPipesModule,
    JasperoConfirmationsModule,
    NgxMyDatePickerModule.forRoot(),
    MomentModule,
    NguiAutoCompleteModule,
    BrowserAnimationsModule,
    LoadingModule,
    ModalModule.forRoot(),
    CurrencyMaskModule,
    BsDatepickerModule.forRoot(),
    CountoModule,
    NguiMapModule.forRoot({
      apiUrl:
        'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing,geometry&key=AIzaSyCWTN3uJJPSC5fZSQe7lJd2dLAmEqsKc6c',
    }),
    MultiselectDropdownModule,
    SortableModule.forRoot(),
    TooltipModule.forRoot(),
    NgSelectModule,
    AngularMultiSelectModule,
    FlipModule,
    DataTableModule,
    CommonModule,
    PopoverModule.forRoot(),
    CarouselModule.forRoot(),
    AngularEditorModule,
    HttpClientModule,
    AlertModule.forRoot(),
    EmailEditorModule,
    SwiperModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    LotesComponent,
    UsuariosComponent,
    UpdateUsuariosComponent,
    ErrorMsgComponent,
    UpdateLotesComponent,
    HabilitacaoComponent,
    CreateLotesComponent,
    DashboardComponent,
    ArrematantesComponent,
    LancesConsolidadoComponent,
    HistoricoLancesComponent,
    EmpresasComponent,
    ComitentesComponent,
    LeiloeirosComponent,
    LocaisComponent,
    CategoriasComponent,
    VistoriaComponent,
    StatusLoteComponent,
    StatusLeilaoComponent,
    CreateCategoriasComponent,
    UpdateCategoriasComponent,
    CreateLocalComponent,
    UpdateLocalComponent,
    CreateLeiloeirosComponent,
    UpdateLeiloeirosComponent,
    UpdateEmpresaComponent,
    CreateEmpresaComponent,
    CreateComitenteComponent,
    UpdateComitenteComponent,
    LancesConsolidadoComponent,
    ListaContatosComponent,
    ContatosComponent,
    NotificacoesComponent,
    TipoMeioNotificacaoComponent,
    TipoDeNotificacaoComponent,
    CreateNotificacaoComponent,
    EditNotificacaoComponent,
    EditTiponotificacaoComponent,
    CreateTiponotificacaoComponent,
    CreateTipomeionotificacaoComponent,
    EditTipomeionotificacaoComponent,
    AgendaComponent,
    CreateAgendaComponent,
    CreateContatosComponent,
    EditContatosComponent,
    EditListacontatosComponent,
    CreateListacontatosComponent,
    UpdateAgendaComponent,
    BannerComponent,
    EditBannerComponent,
    CreateBannerComponent,
    PermissoesComponent,
    TemplateComponent,
    CreateTemplateComponent,
    UpdateTemplateComponent,
    ContaComponent,
    UpdateContaComponent,
    CreateContaComponent,
    FaturaComponent,
    CreateFaturaComponent,
    CreateUsuariosComponent,
    LotesVistoriaComponent,
    SearchLeilaoComponent,
    ConfiguracaoComponent,
    CreateConfiguracaoComponent,
    UpdateConfiguracaoComponent,
    AgendamentoComponent,
    LogComponent,
    PaginaEstaticaComponent,
    CreatePaginaestaticaComponent,
    UpdatePaginaestaticaComponent,
    SaveCancelButtonsComponent,
    BackButtonComponent,
    TipoDocumentoComponent,
    EditTipodocumentoComponent,
    CreateTipodocumentoComponent,
    DocumentoTemplateComponent,
    CreateDocumentoTemplateComponent,
    EditDocumentoTemplateComponent,
    GerenciadorDocumentosComponent,
    CreateDocumentoComponent,
    AssinaturaComponent,
    CreateAgendamentoComponent,
    GerencialComponent,
    TipoLoteComponent,
    CriarTipoLoteComponent,
    AtualizarTipoLoteComponent,
    LoteCampoComponent,
    CriarLoteCampoComponent,
    AtualizarLoteCampoComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    AuthGuard,
    AnonyGuard,
    SourceGuard,
    AuthenticationService,
    AuthorizationService,
    ConfirmationService,
    FormatPhonePipe,
    CurrencyFormatPipe,
    PdfService,
    GroupByPipe2,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
