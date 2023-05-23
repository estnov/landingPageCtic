import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface DialogData {
  servicio: any;
}


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})



export class ServicioComponent {

  public titulo: string ="";
  public descripcion: string ="";
  public tecnologias: string ="";
  public imagen: string ="";
  

  constructor(
    public dialogRef: MatDialogRef<ServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.titulo = data.servicio.titulo;
    this.descripcion = data.servicio.descripcion;
    this.tecnologias = data.servicio.tecnologias;
    this.imagen = data.servicio.imagen;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
