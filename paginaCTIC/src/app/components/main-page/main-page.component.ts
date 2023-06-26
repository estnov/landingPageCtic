import { Component, HostListener } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ServicioComponent } from '../servicio/servicio.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  public hideBuscando: boolean = false;
  searchKeyword: string;
  searchResults: any[];
  imageUrls: string[] = [];


  public mision: string ='';
  public imagenMision: string ='';

  public vision: string ='';
  public imagenVision: string ='';


  public descripcion: string ='';
  public imagenDescripcion: string ='';

  public equipos: any[] = [];

  public servicios: any[] = [];

  public blogs: any[] = [];

  public nombre: string = '';
  public correo: string = '';
  public telefono: string = '';
  public direccion: string = '';
  public mensaje: string = '';

  //Configuradores del slider de imagenes
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots:false,
    autoplay: true,
    autoplaySpeed: 5000,
  };


  constructor(private router: Router, private fire : FirebaseService, private storage: AngularFireStorage, 
    public dialog: MatDialog) {

    fire.getMision().subscribe(mision => {
      if (mision.length > 0) {
        this.mision = mision[0].descripcion;
      } else {
        this.mision = "Actualice la mision en la BD de Firebase";
      }
    });

    fire.getVision().subscribe(vision => {
      if (vision.length > 0) {
        this.vision = vision[0].descripcion;
      } else {
        this.vision = " Registrar este campo en la Base de Datos ";
      }
    });

    fire.getDescripcion().subscribe(descripcion => {
      if (descripcion.length > 0) {
        this.descripcion = descripcion[0].texto;
      } else {
        this.descripcion = " Registrar este campo en la Base de Datos ";
      }
    });

    fire.getEquipos().subscribe(equipos => {
      if (equipos.length > 0) {
        this.equipos = [];
        for(let i=0; i<equipos.length; i++){
          this.equipos.push(equipos[i]);
        }
        console.log(this.equipos);
      } else {
        console.log("No hay equipos registrados");
      }
    });

    fire.getServicios().subscribe(servicios => {
      if (servicios.length > 0) {
        this.servicios = [];
        for(let i=0; i<servicios.length; i++){
          this.servicios.push(servicios[i]);
        }
      } else {
        console.log("No hay servicios instanciados en la BD");
      }
    });
    

    fire.getBlogs().subscribe(blogs => {
      if (blogs.length > 0) {
        this.blogs = [];
        for(let i=0; i<blogs.length; i++){
          this.blogs.push(blogs[i]);
        }
      } else {
        console.log("No hay objetos para el blog instanciados en la BD");
      }
    });



    this.getImagenesHeader(); 
    this.getImagenMision();
    this.getImagenVision();
    this.getImagenDescripcion();
  }

  search() {
    if (this.searchKeyword) {
      this.hideBuscando = true;
      this.fire.searchByKeyword(this.searchKeyword).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
      this.hideBuscando = false;
    }
  }

  searching(){
    if(this.searchResults!=undefined)
    if(this.searchResults.length > 0){
      this.search();
      console.log(this.searchKeyword);
      console.log(this.searchResults.length);
    }
  }

  getImagenesHeader(){
    this.imageUrls=[];
    const storageRef = this.storage.ref('Imagenes/Header'); 
    storageRef.listAll().subscribe(listResult => {
      listResult.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(imageUrl => {
          this.imageUrls.push(imageUrl);
        });
      });
    });
    console.log(this.imageUrls);
    return this.imageUrls;
  }

  

  getImagenMision(){
    this.fire.getImagenMision().subscribe(listResult => {
      listResult.items.forEach((itemRef: { getDownloadURL: () => Promise<any>; }) => {
        itemRef.getDownloadURL().then(imageUrl => {
          this.imagenMision = imageUrl;
        });
      });
    });
  }

  getImagenVision(){
    this.fire.getImagenVision().subscribe(listResult => {
      listResult.items.forEach((itemRef: { getDownloadURL: () => Promise<any>; }) => {
        itemRef.getDownloadURL().then(imageUrl => {
          this.imagenVision = imageUrl;
        });
      });
    });
  }
  
  getImagenDescripcion(){
    this.fire.getImagenDescripcion().subscribe(listResult => {
      listResult.items.forEach((itemRef: { getDownloadURL: () => Promise<any>; }) => {
        itemRef.getDownloadURL().then(imageUrl => {
          this.imagenDescripcion = imageUrl;
        });
      });
    });
  }

  verServicio(servicio: any): void {
    const dialogRef = this.dialog.open(ServicioComponent, {
      data: {servicio: servicio},
      width: "80%",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Cerrado el servicio');
    });
  }

  verBlog(blog: any): void {
    const formattedTitle = blog.data.titulo.toLowerCase().replace(/ /g, '-');

    console.log("Se navega a: ", blog.uid,"/", formattedTitle);
    //this.router.navigate(['/noticia', blog.uid, blog.titulo]);
  }

  

  @HostListener("document:click")
  clickedOut() {
    this.hideBuscando = false;
  }



}
