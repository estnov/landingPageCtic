import { Component, HostListener } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  public hideBuscando: boolean = false;
  searchKeyword: string;
  searchResults: any[];


  constructor(private router: Router, private fire : FirebaseService, private storage: AngularFireStorage) {

  }

  search() {
    if (this.searchKeyword) {
      this.hideBuscando = true;
      this.fire.searchByKeyword(this.searchKeyword).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
      this.hideBuscando = false;
    }
  }

  searching(){
    if(this.searchResults!=undefined)
    if(this.searchResults.length > 0){
      this.search();
      console.log(this.searchKeyword);
      console.log(this.searchResults.length);
    }
    
  }


  @HostListener("document:click")
  clickedOut() {
    this.hideBuscando = false;
  }



}
