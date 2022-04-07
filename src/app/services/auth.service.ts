import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { 
    auth.authState.subscribe(user =>{
      console.log(user);
    });
  }
  


  login(user:string, pass:string){
    return this.auth.signInWithEmailAndPassword(user, pass);
  }

  logout(){
    return this.auth.signOut();
  }

  registrar(user:string, pass:string){
    return this.auth.createUserWithEmailAndPassword(user, pass);
  }

  isLogged(){
    return this.auth.authState;
  }
}
