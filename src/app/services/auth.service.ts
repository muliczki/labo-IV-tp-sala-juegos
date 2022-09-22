import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggeado?:string;
  nombreUserLoggeado:string|undefined=undefined;

  constructor(private auth:AngularFireAuth) { 
    auth.authState.subscribe(user =>{
      console.log(user);
    });
  }
  


  login(user:any, pass:any){
    return this.auth.signInWithEmailAndPassword(user, pass);
  }

  logout(){
    return this.auth.signOut();
  }

  registrar(user:any, pass:any){
    return this.auth.createUserWithEmailAndPassword(user, pass);
  }

  isLogged(){
    console.log(this.auth.authState);
    return this.auth.authState;
  }

}
