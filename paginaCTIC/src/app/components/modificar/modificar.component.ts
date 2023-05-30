import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {

  public titulo: string = '';

  constructor(private dialogRef: MatDialogRef<ModificarComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log(data)
    this.titulo = data.elemento.titulo;
  }

  onFileChange(event:any){
    
  }



}
