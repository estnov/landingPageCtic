import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private misionCollection: AngularFirestoreCollection<any>;
  mision$: Observable<any[]>;

  private visionCollection: AngularFirestoreCollection<any>;
  vision$: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
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
}
