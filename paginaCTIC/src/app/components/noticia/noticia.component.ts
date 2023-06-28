import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent {

  private uid: string = '';
  public noticia: any;

  public nombre: string = '';
  public correo: string = '';
  public telefono: string = '';
  public direccion: string = '';
  public mensaje: string = '';

  constructor(@Inject(DOCUMENT) private document: Document, private fire: FirebaseService) { 
    this.obtainURL();
    this.cargarNoticia();
  }
  oninit(){
    this.obtainURL();
  }

  obtainURL(){
    let url = this.document.location.href;

    //obtener el id de la url
    let datos = url.split('/');
    console.log(datos);
    this.uid = url.split('/')[4];
  }

  cargarNoticia(){
    this.fire.getBlogs().subscribe(noticia => {
      if (noticia.length > 0) {
        for(let i = 0; i < noticia.length; i++){
          if(noticia[i].uid == this.uid){
            this.noticia = noticia[i];
            console.log(this.noticia);
          }
        }
      }
    });
  }

}
