import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { PuntuacionWordle } from '../wordle.component';

@Injectable({
  providedIn: 'root'
})
export class WordleRankingService {

  private puntuacionRef: AngularFirestoreCollection

  constructor(private db: AngularFirestore) {
    this.puntuacionRef = this.db.collection('puntuacion-wordle');
  }

  public crearPuntuacion(p:PuntuacionWordle){
    return this.puntuacionRef.add({...p});
  }

  public obtenerPuntuaciones(){
    return this.puntuacionRef.valueChanges() as Observable<PuntuacionWordle[]>;
  }

  public formatearFecha(current_datetime:Date){
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    return formatted_date;
  }  
}
