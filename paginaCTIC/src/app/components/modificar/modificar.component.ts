import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {

  public titulo: string = '';
  public descripcion: string = '';
  public texto: string = '';
  public autor: string = '';
  public imagen: string = '';
  public uid: string = '';

  public ocultarDescripcion: boolean = true;
  public ocultarTexto: boolean = true;
  public ocultarAutor: boolean = true;

  selectedFile: File | undefined;

  private tipo: any = localStorage.getItem('tipo');
  

  constructor(private dialogRef: MatDialogRef<ModificarComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private fire: FirebaseService) {
    console.log(this.tipo)
    this.titulo = data.elemento.data.titulo;
    this.uid = data.elemento.uid;
    if (this.tipo == 'blog'){
      this.texto = data.elemento.data.texto;
      this.ocultarTexto = false;
      this.autor = data.elemento.data.autor;
      this.ocultarAutor = false;
      this.imagen = data.elemento.data.imagen;
    }
  }

  cambiarImagen(event: any){
    console.log("cambiar imagen")

    this.selectedFile = event.target.files[0];

    if(this.selectedFile){
      this.fire.uploadImage(this.selectedFile, this.tipo).subscribe(url => {
        this.imagen = url;
      });
    }

  }

  guardar(){
    console.log("guardar")
    console.log(this.uid)
    this.fire.updateDocument(this.uid, this.titulo, this.autor, this.texto, this.imagen,this.tipo).subscribe(() => {

      this.dialogRef.close();
    }, (error) => {
      alert("Error al actualizar el documento");
    });

  }



}
