import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BlogComponent } from './components/blog/blog.component';
import { NoticiaComponent } from './components/noticia/noticia.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'adminLogin', component: AdministradorComponent },
  { path: 'noticia/:uid/:title', component: NoticiaComponent },
  { path: ':section', component: MainPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() { 
    
  }

 }
