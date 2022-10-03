import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { PregRankingService } from './service/preg-ranking.service';
import { ApiPreguntadosService, preguntas } from './servicio/api-preguntados.service';

class Pregunta {

  pregunta:any;
  opcion1:any;
  opcion2:any;
  opcion3:any;
  correcta:any;

}

export class PuntuacionPreguntados{

  public nombre?:string;
  public email?:string;
  public fechaCreacion?:string;
  public puntos:number =0;
}

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  listadoApi = [];
  personaje:any;

  preguntas = preguntas;

  miPregunta:Pregunta;
  cargoPregunta = false;
  preguntasUsadas = Array();

  indice:number=-1;
  puntos = 0;
  vidas = 3;

  public puntuaciones:PuntuacionPreguntados[] = [];
  public rankingOrdenado:PuntuacionPreguntados[] = [];

  
  constructor(private apiHp:ApiPreguntadosService, private puntServ:PregRankingService, private authServ:AuthService) {
    this.miPregunta = new Pregunta();

    this.puntServ.obtenerPuntuaciones().subscribe(
      puntajes => this.puntuaciones = puntajes
    );

    this.armarPuntuacion();

  }

  

  ngOnInit(): void {
    this.reiniciarJuego();
    this.obtenerPersonajes();

    setTimeout(() => {
      
      this.elegirPregunta();
    }, 1000);
  }
  

  async obtenerPersonajes(){
    
    //LE PEGO A LA API
    await this.apiHp.ObtenerPersonajes().subscribe(
      listado => this.listadoApi = listado
    );
      
  }

  elegirPregunta(){
    // chequeo != null
    
    this.indice = Math.floor(Math.random() * this.preguntas.length);
    
    if(this.preguntasUsadas.includes(this.indice)){
      this.elegirPregunta();
    }else{
      
      this.preguntasUsadas.push(this.indice);
    
        
      
      this.miPregunta = this.preguntas[this.indice];
          
  
        
      if(this.listadoApi){
  
        this.listadoApi.forEach(element => {
          
          if( element['name'] === this.miPregunta.opcion1)
          {
            this.miPregunta.opcion1 = element;
          }
          
          if( element['name'] === this.miPregunta.opcion2)
          {
            this.miPregunta.opcion2 = element;
          }
          
          if( element['name'] === this.miPregunta.opcion3)
          {
            this.miPregunta.opcion3 = element;
          }
          
        });        
        
        // this.personaje = this.listadoApi[indice]
        this.cargoPregunta = true;        
        if(this.personaje){
          
          console.log(this.personaje);
        }
      }
    }
  

    
  }



  seleccionar(opcion:any){
    if(opcion.name === this.miPregunta.correcta){
      this.mostrarMiToast("Muy bien, sumaste un punto!!", "success");
      this.puntos++;
    }else{
      this.mostrarMiToast("Perdiste una vida!", "error");
      this.vidas--;
      if(this.vidas==0){
        let puntuacion = new PuntuacionPreguntados();
        puntuacion.email = this.authServ.userLoggeado;
        puntuacion.nombre = this.authServ.nombreUserLoggeado;
        puntuacion.fechaCreacion = this.puntServ.formatearFecha(new Date());
        puntuacion.puntos = this.puntos;

        this.puntServ.crearPuntuacion(puntuacion);

        this.armarPuntuacion();
        this.mostrarMiAlert("Juego terminado. \nLograste un puntaje de: "+ this.puntos,"success");
        this.reiniciarJuego();
      }
    }
    
    this.cargoPregunta = false;
    setTimeout(() => {
      this.elegirPregunta();
      
    }, 500);


  }

  reiniciarJuego(){
    this.vidas=3;
    this.puntos=0;
    this.preguntasUsadas = Array();
  }


  mostrarMiToast(text:any, type:any){
    this.miToast.fire({icon: type,
    title: text});
  }

  mostrarMiAlert(text:any, type:any){
    this.miAlert.fire({icon: type,
    title: text});
  }

  miAlert = Swal.mixin({
    position: 'center',
  })

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

      // for (let index = 0; index < this.rankingOrdenado.length; index++) {
      //   const element = this.rankingOrdenado[index];

      //   let fila = new PuntuacionPreguntados();
      //   fila.puntos = element.puntos;
      //   fila.nombre = element.nombre;

      //   this.filas.push(fila);

      // }
      
    }, 2000);

  }

}
