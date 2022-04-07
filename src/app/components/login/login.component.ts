import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async login (user: string, pass: string){
    try{
      await this.auth.login(user, pass);
      // this.router.navigateByUrl('/home');
      var modelo = this;

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

}
