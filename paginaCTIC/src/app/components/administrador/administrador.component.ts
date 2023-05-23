import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent {
  
    constructor(private dialog: MatDialog, private router: Router) { }

    ngOnInit(): void {
      this.openLoginDialog();
    }
  
    openLoginDialog(): void {
      const dialogRef = this.dialog.open(LoginComponent, {
        disableClose: true,
      });
  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          alert("Bienvenido administrador")
        } else {
          this.router.navigate(['/']);
        }
      });
    }

}
