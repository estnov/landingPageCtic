import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Route, Router } from '@angular/router';

const Data: any[] = [
  {titulo: 'Titulo de prueba', descripcion: 'prueba de la descripción', imagen: 'https://firebasestorage.googleapis.com/v0/b/bd-ctic.appspot.com/o/Imagenes%2FServicios%2Fimage_2023-05-16_151620323.png?alt=media&token=654f3d76-365b-488e-ba8e-df5b5b0c8fbe', tecnologias: 'ABAP, SAP'},
  {titulo: 'Titulo 2', descripcion: 'prueba de la descripción', imagen: 'https://firebasestorage.googleapis.com/v0/b/bd-ctic.appspot.com/o/Imagenes%2FServicios%2Fimage_2023-05-16_151620323.png?alt=media&token=654f3d76-365b-488e-ba8e-df5b5b0c8fbe', tecnologias: 'ABAP, SAP'},
  {titulo: 'Titulo 3', descripcion: 'prueba de la descripción', imagen: 'https://firebasestorage.googleapis.com/v0/b/bd-ctic.appspot.com/o/Imagenes%2FServicios%2Fimage_2023-05-16_151620323.png?alt=media&token=654f3d76-365b-488e-ba8e-df5b5b0c8fbe', tecnologias: 'HTML, Css'},
  {titulo: 'Titulo 4', descripcion: 'prueba de la descripción', imagen: 'https://firebasestorage.googleapis.com/v0/b/bd-ctic.appspot.com/o/Imagenes%2FServicios%2Fimage_2023-05-16_151620323.png?alt=media&token=654f3d76-365b-488e-ba8e-df5b5b0c8fbe', tecnologias: 'ABAP, SAP'},
  {titulo: 'Titulo de 5', descripcion: 'prueba de la descripción', imagen: 'https://firebasestorage.googleapis.com/v0/b/bd-ctic.appspot.com/o/Imagenes%2FServicios%2Fimage_2023-05-16_151620323.png?alt=media&token=654f3d76-365b-488e-ba8e-df5b5b0c8fbe', tecnologias: 'ABAP, SAP'},
  {titulo: 'Titulo de 6', descripcion: 'prueba de la descripción', imagen: 'https://firebasestorage.googleapis.com/v0/b/bd-ctic.appspot.com/o/Imagenes%2FServicios%2Fimage_2023-05-16_151620323.png?alt=media&token=654f3d76-365b-488e-ba8e-df5b5b0c8fbe', tecnologias: 'ABAP, SAP'},
  {titulo: 'Titulo 2', descripcion: 'prueba de la descripción', imagen: 'https://firebasestorage.googleapis.com/v0/b/bd-ctic.appspot.com/o/Imagenes%2FServicios%2Fimage_2023-05-16_151620323.png?alt=media&token=654f3d76-365b-488e-ba8e-df5b5b0c8fbe', tecnologias: 'ABAP, SAP'},

];

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent {
  
    public dataSource: any[] =[];
    displayedColumns: string[] = ['titulo', 'descripcion', 'imagen'];

    constructor(private dialog: MatDialog, private router: Router) { }

    ngOnInit(): void {
      this.openLoginDialog();
    }
  
    openLoginDialog(): void {
      const dialogRef = this.dialog.open(LoginComponent, {
        disableClose: true,
        backdropClass: "bdrop",
      });
  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          alert("Bienvenido administrador")
          this.dataSource = Data;
        } else {
          this.router.navigate(['/']);
        }
      });
    }

    modificar(elemento:any){
      console.log(elemento)
    }

}
