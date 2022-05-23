import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Carta, cartas } from './cartas';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent implements OnInit {

  hola = !true;
  srcCarta:string = "";
  srcNaipe:string = "";
  puntos = 0;
  eleccion ='primera';
  remainingAttempts= 0;
  MAX_ATTEMPTS=5;

  cartas = cartas;
  cartaActual:Carta = {id:0, nombre:'', valor:0};

  constructor() { 
  }



  ngOnInit(): void {
    
    this.jugar();
    this.resetAttempts();
  }


  miToast = Swal.mixin({
    toast: true,
    // position: 'top-end',
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  miAlert = Swal.mixin({
    position: 'center',
  })



  //al indice lo consigo de manera randon por la funcion, pero le resto uno para que coincida con el array
  jugar(){

    if(this.eleccion!=''){

      let cartaAnterior = this.cartaActual;
      this.elegirCarta();
      this.elegirBaraja();

      if(cartaAnterior.valor!=0){
        if(this.eleccion == 'menor' && this.cartaActual.valor<cartaAnterior.valor){
          this.puntos ++;
          this.mostrarMiToast("Muy bien, sumaste un punto!!", "success");
        }else if(this.eleccion == 'mayor' && this.cartaActual.valor>cartaAnterior.valor){
          this.puntos ++;
          this.mostrarMiToast("Muy bien, sumaste un punto!!", "success");
        }else if(this.cartaActual.valor==cartaAnterior.valor){

          this.mostrarMiToast("Empate!", "warning");
        }
        else{

          this.mostrarMiToast("Perdiste una vida!", "error");
          this.remainingAttempts -= 1;
          if (this.playerLoses()) {
            this.mostrarMiAlert("Juego terminado. \nLograste un puntaje de: "+ this.puntos,"success");
            this.resetGame();
        }

        }
      }

      console.log(this.eleccion);
      this.eleccion = "";
    }else{
      this.mostrarMiToast("Seleccione si la siguiente carta es mayor o menor a la actual!", "info");

      // Swal.fire('Por favor, seleccione si la siguiente carta es mayor o menor a la actual!');
    }
  
  }


  resetAttempts() {
    this.remainingAttempts = this.MAX_ATTEMPTS;
  }

  resetGame() {
    this.resetAttempts();
    this.puntos = 0;
  }

  playerLoses() {
    return this.remainingAttempts <= 0;
  }

  elegirCarta(){

    let indiceCarta = this.random(1,52) - 1; 
    console.log(this.cartas[indiceCarta]);
    this.cartaActual = this.cartas[indiceCarta];

    this.srcCarta = "http://deckofcardsapi.com/static/img/"+this.cartaActual.nombre+".png";
  }

  elegirBaraja(){

    let indiceNaipe = this.random(0,1); 
    console.log(indiceNaipe);
    this.srcNaipe = "../../../assets/naipe"+indiceNaipe+".jpg";
  }





  mostrarMiToast(text:any, type:any){
    this.miToast.fire({icon: type,
    title: text});
  }

  mostrarMiAlert(text:any, type:any){
    this.miAlert.fire({icon: type,
    title: text});
  }



  //elije numero al azar
  //agarro un numero entre el min y el max 
  random(min:number, max:number){
    return Math.round(Math.random() * (max - min) + min);
  }




}
