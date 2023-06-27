import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../servicio/servicio.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-mostrar-blog',
  templateUrl: './mostrar-blog.component.html',
  styleUrls: ['./mostrar-blog.component.scss']
})
export class MostrarBlogComponent {

  public blogs: any[] = [];

  constructor(public dialogRef: MatDialogRef<MostrarBlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private fire : FirebaseService, private storage: AngularFireStorage,public dialog: MatDialog){





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
  }

  

}
