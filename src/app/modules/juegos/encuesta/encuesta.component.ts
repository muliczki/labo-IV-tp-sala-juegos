import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogUsuario } from 'src/app/classes/log-usuario';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface Encuesta {
  nombre:string;
  apellido:string;
  edad:number;
  tel:number;
}

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {


public encuesta = {} as Encuesta;
public logUser = new LogUsuario();
public listaUsuarios:Usuario[] = [];
public error = false;
public mensaje = "";
public nombreDisponible = true;
public chequeoPass = "";

formulario:FormGroup;

constructor(private auth:AuthService, private router:Router, private userServ:UserService,  private fb:FormBuilder) {
  this.userServ.obtenerUsuarios().subscribe(
    usuarios => this.listaUsuarios = usuarios
  );

  this.formulario = fb.group({
    nombre: ["", [Validators.required, Validators.minLength(3)]],
    apellido: ["", [Validators.required, Validators.minLength(3)]],
    edad: ["", [Validators.required, Validators.max(99), Validators.min(18)]],
    tel: ["", [Validators.required, Validators.max(9999999999), Validators.min(10000)]],
    
  })

 }

ngOnInit(): void {
}



//creo registro en modulo AUTH - 1° esto, valido el mail correcto
// async registrar (){
//   try{
//     await this.comprobarNombreUsuario(this.user.nombre);

//     if(this.nombreDisponible){
//       await this.auth.registrar(this.user.email, this.user.pass);
//       this.logUser.email = this.user.email;
//       this.logUser.fechaAcceso = this.userServ.formatearFecha(new Date());

//       this.userServ.crearLogUsuario(this.logUser);
//       await this.crearUsuario();
//       this.router.navigateByUrl('home');

//     }

    
    
//   }catch(e: any){
//     Swal.fire("El mail ya está asociado a un usuario");

//   }
// }

// creo registro en BBDD firestore
// public async crearUsuario() {
//   // this.submitFormulario.emit(this.actor);
//   // this.user.id = this.randomInteger(1,1000000);

//   // console.log(this.producto.comestible);
//   this.user.id = this.listaUsuarios.length + 1;
//   this.user.fechaCreacion = this.userServ.formatearFecha(new Date());
//   this.user.nombre = this.user.nombre?.toLowerCase();
//   console.log(this.user);
//   await this.userServ.crearUsuario(this.user);
//   // .then(
//   this.user = new Usuario();
//   this.user.sexo="Sexo";
// }

enviarEncuesta(){
  this.mostrarMiAlert("Gracias por tu respuesta!","success");
}

mostrarMiAlert(text:any, type:any){
  this.miAlert.fire({icon: type,
  title: text});
}

miAlert = Swal.mixin({
  position: 'center',
})

randomInteger(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}  

mostraruser(){
  console.log(this.listaUsuarios.length);
}

comprobarNombreUsuario(nombre:any){

   this.listaUsuarios.forEach(element => {

    if(element.nombre!.toLowerCase()===nombre.toLowerCase()){
      Swal.fire("El nombre de usuario no está disponible");
      // throw Expression;
      this.nombreDisponible = false;
    }
  });

}

get errorControl() {
  return this.formulario.controls;
}


}
