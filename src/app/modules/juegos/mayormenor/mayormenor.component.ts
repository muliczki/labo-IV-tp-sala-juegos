import { Component, OnInit } from '@angular/core';
import { PuntuacionMayormenor } from 'src/app/classes/puntuacion-mayormenor';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Carta, cartas } from './cartas';
import { MmRankingServService } from './mm-ranking-serv.service';

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

  public titulosColumnas = ['nombre de usuario', 'puntaje'];
  public filas:PuntuacionMayormenor[] = [];

  public puntuaciones:PuntuacionMayormenor[] = [];
  public rankingOrdenado:PuntuacionMayormenor[] = [];
  

  constructor(private authServ:AuthService, private puntServ:MmRankingServService) { 

    this.puntServ.obtenerPuntuaciones().subscribe(
      puntajes => this.puntuaciones = puntajes
    );

    this.armarPuntuacion();



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
        if((this.eleccion == 'menor' && this.cartaActual.valor<cartaAnterior.valor) || 
        (this.eleccion == 'mayor' && this.cartaActual.valor>cartaAnterior.valor)){
          
          this.puntos ++;
          this.mostrarMiToast("Muy bien, sumaste un punto!!", "success");

        }else if(this.cartaActual.valor==cartaAnterior.valor){

          this.mostrarMiToast("Empate!", "warning");
        }
        else{

          this.mostrarMiToast("Perdiste una vida!", "error");
          this.remainingAttempts -= 1;
          if (this.playerLoses()) {

            let puntuacion = new PuntuacionMayormenor();
            puntuacion.email = this.authServ.userLoggeado;
            puntuacion.nombre = this.authServ.nombreUserLoggeado;
            puntuacion.fechaCreacion = this.puntServ.formatearFecha(new Date());
            puntuacion.puntos = this.puntos;

            this.puntServ.crearPuntuacion(puntuacion);

            this.armarPuntuacion();
            
            this.mostrarMiAlert("Juego terminado. \nLograste un puntaje de: "+ this.puntos,"success");
            this.resetGame();
        }

        }
      }

      // console.log(this.eleccion);
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
    // console.log(this.cartas[indiceCarta]);
    this.cartaActual = this.cartas[indiceCarta];

    this.srcCarta = "http://deckofcardsapi.com/static/img/"+this.cartaActual.nombre+".png";
  }

  elegirBaraja(){

    let indiceNaipe = this.random(0,1); 
    // console.log(indiceNaipe);
    this.srcNaipe = "../../../assets/naipe"+indiceNaipe+".jpg";
  }




  armarPuntuacion(){

    setTimeout(() => {
      console.log(this.puntuaciones);
      this.rankingOrdenado = this.puntuaciones;
      
      this.rankingOrdenado.sort(function (a, b) {
        if (a.puntos < b.puntos) {
          return 1;
        }
        if (a.puntos > b.puntos) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      
      console.log(this.rankingOrdenado);

      for (let index = 0; index < this.rankingOrdenado.length; index++) {
        const element = this.rankingOrdenado[index];

        let fila = new PuntuacionMayormenor();
        fila.puntos = element.puntos;
        fila.nombre = element.nombre;

        this.filas.push(fila);

      }
      
    }, 2000);

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
