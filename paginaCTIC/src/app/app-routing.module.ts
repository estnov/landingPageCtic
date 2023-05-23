import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministradorComponent } from './components/administrador/administrador.component';

const routes: Routes = [
  { path: '', component: AppComponent },
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
