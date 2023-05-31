import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  public ocultarDescripcion: boolean = true;
  public ocultarTexto: boolean = true;
  public ocultarAutor: boolean = true;

  private tipo: any = localStorage.getItem('tipo');
  

  constructor(private dialogRef: MatDialogRef<ModificarComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log(this.tipo)
    this.titulo = data.elemento.data.titulo;
    if (this.tipo == 'blog'){
      this.texto = data.elemento.data.texto;
      this.ocultarTexto = false;
      this.autor = data.elemento.data.autor;
      this.ocultarAutor = false;
      this.imagen = data.elemento.data.imagen;
    }
    
    

    
  }

  onFileChange(event:any){
    
  }

  cambiarImagen(){
    console.log("cambiar imagen")
  }



}
