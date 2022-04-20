import { Component, OnInit } from '@angular/core';
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
  constructor(private auth:AuthService, private router: Router, private userServ:UserService) { 
  }

  ngOnInit(): void {
  }

  async login (){
    try{
      await this.auth.login(this.user.email, this.user.pass);
      // this.router.navigateByUrl('/home');
      var modelo = this;

      this.logUser.email = this.user.email;
      this.logUser.fechaAcceso = Date();

      this.userServ.crearLogUsuario(this.logUser);

      setTimeout(function(){
        modelo.router.navigateByUrl('/home');
      }, 2000);
      
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

  accederRapido(){
    this.user.email = "tester@tester.com";
    this.user.pass = "123456";
  }

}
