import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private misionCollection: AngularFirestoreCollection<any>;
  mision$: Observable<any[]>;

  private visionCollection: AngularFirestoreCollection<any>;
  vision$: Observable<any[]>;

  imageUrls: string[] = [];

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.misionCollection = afs.collection<any>('mision');
    this.mision$ = this.misionCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );

    this.visionCollection = afs.collection<any>('vision');
    this.vision$ = this.visionCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );
  }

  getMision(): Observable<any[]> {
    return this.mision$;
  }

  getVision(): Observable<any[]> {
    return this.vision$;
  }

  getImagenesHeader(){
    const storageRef = this.storage.ref('Imagenes/Header'); 
    this.imageUrls = [];
    storageRef.listAll().subscribe(listResult => {
      listResult.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(imageUrl => {
          this.imageUrls.push(imageUrl);
        });
      });
    });
    if(this.imageUrls.length == 0){
      alert("No se encontraron imagenes en el storage");
    } else{
      alert("Se encontraron imagenes en el storage");
    }

    return this.imageUrls;
  }

  getImagenesEquipo(){
    const storageRef = this.storage.ref('Imagenes/Equipos'); 
    storageRef.listAll().subscribe(listResult => {
      listResult.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(imageUrl => {
          this.imageUrls.push(imageUrl);
        });
      });
    });
    return this.imageUrls;
  }
}
