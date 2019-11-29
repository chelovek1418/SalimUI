import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, first } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin';



@Injectable({ providedIn: 'root' })
export class AdminService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth){
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  logout(){
      return this.afAuth.auth.signOut();
  }

  login(value: any){
      return new Promise((resolve, reject)=>{
          this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
          .then(userData=>resolve(userData),
          err=>reject(err));
      })
    // return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
}