import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string='';
  password: string='';

  constructor(private dialogRef: MatDialogRef<LoginComponent>) {}

  submitForm(): void {
    console.log(this.username);
    console.log(this.password);
    if (this.username === 'root' && this.password === 'root') {
      localStorage.setItem('logged', 'true');
      this.dialogRef.close(true); 

    } else {
      alert('Invalid username or password');
    }
  }
}
