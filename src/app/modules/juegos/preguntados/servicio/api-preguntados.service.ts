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


export const listaPersonajesHp = [
'Harry Potter',
'Hermione Granger',
'Ron Weasley',
'Draco Malfoy',
'Minerva McGonagall',
'Cedric Diggory',
'Cho Chang',
'Severus Snape',
'Rubeus Hagrid',
'Neville Longbottom',
'Luna Lovegood',
'Ginny Weasley',
'Sirius Black',
'Remus Lupin',
'Arthur Weasley',
'Bellatrix Lestrange',
'Lord Voldemort',
'Horace Slughorn',
'Kingsley Shacklebolt',
'Dolores Umbridge',
'Lucius Malfoy',
'Vincent Crabbe',
'Gregory Goyle',
'Mrs Norris',
'Argus Filch',
'Vernon Dursley',
'Petunia Dursley',
'Dudley Dursley',
'Lily Potter',
'James Potter',
'Albus Dumbledore',
'Madam Pomfrey',
'Mrs Figg',
'Marge Dursley',
'Yvonne',
'Piers Polkiss',
'Dennis',
'Malcolm',
'Gordon',
'Miranda Gaushawk',
'Bathilda Bagshot',
'Adalbert Waffling',
'Emeric Switch',
'Phyllida Spore',
'Arsenius Jigger',
'Newt Scamander',
'Quentin Trimble',
'Tom',
'Doris Crockford',
'Quirinus Quirrel',
'Griphook',
'Madam Malkin',
'Vindictus Viridian',
'Garrick Ollivander',
'Hedwig',
'Molly Weasley',
'Percy Weasley',
'Fred Weasley',
'George Weasley',
'Lee Jordan',
'Bill Weasley',
'Charlie Weasley',
'Fat Friar',
'Peeves',
'Hannah Abbott',
'Susan Bones',
'Terry Boot',
'Mandy Brocklehurst',
'Lavender Brown',
'Millicent Bulstrode',
'Justin Finch-Fletchley',
'Seamus Finnegan',
'Morag MacDougal',
'Lily Moon',
'Theodore Nott',
'Pansy Parkinson',
'Parvati Patil',
'Padma Patil',
'Sally-Anne Perks',
'Lisa Turpin',
'Blaise Zabini',
'Nearly Headless Nick',
'Bloody Baron',
'Fat Lady',
'Pomona Sprout',
'Cuthbert Binns',
'Emeric the Evil',
'Uric the Oddball',
'Filius Flitwick',
'Madam Hooch',
'Oliver Wood',
'Gregory the Smarmy',
'Wizard Baruffio',
'Angelina Johnson',
'Marcus Flint',
'Alicia Spinet',
'Katie Bell',
'Adrian Pucey',
'Miles Bletchley',
'Terrence Higgs',
'Fluffy',
'Nicolas Flamel',
'Gellert Grindelwald',
'Norberta',
'Ronan',
'Bane',
'Firenze',
'Elfrick the Eager',
'Perenelle Flamel',
'Bertie Bott',
'Dobby',
'Mr Mason',
'Mrs Mason',
'Perkins',
'Celestina Warbeck',
'Gilderoy Lockhart',
'Mundungus Fletcher',
'Mr Borgin',
'Mr Granger',
'Mrs Granger',
'Dr Filibuster',
'Colin Creevey',
'Gladys Gudgeon',
'Veronica Smethley',
'Patrick Delaney-Podmore',
'Z. Nettles',
'D.J. Prod',
'Elsie Prod',
'Moaning Myrtle',
'Godric Gryffindor',
'Rowena Ravenclaw',
'Helga Hufflepuff',
'Salazar Slytherin',
'Madame Pince',
'Milicent Bullstroude',
'Ernie Macmillan',
'Armando Dippet',
'Penelope Clearwater',
'Cornelius Fudge',
'Aragog',
'Mosag',
'Stanley Shunpike',
'Ernest Prang',
'Madam Marsh',
'Florean Fortescue',
'Sir Cadogan',
'Sybill Trelawney',
'Buckbeak',
'Peter Pettigrew',
'Madam Rosmerta',
'Derek',
'Septima Vector',
'Cassius Warrington',
'Graham Montague',
'Peregrine Derrick',
'Lucian Bole',
'Walden Macnair',
'Franc Bryce',
'Dot',
'Bertha Jorkins',
'Barty Crouch',
'Ludo Bagman',
'Amos Diggory',
'Mr Roberts',
'Mr Payne',
'Basil',
'Archie Aymslowe',
'Cuthbert Mockridge',
'Gilbert Wimple',
'Arnold Peasegood',
'Broderick Bode',
'Saul Croaker',
'Ali Bashir',
'Victor Krum',
'Winky',
'Narcissa Malfoy'


]