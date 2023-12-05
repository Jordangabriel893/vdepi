
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
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ReadMoreComponent,
    FarmacologiaComponent,
    LaboratorioComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
