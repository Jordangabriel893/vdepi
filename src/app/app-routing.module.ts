import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importe os componentes que serão utilizados nas rotas
import { HomeComponent } from './views/home';
import { ReadMoreComponent } from './views/read-more';
import { FarmacologiaComponent } from './views/farmacologia/farmacologia.component';
import { LaboratorioComponent } from './views/laboratorio/laboratorio.component';

// Defina suas rotas
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'read-more', component: ReadMoreComponent },
  { path: 'farmacologia', component: FarmacologiaComponent },
  { path: 'laboratorio', component: LaboratorioComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

