
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA ,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  registerLocaleData,
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
import { NgxGalleryModule } from 'ngx-gallery';
import { LightboxModule } from 'ngx-lightbox';
registerLocaleData(localePt);

import { RouterModule } from '@angular/router';


// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import 3rd party components
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);
import { MomentModule } from 'ngx-moment';

import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HomeComponent } from './views/home';
import { SwiperModule } from 'swiper/angular';
import { ReadMoreComponent } from './views/read-more';
import { FarmacologiaComponent } from './views/farmacologia/farmacologia.component';
import { LaboratorioComponent } from './views/laboratorio/laboratorio.component';
import { InformationsService } from './serviços/informations.service';
import { DepartamentoComponent } from './views/departamento/departamento.component';
import { BannerComponent } from './components/banner/banner.component';
import { HeaderComponent } from './components/header/header.component';
import { LaborComponent } from './components/labor/labor.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MomentModule,
    BrowserAnimationsModule,
    CommonModule,
    AngularEditorModule,
    HttpClientModule,
    AlertModule.forRoot(),
    SwiperModule,
    HttpClientModule,
    RouterModule,
    NgxGalleryModule,
    LightboxModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ReadMoreComponent,
    FarmacologiaComponent,
    LaboratorioComponent,
    DepartamentoComponent,
    BannerComponent,
    HeaderComponent,
    LaborComponent,
    FooterComponent,

  ],
  exports: [
    BannerComponent
  ],
  providers: [
    InformationsService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
