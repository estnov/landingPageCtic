import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  blog: any;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  public titulo: string = ""


  constructor(public dialogRef: MatDialogRef<BlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,){
      this.titulo = this.data.blog.titulo
  }

}
