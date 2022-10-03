import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/classes/usuario';

import { listaPalabras, palabrasEspanol } from 'src/app/services/apipalabras/apipalabras.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { PuntuacionAcumulada } from '../ahorcado/clases/puntuacion-acumulada';
import { WordleRankingService } from './service/wordle-ranking.service';


export class PuntuacionWordle{

  public nombre?:string;
  public email?:string;
  public fechaCreacion?:string;
  public partidaGanada?:boolean;

}
@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})



export class WordleComponent implements OnInit {

  boxes =[
    [{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},],
    [{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},],
    [{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},],
    [{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},],
    [{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},],
    [{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},{class:'', key:''},]
  ]
  
  keyboard = [
    {key:'Q', class:''},
    {key:'W', class:''},
    {key:'E', class:''},
    {key:'R', class:''},
    {key:'T', class:''},
    {key:'Y', class:''},
    {key:'U', class:''},
    {key:'I', class:''},
    {key:'O', class:''},
    {key:'P', class:''},
    {key:'A', class:''},
    {key:'S', class:''},
    {key:'D', class:''},
    {key:'F', class:''},
    {key:'G', class:''},
    {key:'H', class:''},
    {key:'J', class:''},
    {key:'K', class:''},
    {key:'L', class:''},
    {key:'Ñ', class:''},
    {key:'Z', class:''},
    {key:'X', class:''},
    {key:'C', class:''},
    {key:'V', class:''},
    {key:'B', class:''},
    {key:'N', class:''},
    {key:'M', class:''},
    {key:'ENVIAR', class:''},
    {key:'BORRAR', class:''},

  ]

  listadoPalabras = listaPalabras //sin api
  palabrasEspanol = palabrasEspanol //sin api
  mostrarAlerta=false;

  actualResult='';
  rowIndex=0;
  currentRowIndex=0;
  colorVerde =false;
  colorRojo =false;
  colorGris =false;
  clase = "white";

  public puntuaciones:PuntuacionWordle[] = [];
  public rankingOrdenado:PuntuacionWordle[] = [];
  public puntuacionesAcumuladas:PuntuacionAcumulada[] = [];

  public listaUsuarios:Usuario[] = [];




  constructor(private puntServ:WordleRankingService, private authServ:AuthService, private userServ:UserService) {
    this.puntServ.obtenerPuntuaciones().subscribe(
      puntajes => this.puntuaciones = puntajes
    );

    this.userServ.obtenerUsuarios().subscribe(
      usuarios => this.listaUsuarios = usuarios
    );

    this.armarPuntuacion();
  }
  


  ngOnInit(): void {
    this.obtenerPalabra();
  }

  
  async obtenerPalabra(){

    //LE PEGO A LA API
    // this.apiPalabrasServ.ObtenerPalabraSustantivo().subscribe(
    //   palabra => this.palabra = palabra.body.Word
    // );
    
    do{
      //busco un indice teniendo como maximo el largo de mi array de palabras
      let indice = Math.floor(Math.random() * this.palabrasEspanol.length);
    
      //seteo en mayuscula la palabra
      this.actualResult = this.palabrasEspanol[indice].toUpperCase();
    
      // veo la palabra elegida
      console.log(this.actualResult);

      //repito el do while hasta que la palabra tenga 5 caracteres y entre en el tablero del wordle
    }  while(this.actualResult.length!=5)
    

    // this.palabra = this.palabra.keys();
    
  }

  handleChange(key:any){
    // console.log(key);
    
    // se presionó borrar

    if(key==="BORRAR"){
      if(this.currentRowIndex>0){
      this.clearKeyFromCurrentIndex();
      }
    }
    // se presionó enviar
    else if(key==="ENVIAR"){
      this.submitData()
   
    }
    // se presionó una letra
    else if(this.currentRowIndex<5&& this.rowIndex<6){
      this.boxes[this.rowIndex][this.currentRowIndex]={class:'', key:key};
      this.currentRowIndex++;
      
    }
  }
  
  
  clearKeyFromCurrentIndex(){
    // console.log("Borrar presionado");
    
    this.boxes[this.rowIndex][this.currentRowIndex-1]={class:'', key:''};
    this.currentRowIndex--;
    
    console.log(this.currentRowIndex);
  }
  
  submitData(){

    let nuevaPuntacion =new PuntuacionWordle();
    nuevaPuntacion.email = this.authServ.userLoggeado;
    nuevaPuntacion.nombre = this.authServ.nombreUserLoggeado;
    nuevaPuntacion.fechaCreacion = this.puntServ.formatearFecha(new Date());


    let clonedCopyOfActualGuess = this.actualResult;
    //AUDIO

    // console.log("Enviar presionado");
    if(this.currentRowIndex===5 && this.rowIndex<6){
      let guessString = this.boxes[this.rowIndex].map((item)=>{
        return item.key
        // ['A','U','D','I','O']
      }).join('')
      console.log(guessString);

      
      //defining colors
      if(this.listadoPalabras.includes(guessString.toLowerCase())){
        
        this.boxes[this.rowIndex].map((item,index)=>{
          if(item.key ===this.actualResult[index]){
            item.class = 'green';
            
            //cambiar el color del teclado
            let index=this.keyboard.findIndex(element => element.key===item.key);
            this.keyboard[index].class= item.class;
  
            clonedCopyOfActualGuess = clonedCopyOfActualGuess.replace(item.key,'');
          }
        })
        
        this.boxes[this.rowIndex].map((item,index)=>{
          if(clonedCopyOfActualGuess.includes(item.key)){
            item.class = 'yellow';
            
            //cambiar el color del teclado
            let index=this.keyboard.findIndex(element => element.key===item.key);
            this.keyboard[index].class= item.class;
          }
        })
        
        this.boxes[this.rowIndex].map((item)=>{
          if(item.class===''){
            item.class = 'grey';
            
            //cambiar el color del teclado
            let index=this.keyboard.findIndex(element => element.key===item.key);
            this.keyboard[index].class= item.class;
          }
        })
        
        console.log({boxes:this.boxes})
        this.rowIndex++;
        this.currentRowIndex =0;

        if(this.actualResult===guessString){
          
          Swal.fire({title:"Ganaste la palabra era "+this.actualResult, showConfirmButton: false,
          timer: 3000,icon:'success'});

          nuevaPuntacion.partidaGanada = true;
          this.puntServ.crearPuntuacion(nuevaPuntacion);
          this.armarPuntuacion();

          this.resetGame();
        }
        

      }else{
        this.miToast.fire({text:"El texto ingresado no es una palabra válida", icon: 'error'});
      }
      
    }else{
      
      this.miToast.fire({text:"Faltan ingresar letras para completar la palabra", icon: 'error'});
      
    }
    
    if(this.rowIndex===6 ){
      Swal.fire({title:"Perdiste la palabra era "+this.actualResult, showConfirmButton: false,
      timer: 3000,icon:'error'});
      
        nuevaPuntacion.partidaGanada = false;
        this.puntServ.crearPuntuacion(nuevaPuntacion);
        this.armarPuntuacion();
        
        this.resetGame();
    }
    
    
  }

  resetGame(){
    this.rowIndex=0;
    this.currentRowIndex=0;
    this.colorVerde =false;
    this.colorRojo =false;
    this.colorGris =false;
    this.clase = "white";

    this.keyboard.forEach(element => {
      element.class='';
    });

    this.boxes.forEach(element => {
      element.forEach(item => {
        item.class='';
        item.key='';
      });
    });

    this.obtenerPalabra()
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

  mostrarMiToast(text:any, type:any){
    this.miToast.fire({icon: type,
    title: text});
  }

}

    



  



