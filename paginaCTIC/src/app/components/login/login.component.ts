import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string='';
  password: string='';

  public hide: boolean = false;

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private afs: FirebaseService) {}

  submitForm(): void {
    this.afs.loggin(this.username, this.password).subscribe((res: any) => {
      console.log(res)
      if(res){
        console.log("Bienvenido administrador")
        this.dialogRef.close(true);
      } 
    },
    error => {
      this.hide = true;
    }
    )

    /*if (this.username === 'root' && this.password === 'root') {
      console.log(btoa(this.username + ':' + this.password));
      
      this.dialogRef.close(true); 

    } else {
      alert('Invalid username or password');
    }*/
  }
}
