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

  private descripcionCollection: AngularFirestoreCollection<any>;
  descripcion$: Observable<any[]>;

  private equiposCollection: AngularFirestoreCollection<any>;
  equipos$: Observable<any[]>;

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

    this.descripcionCollection = afs.collection<any>('descripcion');
    this.descripcion$ = this.descripcionCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );

    this.equiposCollection = afs.collection<any>('equipos');
    this.equipos$ = this.equiposCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );
  }

  getMision(): Observable<any[]> {
    return this.mision$;
  }

  getVision(): Observable<any[]> {
    return this.vision$;
  }

  getDescripcion(): Observable<any[]> {
    return this.descripcion$;
  }

  getEquipos(): Observable<any[]> {
    return this.equipos$;
  }

  getImagenVision(): Observable<any>{
    const storageRef = this.storage.ref('Imagenes/Vision'); 
    return storageRef.listAll();
  }

  getImagenMision(): Observable<any>{
    const storageRef = this.storage.ref('Imagenes/Mision'); 
    return storageRef.listAll();
  }

  getImagenDescripcion(): Observable<any>{
    const storageRef = this.storage.ref('Imagenes/DescripcionCTIC'); 
    return storageRef.listAll();
  }
}
