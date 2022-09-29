import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiPreguntadosService, preguntas } from './servicio/api-preguntados.service';

class Pregunta {

  pregunta:any;
  opcion1:any;
  opcion2:any;
  opcion3:any;
  correcta:any;

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
  
  constructor(private apiHp:ApiPreguntadosService) {
    this.miPregunta = new Pregunta();
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
}
