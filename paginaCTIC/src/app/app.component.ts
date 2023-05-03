import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'paginaCTIC';
  images:Array<any>=[]

  public mision: string ='';


  constructor(private fire : FirebaseService) { 
    fire.getMision().subscribe(mision => {
      if (mision.length > 0) {
        this.mision = mision[0].descripcion;
        console.log('Mision: ', this.mision);
      } else {
        this.mision = "Actualice la mision en la BD de Firebase";
      }
    });
    console.log(fire.getImagenesHeader())
    this.images.push(fire.getImagenesHeader())
    console.log("------>",this.images)
  }

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
