import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = new Usuario();
  public listaUsuarios:Usuario[] = [];
  public error = false;
  public mensaje = "";
  constructor(private auth:AuthService, private router:Router, private userServ:UserService) {
    this.user.sexo="Sexo";
    this.userServ.obtenerUsuarios().subscribe(
      usuarios => this.listaUsuarios = usuarios
    );
   }

  ngOnInit(): void {
  }

  // creo registro en BBDD firestore
  public async crearUsuario() {
    // this.submitFormulario.emit(this.actor);
    // this.user.id = this.randomInteger(1,1000000);

    // console.log(this.producto.comestible);
    this.user.id = this.listaUsuarios.length + 1;
    console.log(this.user);
    await this.userServ.crearUsuario(this.user);
    // .then(
    this.user = new Usuario();
    this.user.sexo="Sexo";
  }

  //creo registro en modulo AUTH - 1° esto, valido el mail correcto
  async registrar (){
    try{
      await this.auth.registrar(this.user.email, this.user.pass);
      await this.crearUsuario();
      this.router.navigateByUrl('home');
    }catch(e: any){
      this.mensaje = "El email ya pertenece a un usuario";
      this.error = true;
    }
  }

  randomInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  

  mostraruser(){
    console.log(this.listaUsuarios.length);
  }
}
