import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Route, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioComponent } from '../servicio/servicio.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from '@firebase/util';
import { ModificarComponent } from '../modificar/modificar.component';

const data: any[] = [
  
];

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent {
  
    public dataSource = new MatTableDataSource<any>(data);
    public valueSelect: string = 'blog';
    documents$: Observable<any[]>;
    displayedColumns: string[] = ['titulo', 'imagen'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    constructor(private dialog: MatDialog, private router: Router, private fire: FirebaseService) { 
      if(localStorage.getItem('tipo')!=null){
        this.valueSelect = localStorage.getItem('tipo')+"";
        let val: any = {value: localStorage.getItem('tipo')+""};
        this.cambioColeccion(val)
      } else {
        this.valueSelect = "blog";
        let val: any = {value: "blog"};
        this.cambioColeccion(val)
      }
    }

    ngOnInit(): void {
      this.openLoginDialog();
    }
  
    openLoginDialog(): void {
      const dialogRef = this.dialog.open(LoginComponent, {
        backdropClass: "hello",
        disableClose: true,
      });
  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          alert("Bienvenido administrador")
        } else {
          this.router.navigate(['/']);
        }
      });
    }

    modificar(elemento:any){

      const dialogRef = this.dialog.open(ModificarComponent, {
        data: {elemento:elemento},
        width: "80%",
        height: "80%"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        window.location.reload();    
      });
    }

    crear(){
      let elemento: any = {titulo: "", imagen: "", contenido: "", fecha: "", autor: "", categoria: "", id: ""};
      const dialogRef = this.dialog.open(ModificarComponent, {
        data: {elemento:elemento},
        width: "80%",
        height: "80%"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        window.location.reload();    
      });
    }

    async cambioColeccion(value:any){
      localStorage.setItem('tipo', value.value);
      console.log(value.value)
      switch(value.value){
        case 'blog':
          
          this.fire.getBlogs().subscribe(blogs => {
            let blogsList: any[]=[];
            if (blogs.length > 0) {
              console.log(blogs)
              for(let i=0; i<blogs.length; i++){
                blogsList.push(blogs[i]);
              }
              this.dataSource = new MatTableDataSource(blogsList);
            } else {
              console.log("No hay objetos para el blog instanciados en la BD");
            }
            this.dataSource.paginator = this.paginator;
          });
          break;

        case 'equipos':
          
          this.fire.getEquipos().subscribe(equipos => {
            let equiposList: any[]=[];
            if (equipos.length > 0) {
              for(let i=0; i<equipos.length; i++){
                equiposList.push(equipos[i]);
              }
              this.dataSource = new MatTableDataSource(equiposList);
              console.log(equiposList)
            } else {
              console.log("No hay objetos para los equipos instanciados en la BD");
            }
            this.dataSource.paginator = this.paginator;
          });
          break;
          
          case 'servicios':
            this.fire.getServicios().subscribe(servicios => {
              let serviciosList: any[]=[];
              if (servicios.length > 0) {
                for(let i=0; i<servicios.length; i++){
                  serviciosList.push(servicios[i]);
                }
                this.dataSource = new MatTableDataSource(serviciosList);
                console.log(serviciosList)
              } else {
                console.log("No hay objetos para los servicios en la BD");
              }
              this.dataSource.paginator = this.paginator;
            });
            break;
      }

      
      
    }

    openModificarDialog(elemento:any): void {

    }

}
