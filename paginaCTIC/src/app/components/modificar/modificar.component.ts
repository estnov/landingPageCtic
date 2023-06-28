import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {


  public creando: boolean = false;
  public tituloVentana: string = '';
  public textoBoton: string = '';

  public titulo: string = '';
  public descripcion: string = '';
  public texto: string = '';
  public autor: string = '';
  public imagen: string = '';
  public uid: string = '';
  public cargos: string = '';
  public tecnologias: string = '';
  public tags: string = '';

  public fileName: string | undefined = '';

  public ocultarDescripcion: boolean = true;
  public ocultarTexto: boolean = true;
  public ocultarAutor: boolean = true;
  public ocultarCargos: boolean = true;
  public ocultarTecnologias: boolean = true;
  public ocultarArchivo: boolean = true;
  public ocultarTags: boolean = true;

  selectedFile: File | undefined;

  document: File | undefined;
  documentLink: string = '';

  private tipo: any = localStorage.getItem('tipo');
  

  constructor(private dialogRef: MatDialogRef<ModificarComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private fire: FirebaseService) {
    console.log(this.tipo)
    console.log(data)
    this.uid = data.elemento.uid;
    //Se diferencia entre crear y modificar
    if (data.elemento.data != undefined){
      this.titulo = data.elemento.data.titulo;
      this.tituloVentana = 'Modificar ' + this.tipo;
      this.textoBoton = 'Modificar';
      this.imagen = data.elemento.data.imagen;
      this.creando = false;
      if (this.tipo == 'blog'){
        this.texto = data.elemento.data.texto;
        this.autor = data.elemento.data.autor;
        this.tags = data.elemento.data.tags;
      }
      else if (this.tipo == 'equipos'){
        this.cargos = data.elemento.data.cargos;
        this.descripcion = data.elemento.data.descripcion;
      }
      else if (this.tipo == 'servicios'){
        this.tecnologias = data.elemento.data.tecnologias;
        this.descripcion = data.elemento.data.descripcion;
      }
    } else {
      this.tituloVentana = 'Crear ' + this.tipo;
      this.textoBoton = 'Crear';
      this.creando = true;
    }

    //Se diferenia entre blog, servicio, etc
    if (this.tipo == 'blog'){
      this.ocultarTexto = false;
      this.ocultarAutor = false;
      this.ocultarTags = false;
    }
    if(this.tipo == 'equipos'){
      this.ocultarDescripcion = false;
      this.ocultarCargos = false;
    }
    if(this.tipo == 'servicios'){
      this.ocultarDescripcion = false;
      this.ocultarTecnologias = false;
      this.ocultarArchivo = false;

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
    if (this.creando){
      console.log("creando")
      this.fire.createDocument(this.titulo, this.autor, this.texto, this.imagen,this.cargos,this.descripcion,this.tecnologias,this.documentLink,this.tipo,this.tags).subscribe(() => {

        this.dialogRef.close();
      }, (error) => {
        alert("Error al crear el documento");
      });
    } else {
      this.fire.updateDocument(this.uid, this.titulo, this.autor, this.texto, this.imagen, this.cargos,this.descripcion,this.tecnologias,this.documentLink, this.tipo, this.tags).subscribe(() => {
        this.dialogRef.close();
      }, (error) => {
        alert("Error al actualizar el documento");
      });
    }
  }

  onFileSelected(event: any): void {
    this.document = event.target.files[0];
    this.fileName = this.document?.name;
  }

  uploadFile(): void {
    if (this.document) {
      this.fire.uploadFile(this.document)
        .then(link => {
          this.documentLink = link;
          console.log('Link:', link);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    }
  }

}
