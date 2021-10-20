import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/Http';
import { CurrencyPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
import { FlipModule } from 'ngx-flip';


registerLocaleData(localePt);

// Import containers
import {
  FullLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent
]

// Import components
import {
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

// Import views
import {
  LoginComponent,
   AccessDeniedComponent,
  NotasFiscaisComponent,
  LeilaoComponent,
  CreateLeilaoComponent,
  UpdateLeilaoComponent

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
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

import { DataFilterPipe } from './directives/data-filter.pipe';
import { DateValidPipe } from './directives/datevalid.pipe';
import { GroupByPipe2 } from './directives/groupBy2.pipe'
import { SumByPipe } from './directives/sumBy.pipe'
import { RandomColorDirective } from './directives/random-color-directive'
import { NotLink } from './directives/not-link-directive'
import { FormatCpfCnpjPipe } from './directives/format-cpfcnpj.pipe';
import { FormatPhonePipe } from './directives/format-phone.pipe';
import { KeyEnterDirective } from './directives/keyenter.directive';
import { InputFocusDirective } from './directives/inputFocus.directive';
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
  InputFocusDirective,
  DisableControlDirective,
  CurrencyFormatPipe
]

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
import { CustomFormsModule } from 'ng2-validation'
import { NotifierModule, NotifierService } from 'angular-notifier'
import { Restangular, RestangularModule } from 'ngx-restangular';
import { TextMaskModule } from 'angular2-text-mask';
import { NgPipesModule } from 'ngx-pipes';
import { JasperoConfirmationsModule, ConfirmationService } from '@jaspero/ng-confirmations'
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MomentModule } from 'ngx-moment';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { LoadingModule } from 'ngx-loading';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CountoModule } from 'angular2-counto';
import { NguiMapModule } from '@ngui/map';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AlertModule } from 'ngx-bootstrap/alert';



import { environment } from '../environments/environment';
import { AuthGuard, AnonyGuard } from './_guards/index';
import { AuthenticationService, StoreService, ComponentService, DataService } from './_services/index';
import { PdfService } from './_services/pdf.service';
import { DataTableModule } from "angular2-datatable";
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
import { DashboardComponent } from './views/leilao/dashboard/dashboard.component';


export function RestangularConfigFactory(RestangularProvider, NotifierService: NotifierService, Router) {
  RestangularProvider.setBaseUrl(environment.apiDados);

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.access_token) {
    RestangularProvider.setDefaultHeaders({ 'Authorization': 'Bearer ' + currentUser.access_token, withCredentials: true, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true });
  }

  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    if (response.status === 401) {
      Router.navigate(['/login']);
      return false;
    }

    if (response.status === 403) {
      NotifierService.notify("error", "Acesso Negado");
      return false;
    }

    return true;
  });
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
    HttpModule,
    CustomFormsModule,
    NotifierModule,
    RestangularModule.forRoot([NotifierService, Router], RestangularConfigFactory),
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
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing,geometry&key=AIzaSyBQNtJOU4zNBeywPyqUV3VEAjdh58PPkcI' }),
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

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    AuthGuard,
    AnonyGuard,
    SourceGuard,
    AuthenticationService,
    AuthorizationService,
    ConfirmationService,
    StoreService,
    ComponentService,
    FormatPhonePipe,
    CurrencyFormatPipe,
    DataService,
    PdfService,
    GroupByPipe2
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
