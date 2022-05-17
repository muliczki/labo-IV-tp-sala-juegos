import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { letter } from '../ahorcado';
import { AhorcadoService } from '../ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})


export class AhorcadoComponent implements OnInit {

  getWords = () => (["ahorcado"]);
  // getWords = () => (JSON.parse(localStorage.getItem(LOCAL_STORAGE_WORDS_KEY)) || []);
  hiddenWord:letter[] =[];
  ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  MAX_ATTEMPTS = 6;
  MASK_CHAR = "_";
  remainingAttempts= 0;

  letters:letter[];
  palabra:any;

  constructor(private ahorcServ:AhorcadoService) { 
    this.letters = [];
    
  }
  
  async obtenerPalabra(){
    // this.ahorcServ.ObtenerPalabraRandom().subscribe(
    this.ahorcServ.ObtenerPalabraSustantivo().subscribe(
      palabra => this.palabra = palabra.body.Word
    );
    // this.palabra = this.palabra.keys();
    
    
  }
  
  ngOnInit(): void {
    this.resetGame();
  }
  
  async resetGame() {
    await this.obtenerPalabra().then(
      () => this.chooseWord()
    );
    this.resetAttempts();
    this.setupKeys();
    
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
    if (this.playerWins()) {
        Swal.fire("Ganaste! La palabra era " + this.getUnhiddenWord());
        this.resetGame();
    }
    if (this.playerLoses()) {
        Swal.fire("Perdiste. La palabra era " + this.getUnhiddenWord());
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
}
