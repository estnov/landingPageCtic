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
    this.cargarBlogs();
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

  public blogs: any[] = [];

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
cargarBlogs(){
  this.fire.getBlogs().subscribe(blogs => {
    let maxBlogs = 4;
    if (blogs.length > 0) {
      this.blogs = [];
      for(let i=0; i<blogs.length; i++){
        this.blogs.push(blogs[i]);
        if(i==maxBlogs){
          break;
        }
      }
    } else {
      console.log("No hay objetos para el blog instanciados en la BD");
    }
  });
}
  

}
