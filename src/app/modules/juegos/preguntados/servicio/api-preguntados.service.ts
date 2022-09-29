import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPreguntadosService {

  // https://hp-api.onrender.com/api/characters
  url = 'https://hp-api.herokuapp.com/api/characters';
  objeto:any;
  
  constructor(private http:HttpClient) { }

  public ObtenerPersonajes():Observable<any>
  {
    return this.http.get<any>(this.url);
  }



  public formatearFecha(current_datetime:Date){
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    return formatted_date;
  }  
}


export const preguntas = [
  {
    pregunta:'Quién es Harry Potter?',
    opcion1:'Harry Potter',
    opcion2:'Ron Weasley',
    opcion3:'Draco Malfoy',
    correcta:'Harry Potter'
  },
  {
    pregunta:'Quién es Hermione Granger?',
    opcion1:'Luna Lovegood',
    opcion2:'Hermione Granger',
    opcion3:'Ginny Weasley',
    correcta: 'Hermione Granger'
  },
  {
    pregunta:'Quién es el padre de Ron Wesley?',
    opcion1:'Arthur Weasley',
    opcion2:'Remus Lupin',
    opcion3:'Horace Slughorn',
    correcta: 'Arthur Weasley'
  },
  {
    pregunta:'Quién es Neville Longbottom?',
    opcion1:'Vincent Crabbe',
    opcion2:'Neville Longbottom',
    opcion3:'Gregory Goyle',
    correcta: 'Neville Longbottom'
  },
  {
    pregunta:'Quién es Cedric Diggory?',
    opcion1:'Cedric Diggory',
    opcion2:'Draco Malfoy',
    opcion3:'Neville Longbottom',
    correcta: 'Cedric Diggory'
  },
  {
    pregunta:'Quién es Draco Malfoy?',
    opcion1:'Cedric Diggory',
    opcion2:'Draco Malfoy',
    opcion3:'Harry Potter',
    correcta: 'Draco Malfoy'
  },
  {
    pregunta:'Quién es Rubeus Hagrid?',
    opcion3:'Rubeus Hagrid',
    opcion2:'Severus Snape',
    opcion1:'Sirius Black',
    correcta: 'Rubeus Hagrid'
  },
  {
    pregunta:'Quién es Severus Snape?',
    opcion1:'Remus Lupin',
    opcion3:'Severus Snape',
    opcion2:'Sirius Black',
    correcta: 'Severus Snape'
  },
  {
    pregunta:'Quién es Remus Lupin?',
    opcion3:'Remus Lupin',
    opcion1:'Severus Snape',
    opcion2:'Sirius Black',
    correcta: 'Remus Lupin'
  },
  {
    pregunta:'Quién es Bellatrix Lestrange?',
    opcion1:'Bellatrix Lestrange',
    opcion2:'Dolores Umbridge',
    opcion3:'Minerva McGonagall',
    correcta: 'Bellatrix Lestrange'
  },
  {
    pregunta:'Quién es Dolores Umbridge?',
    opcion2:'Bellatrix Lestrange',
    opcion3:'Dolores Umbridge',
    opcion1:'Minerva McGonagall',
    correcta: 'Dolores Umbridge'
  },
  {
    pregunta:'Quién es Minerva McGonagall?',
    opcion3:'Bellatrix Lestrange',
    opcion1:'Dolores Umbridge',
    opcion2:'Minerva McGonagall',
    correcta: 'Minerva McGonagall'
  },
  {
    pregunta:'Quién es Vincent Crabbe?',
    opcion2:'Vincent Crabbe',
    opcion3:'Cedric Diggory',
    opcion1:'Gregory Goyle',
    correcta: 'Vincent Crabbe'
  },
  {
    pregunta:'Quién es Gregory Goyle?',
    opcion1:'Vincent Crabbe',
    opcion2:'Cedric Diggory',
    opcion3:'Gregory Goyle',
    correcta: 'Gregory Goyle'
  },
  {
    pregunta:'Quién es Luna Lovegood?',
    opcion2:'Luna Lovegood',
    opcion1:'Hermione Granger',
    opcion3:'Ginny Weasley',
    correcta: 'Luna Lovegood'
  },
  {
    pregunta:'Quién es Ginny Weasley?',
    opcion3:'Luna Lovegood',
    opcion1:'Hermione Granger',
    opcion2:'Ginny Weasley',
    correcta: 'Ginny Weasley'
  },
  {
    pregunta:'Quién es Lord Voldemort?',
    opcion3:'Lord Voldemort',
    opcion1:'Severus Snape',
    opcion2:'Sirius Black',
    correcta: 'Lord Voldemort'
  },

  {
    pregunta:'Quién es Sirius Black?',
    opcion2:'Remus Lupin',
    opcion3:'Severus Snape',
    opcion1:'Sirius Black',
    correcta: 'Sirius Black'
  },
  {
    pregunta:'Quién es Kingsley Shacklebolt?',
    opcion2:'Kingsley Shacklebolt',
    opcion3:'Severus Snape',
    opcion1:'Horace Slughorn',
    correcta: 'Kingsley Shacklebolt'
  },
  {
    pregunta:'Quién es Horace Slughorn?',
    opcion3:'Kingsley Shacklebolt',
    opcion1:'Argus Filch',
    opcion2:'Horace Slughorn',
    correcta: 'Horace Slughorn'
  },
  {
    pregunta:'Quién es Argus Filch?',
    opcion1:'Kingsley Shacklebolt',
    opcion2:'Argus Filch',
    opcion3:'Horace Slughorn',
    correcta: 'Argus Filch'
  },


]