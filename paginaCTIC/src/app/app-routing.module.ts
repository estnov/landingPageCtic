import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CticComponent } from './Components/ctic/ctic.component';
import { ServiciosComponent } from './Components/servicios/servicios.component';
import { BlogComponent } from './Components/blog/blog.component';
import { ContactanosComponent } from './Components/contactanos/contactanos.component';
import { InicioComponent } from './Components/inicio/inicio.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'ctic', component: CticComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contactanos', component: ContactanosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
