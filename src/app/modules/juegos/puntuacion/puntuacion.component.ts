import { Component, OnInit } from '@angular/core';
import { AhRankingServService } from '../ahorcado/ah-ranking-serv.service';
import { PuntuacionAhorcado } from 'src/app/classes/puntuacion-ahorcado';
import { PuntuacionAcumulada } from '../ahorcado/clases/puntuacion-acumulada';
import { Usuario } from 'src/app/classes/usuario';
import { UserService } from 'src/app/services/user.service';
import { PregRankingService } from '../preguntados/service/preg-ranking.service';
import { PuntuacionPreguntados } from '../preguntados/preguntados.component';
import { MmRankingServService } from '../mayormenor/mm-ranking-serv.service';
import { PuntuacionWordle } from '../wordle/wordle.component';
import { WordleRankingService } from '../wordle/service/wordle-ranking.service';


@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.css']
})
export class PuntuacionComponent implements OnInit {

  public listaUsuarios:Usuario[] = [];

  puntuacionesAhorcado:PuntuacionAhorcado[] = [];
  puntuacionesAcumuladasAhorcado:PuntuacionAcumulada[] = [];
  
  puntuacionesPreguntados:PuntuacionPreguntados[] = [];

  puntuacionesMayorMenor:PuntuacionPreguntados[] = [];

  puntuacionesWordle:PuntuacionWordle[] = [];
  puntuacionesAcumuladasWordle:PuntuacionAcumulada[] = [];

  mostrar=false;
  mostrar2=false;
  juego='';
  color='';
  listado :any[] = [];

  constructor(private puntAhorcadoServ:AhRankingServService, private userServ:UserService, private puntPreguntadosServ:PregRankingService, private puntMayMenServ:MmRankingServService, private puntWordleServ:WordleRankingService) { 

    this.userServ.obtenerUsuarios().subscribe(
      usuarios => this.listaUsuarios = usuarios
    );


    this.puntAhorcadoServ.obtenerPuntuaciones().subscribe(
      puntajes => this.puntuacionesAhorcado = puntajes
    );

    this.puntPreguntadosServ.obtenerPuntuaciones().subscribe(
      puntajes => this.puntuacionesPreguntados = puntajes
      );
      
      this.puntMayMenServ.obtenerPuntuaciones().subscribe(
        puntajes => this.puntuacionesMayorMenor = puntajes
        );
        
        this.puntWordleServ.obtenerPuntuaciones().subscribe(
          puntajes => this.puntuacionesWordle = puntajes
          );
          
          
          
          setTimeout(() => {
            this.armarPuntuacion(this.puntuacionesAhorcado,this.puntuacionesAcumuladasAhorcado);
            this.armarPuntuacion(this.puntuacionesWordle,this.puntuacionesAcumuladasWordle);
            this.ordenarPuntuacionPuntos(this.puntuacionesPreguntados);
            this.ordenarPuntuacionPuntos(this.puntuacionesMayorMenor);
            
          }, 2000);
          
          
          
        }



  ngOnInit(): void {
  }


  armarPuntuacion(puntuaciones:any[], puntuacionesAcumuladas:any[]){
    // puntuacionesAcumuladas = [];

    this.listaUsuarios.forEach(element => {
      // console.log(element.email);
      let puntuacion = new PuntuacionAcumulada();
      puntuacion.email = element.email;
      puntuacion.nombre = element.nombre;
      puntuacionesAcumuladas.push(puntuacion);
    });
    
    puntuaciones.forEach(punto => {
      puntuacionesAcumuladas.forEach(element => {
        if(punto.email == element.email){
          if(punto.partidaGanada){
            element.ganadas ++;
          }else{
            element.perdidas ++;
          }
        }
      });
    });

    console.log(puntuacionesAcumuladas);
    this.ordenarPuntuacion(puntuacionesAcumuladas);
  }


  
  ordenarPuntuacion(puntuacionAcumulada:any[]){
    puntuacionAcumulada.sort(function (a, b) {
      if (a.ganadas < b.ganadas) {
        return 1;
      }
      if (a.ganadas > b.ganadas) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    console.log(puntuacionAcumulada)
    console.log(this.puntuacionesAcumuladasAhorcado)

  }


  ordenarPuntuacionPuntos(puntuacionAcumulada:any[]){
    puntuacionAcumulada.sort(function (a, b) {
      if (a.puntos < b.puntos) {
        return 1;
      }
      if (a.puntos > b.puntos) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

  }

  verListado(juego:string){

    switch(juego){
      case 'preguntados':
        this.listado = this.puntuacionesPreguntados;
        console.log(this.listado);
        this.juego='PREGUNTADOS';
        this.color='#c2d136';
        this.mostrar2=false;
        this.mostrar=true;
        break;
        
      case 'mayormenor':
        this.listado = this.puntuacionesMayorMenor;
        console.log(this.listado);
        this.juego='MAYOR O MENOR';
        this.color='#d13e36';
        this.mostrar2=false;
        this.mostrar=true;
        break;
      
      case 'ahorcado':
        // this.puntuacionesAcumuladasAhorcado.forEach(element => {
        //   console.log(element.email)
        //   console.log(element.ganadas)
        // });
        this.listado = this.puntuacionesAcumuladasAhorcado;
        console.log(this.listado);
        this.juego='AHORCADO';
        this.color= '#2c72a4';
        this.mostrar=false;
        this.mostrar2=true;
        break;  

      case 'wordle':
        this.listado = this.puntuacionesAcumuladasWordle;
        console.log(this.listado);
        this.juego='WORDLE';
        this.color= '#25ab47';
        this.mostrar=false;
        this.mostrar2=true;
        break;  

    }

  }
}
