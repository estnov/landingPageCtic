import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(@Inject(DOCUMENT) private document: Document, private fire: FirebaseService, private router: Router) { 
    this.obtainURL();
    this.cargarNoticia();
    this.cargarBlogs();

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
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
    let tagsLocales = this.noticia.data.tags.split(',');
    if (blogs.length > 0) {
      this.blogs = [];
      for(let i=0; i<blogs.length; i++){
        let tags = blogs[i].data.tags.split(',');
        let tagsCoincidentes = 0;
        for(let j=0; j<tags.length; j++){
          for(let k=0; k<tagsLocales.length; k++){
            if(tags[j] == tagsLocales[k]){
              tagsCoincidentes++;
            }
          }
        }
        if(tagsCoincidentes > 0 && blogs[i].uid != this.uid){
          this.blogs.push(blogs[i]);
        }
        
      }
    } else {
      console.log("No hay objetos para el blog instanciados en la BD");
    }
  });
}

verBlog(blog: any): void {
  const formattedTitle = blog.data.titulo.toLowerCase().replace(/ /g, '-');

  //console.log("Se navega a: ", blog.uid,"/", formattedTitle);

  let url = blog.uid + "/" + formattedTitle;

  let uri = '/noticia/' + blog.uid + "/" + formattedTitle;

  this.redirectTo(uri);

  //this.router.navigate(['/noticia', blog.uid, formattedTitle]);  
}

redirectTo(uri: string) {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  this.router.navigate([uri]));
}


  

}
