import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { LogUsuario } from '../classes/log-usuario';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userRef: AngularFirestoreCollection
  private userLogRef: AngularFirestoreCollection

  constructor(private db: AngularFirestore) {
    this.userRef = this.db.collection('usuarios');
    this.userLogRef = this.db.collection('logsusuarios');
  }

  public crearUsuario(u:Usuario){
    return this.userRef.add({...u});
  }

  public obtenerUsuarios(){
    return this.userRef.valueChanges() as Observable<Usuario[]>;
  }

  public crearLogUsuario(l:LogUsuario){
    return this.userLogRef.add({...l});
  }

  public obtenerLogUsuarios(){
    return this.userLogRef.valueChanges() as Observable<LogUsuario[]>;
  } 

  public formatearFecha(current_datetime:Date){
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    return formatted_date;
  }  
  // public generarId(){
  //   return
  // }
}
