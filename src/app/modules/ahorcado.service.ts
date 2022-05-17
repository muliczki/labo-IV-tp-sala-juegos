import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  urlRandom = 'https://palabras-aleatorias-public-api.herokuapp.com/random';
  urlSustantivo = 'https://palabras-aleatorias-public-api.herokuapp.com/random-by-type?types=sustantivo';
  objetoPalabra:any;
  constructor(private http:HttpClient) { }

  public ObtenerPalabraRandom():Observable<any>
  {
    return this.http.get<any>(this.urlRandom);
  }

  public ObtenerPalabraSustantivo():Observable<any>
  {
    return this.http.get<any>(this.urlSustantivo);
  }
}
