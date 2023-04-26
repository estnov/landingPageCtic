import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'paginaCTIC';

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
