import { Component, HostListener } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

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

  
  public imagenVision: string ='';




  //Configuradores del slider de imagenes
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots:false,
    autoplay: true,
    autoplaySpeed: 5000,
  };


  constructor(private router: Router, private fire : FirebaseService, private storage: AngularFireStorage) {

    fire.getMision().subscribe(mision => {
      if (mision.length > 0) {
        this.mision = mision[0].descripcion;
      } else {
        this.mision = "Actualice la mision en la BD de Firebase";
      }
    });


    this.getImagenesHeader(); 
    this.getImagenMision();
    this.getImagenVision();
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
  

  @HostListener("document:click")
  clickedOut() {
    this.hideBuscando = false;
  }



}
