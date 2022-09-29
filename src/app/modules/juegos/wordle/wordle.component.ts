import { Component, OnInit } from '@angular/core';

import { listaPalabras, palabrasEspanol } from 'src/app/services/apipalabras/apipalabras.service';
import Swal from 'sweetalert2';


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
    {key:'ENVIAR', class:''},
    {key:'Z', class:''},
    {key:'X', class:''},
    {key:'C', class:''},
    {key:'V', class:''},
    {key:'B', class:''},
    {key:'N', class:''},
    {key:'M', class:''},
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


  constructor() {
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
    console.log("Borrar presionado");
    
    this.boxes[this.rowIndex][this.currentRowIndex-1]={class:'', key:''};
    this.currentRowIndex--;
    
    console.log(this.currentRowIndex);
  }
  
  submitData(){
    let clonedCopyOfActualGuess = this.actualResult;
    //AUDIO

    console.log("Enviar presionado");
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

        if(this.actualResult===guessString){
          
          Swal.fire({title:"Ganaste la palabra era "+this.actualResult, showConfirmButton: false,
          timer: 3000,icon:'success'});
          
        }
        
        console.log({boxes:this.boxes})
        this.rowIndex++;
        this.currentRowIndex =0;

      }else{
        Swal.fire({text:"El texto ingresado no es una palabra válida", icon: 'error'});
      }
      
    }
    
    
  }

    

}

  



