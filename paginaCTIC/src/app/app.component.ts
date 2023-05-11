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
  imageUrls: string[] = [];

  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }


  constructor(private fire : FirebaseService, private storage: AngularFireStorage) { 
    fire.getMision().subscribe(mision => {
      if (mision.length > 0) {
        this.mision = mision[0].descripcion;
        console.log('Mision: ', this.mision);
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
    this.getImagenesHeader()
 }

  /*getVisionFire(){
    this.fire.getVision().subscribe(vision => {
      if (vision.length > 0) {
        this.visiones = vision[0].descripcion;
      } else {
        this.visiones = " Registrar este campo en la Base de Datos ";
      }
    });
  }*/

  getImagenesHeader(){
    const storageRef = this.storage.ref('Imagenes/Header'); 
    storageRef.listAll().subscribe(listResult => {
      listResult.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(imageUrl => {
          this.imageUrls.push(imageUrl);
        });
      });
    });

    return this.imageUrls;
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
