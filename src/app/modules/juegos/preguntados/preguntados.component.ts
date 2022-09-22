import { Component, OnInit } from '@angular/core';
import { ApiPreguntadosService, listaPersonajesHp } from './servicio/api-preguntados.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  personajes= listaPersonajesHp;
  listadoApi = [];
  personaje = {};
  
  constructor(private apiHp:ApiPreguntadosService) {
  }

  

  ngOnInit(): void {
    this.obtenerPersonajes();
    this.elegirPersonaje();
  }
  

  async obtenerPersonajes(){
    
    //LE PEGO A LA API
    await this.apiHp.ObtenerPersonajes().subscribe(
      listado => this.listadoApi = listado
    );
      
  }

  elegirPersonaje(){
    // chequeo != null

    let indice = Math.floor(Math.random() * this.personajes.length);
    console.log(indice);
    

    setTimeout(() => {
      
      if(this.listadoApi){
        
        // this.listadoApi.find(pers => pers.name===this.personajes[indice])
        
        this.personaje = this.listadoApi[indice]
        console.log(this.personaje);
      }
    }, 3000);
  }

}
