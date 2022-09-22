import { Component, OnInit } from '@angular/core';
import { PuntuacionAhorcado } from 'src/app/classes/puntuacion-ahorcado';
import { Usuario } from 'src/app/classes/usuario';
import { ApiPalabrasService, listaPalabras } from 'src/app/services/apipalabras/apipalabras.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { AhRankingServService } from './ah-ranking-serv.service';
import { letter } from './clases/ahorcado';
import { PuntuacionAcumulada } from './clases/puntuacion-acumulada';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  getWords = () => (["ahorcado"]);
  // getWords = () => (JSON.parse(localStorage.getItem(LOCAL_STORAGE_WORDS_KEY)) || []);
  hiddenWord:letter[] =[];
  ALPHABET = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
  MAX_ATTEMPTS = 6;
  MASK_CHAR = "_";
  remainingAttempts= 0;

  letters:letter[];
  palabra:any=null;

  listadoPalabras = listaPalabras //sin api

  public puntuaciones:PuntuacionAhorcado[] = [];
  public listaUsuarios:Usuario[] = [];
  public puntuacionesAcumuladas:PuntuacionAcumulada[] = [];

  constructor(private apiPalabrasServ:ApiPalabrasService, private authServ:AuthService, private puntServ:AhRankingServService, private userServ:UserService) { 
    this.letters = [];

    this.userServ.obtenerUsuarios().subscribe(
      usuarios => this.listaUsuarios = usuarios
    );

    this.puntServ.obtenerPuntuaciones().subscribe(
      puntajes => this.puntuaciones = puntajes
    );

    this.armarPuntuacion();

  }

  armarPuntuacion(){
    this.puntuacionesAcumuladas = [];

    this.listaUsuarios.forEach(element => {
      console.log(element.email);
      let puntuacion = new PuntuacionAcumulada();
      puntuacion.email = element.email;
      puntuacion.nombre = element.nombre;
      this.puntuacionesAcumuladas.push(puntuacion);
    });
    
    this.puntuaciones.forEach(punto => {
      this.puntuacionesAcumuladas.forEach(element => {
        if(punto.email == element.email){
          if(punto.partidaGanada){
            element.ganadas ++;
          }else{
            element.perdidas ++;
          }
        }
      });
    });

    console.log(this.puntuacionesAcumuladas);
  }
  
  async obtenerPalabra(){

    //LE PEGO A LA API
    // this.apiPalabrasServ.ObtenerPalabraSustantivo().subscribe(
    //   palabra => this.palabra = palabra.body.Word
    // );
    
    let indice = Math.floor(Math.random() * this.listadoPalabras.length);
    this.palabra = this.listadoPalabras[indice];
    console.log(this.palabra);
    

    // this.palabra = this.palabra.keys();
    
  }
  
  ngOnInit(): void {
    this.resetGame();
  }
  
  async resetGame() {
    await this.obtenerPalabra();
    
    if(this.palabra){
     this.chooseWord(); 
     this.resetAttempts();
     this.setupKeys();
    }

    // console.log(this.palabra);
  }
  
  resetAttempts() {
    this.remainingAttempts = this.MAX_ATTEMPTS;
  }
  
  setupKeys() {
    // We make a dictionary from the letters
    this.letters = [];
    for (const letra of this.ALPHABET) {
      
      let letraPrueba = new letter();
      letraPrueba.letter = letra;
      letraPrueba.hidden = false;

      this.letters.push(letraPrueba);
    }
  }

  displayWord() {
    // console.log(this.palabra.body.Word) //peter

    let displayedWord = "";
    for (const letter of this.hiddenWord) {
        if (letter.hidden) {
          displayedWord += this.MASK_CHAR;
        } else {
          displayedWord += letter.letter;
        }
        displayedWord += " ";
    }
    return displayedWord;
  }

  async chooseWord() {

    
    setTimeout(() => {
      this.armarPuntuacion();
      console.log(this.palabra);
      
      if(this.palabra.length>3){

        this.prepareWord(this.palabra);
      }else{
        this.resetGame();
      }

    }, 1000);

    // Get words stored in localstorage
    // const words = this.getWords();
    // Choose random
  }

  prepareWord(word:string) {
    word = word.toUpperCase();
    const hiddenWord = [];
    for (const letter of word) {
        hiddenWord.push({
            letter,
            hidden: true,
        });
    }
    this.hiddenWord = hiddenWord;
  }

  imagePath() {
    return `./../../../assets/img/Ahorcado-${this.MAX_ATTEMPTS - this.remainingAttempts}.png`;
  }

  attemptWithLetter(letter:string) {
    
    this.letters.forEach(element => {
      if(element.letter == letter){
        element.hidden = true;
      }
    });

    if (!this.letterExistsInWord(letter)) {
        this.remainingAttempts -= 1;
    } else {
        this.discoverLetter(letter);
    }
    this.checkGameStatus();
  }

  letterExistsInWord(searchedLetter:string) {
    
    for (let index = 0; index < this.hiddenWord.length; index++) {
      const element = this.hiddenWord[index];
      // console.log(element);
      if (element.letter === searchedLetter) {
        return true;
      }
      
    }
    return false;
  }

  discoverLetter(letter:string) {
    for (const index in this.hiddenWord) {
        if (this.hiddenWord[index].letter === letter) {
          this.hiddenWord[index].hidden = false;
        }
    }
  }
  
  checkGameStatus() {

    let nuevaPuntacion =new PuntuacionAhorcado();
    nuevaPuntacion.email = this.authServ.userLoggeado;
    nuevaPuntacion.nombre = this.authServ.nombreUserLoggeado;
    nuevaPuntacion.fechaCreacion = this.apiPalabrasServ.formatearFecha(new Date());

    if (this.playerWins()) {
      Swal.fire("Ganaste! La palabra era " + this.getUnhiddenWord());
      nuevaPuntacion.partidaGanada = true;
      this.puntServ.crearPuntuacion(nuevaPuntacion);
      this.armarPuntuacion();
      
      this.resetGame();
    }
    if (this.playerLoses()) {
      Swal.fire("Perdiste. La palabra era " + this.getUnhiddenWord());
      nuevaPuntacion.partidaGanada = false;
      this.puntServ.crearPuntuacion(nuevaPuntacion);
      this.armarPuntuacion();

      this.resetGame();
    }
  }

  getUnhiddenWord() {
    let word = "";
    for (const letter of this.hiddenWord) {
        word += letter.letter;
    }
    return word;
  }

  playerWins() {
    // If there's at least a hidden letter, the player hasn't win yet
    for (const letter of this.hiddenWord) {
        if (letter.hidden) {
            return false;
        }
    }
    return true;
  }

  playerLoses() {
    return this.remainingAttempts <= 0;
  }

  verPuntajes(){
    if(this.puntuaciones){
      this.ordenarPuntuacion();

      console.log(this.puntuacionesAcumuladas);

      var mensaje = "Puntuacion: ";
      for(let i = 0; i < this.puntuacionesAcumuladas.length; i++){
      mensaje = mensaje+ ' NOMBRE '+this.puntuacionesAcumuladas[i].nombre+ '/n' +' ganadas '+ this.puntuacionesAcumuladas[i].ganadas;
      }

      alert(mensaje);

    }
  }

  ordenarPuntuacion(){
    this.puntuacionesAcumuladas.sort(function (a, b) {
      if (a.ganadas < b.ganadas) {
        return 1;
      }
      if (a.ganadas > b.ganadas) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

  }

}
