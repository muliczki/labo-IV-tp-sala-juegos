import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogUsuario } from 'src/app/classes/log-usuario';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logUser = new LogUsuario();
  user = new Usuario();
  public listaUsuarios:Usuario[] = [];

  formulario:FormGroup;

  constructor(private auth:AuthService, private router: Router, private userServ:UserService, private fb:FormBuilder) { 
    this.userServ.obtenerUsuarios().subscribe(
      usuarios => this.listaUsuarios = usuarios
    );

    this.formulario = fb.group({
      email: ["", [Validators.required, Validators.email]],
      pass: ["", [Validators.required, Validators.minLength(6)]]
      
    })

  }

  ngOnInit(): void {
  }

  async login (){
    try{
      await this.auth.login(this.user.email, this.user.pass);
      // this.router.navigateByUrl('/home');
      var modelo = this;


      //ESTO SIRVE PARA LA PUNTUACION
      this.auth.userLoggeado = this.user.email;
      this.obtenerNombreUser(this.user.email);

      console.log(this.auth.userLoggeado);

      this.logUser.email = this.user.email;
      this.logUser.fechaAcceso = this.userServ.formatearFecha(new Date());

      this.userServ.crearLogUsuario(this.logUser);

      modelo.router.navigateByUrl('/home');
      // setTimeout(function(){
      // }, 2000);
      
    }catch(e: any){
      alert(e.message);
    }
  }

  async logout (){
    try{
      await this.auth.logout();
    }catch(e: any){
      alert(e.message);
    }
  }


  obtenerNombreUser(email:any){
      
    this.listaUsuarios.forEach(element => {
      if(element.email==email){
        this.auth.nombreUserLoggeado = element.nombre;
      }
    });
  }

}
