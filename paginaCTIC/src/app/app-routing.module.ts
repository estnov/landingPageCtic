import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'adminLogin', component: AdministradorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() { 
    
  }
 }
