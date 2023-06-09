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

  public servicio: any;
  public documentLink: string = '';

  constructor(
    public dialogRef: MatDialogRef<ServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.servicio = this.data.servicio.data;
    this.documentLink = this.servicio.documento;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
