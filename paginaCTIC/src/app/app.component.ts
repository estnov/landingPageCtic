import { Component, ViewChild } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'paginaCTIC';
  images:Array<any>=[]

  public mision: string ='';
  public visiones: string ='';
  public descripcion: string ='';
  public imagenVision: string ='';
  public imagenMision: string ='';
  public imagenDescripcion: string ='';
  imageUrls: string[] = [];
  public equipos: any[] = [];
  public servicios: any[] = [];
  public blogs: any[] = [];

  private blog:any[] = []

  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }


  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  constructor(private fire : FirebaseService, private storage: AngularFireStorage) { 
    fire.getMision().subscribe(mision => {
      if (mision.length > 0) {
        this.mision = mision[0].descripcion;
      } else {
        this.mision = "Actualice la mision en la BD de Firebase";
      }
    });

    fire.getVision().subscribe(vision => {
      if (vision.length > 0) {
        this.visiones = vision[0].descripcion;
      } else {
        this.visiones = " Registrar este campo en la Base de Datos ";
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
    this.getImagenVision();
    this.getImagenMision();
    this.getImagenDescripcion();
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

  

  getImagenVision(){
    this.fire.getImagenVision().subscribe(listResult => {
      listResult.items.forEach((itemRef: { getDownloadURL: () => Promise<any>; }) => {
        itemRef.getDownloadURL().then(imageUrl => {
          this.imagenVision = imageUrl;
        });
      });
    });
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
  

  getImagenDescripcion(){
    this.fire.getImagenDescripcion().subscribe(listResult => {
      listResult.items.forEach((itemRef: { getDownloadURL: () => Promise<any>; }) => {
        itemRef.getDownloadURL().then(imageUrl => {
          this.imagenDescripcion = imageUrl;
        });
      });
    });
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  imageObject: Array<object> = [{
    image: 'assets/images/empresa.jpg',
    alt: 'empresa',
    title: 'Centrosur'
  }, {
    image: 'assets/images/medidores.png', // Support base64 image
    title: 'Medidores inteligentes', //Optional: You can use this key if want to show image with title
    alt: 'MedidoresInteligentes', //Optional: You can use this key if want to show image with alt
    order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  }
  ];

}
