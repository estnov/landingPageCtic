import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable  } from 'rxjs';
import {map} from 'rxjs/operators'
import { collection, doc, setDoc } from "firebase/firestore";

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

  private serviciosCollection: AngularFirestoreCollection<any>;
  servicios$: Observable<any[]>;

  private blogCollection: AngularFirestoreCollection<any>;
  blogs$: Observable<any[]>;

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
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, data }; // Include UID in the returned object
        });
      })
    );

    this.serviciosCollection = afs.collection<any>('servicios');
    this.servicios$ = this.serviciosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, data }; // Include UID in the returned object
        });
      })
    );

    this.blogCollection = afs.collection<any>('blog');
    this.blogs$ = this.blogCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, data }; // Include UID in the returned object
        });
      })
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

  getServicios(): Observable<any[]> { 
    return this.servicios$;
  }

  getBlogs(): Observable<any[]> {
    return this.blogs$;
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

  uploadImage(file: File, type: string): Observable<string> {
    const filePath = `Imagenes/${type}/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    return new Observable<string>(observer => {
      task.then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          observer.next(url);
          observer.complete();
        });
      }).catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  uploadFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const filePath = `Documentos/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().subscribe(
        () => {},
        error => reject(error),
        () => {
          fileRef.getDownloadURL().subscribe(
            url => resolve(url),
            error => reject(error)
          );
        }
      );
    });
  }

  updateDocument(documentId: string, titulo: string, autor: string, texto: string, imagen: string, cargos:string, descripcion:string, tecnologias:string, documento: string, tipo: string): Observable<any> {
    // Update the document using the Firestore update method
    return  Observable.create((observer:any) => {this.afs.collection(tipo).doc(documentId).update({
      titulo: titulo,
      autor: autor,
      texto: texto,
      imagen: imagen,
      cargos: cargos,
      descripcion: descripcion,
      tecnologias: tecnologias,
      documento: documento

    })
    .then(() => {
      console.log('Document updated successfully.');
      observer.next();
      observer.complete();
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
      observer.error("Error al actualizar el documento");
    });
  });
  }

  createDocument(titulo: string, autor: string, texto: string, imagen: string, cargos:string, descripcion:string, tecnologias:string, documento: string, tipo: string): Observable<any> {
    return Observable.create((observer:any) => {
      this.afs.collection(tipo).add({
        titulo: titulo,
        autor: autor,
        texto: texto,
        imagen: imagen,
        cargos: cargos,
        descripcion: descripcion,
        tecnologias: tecnologias,
        documento: documento
      })
      .then((docRef) => {
        console.log('Document created successfully. Document ID:', docRef.id);
        observer.next(docRef.id); 
        observer.complete(); 
      })
      .catch((error) => {
        console.error('Error creating document: ', error);
        observer.error('Failed to create document.'); // Emit error value
      });
    });
  }

}
