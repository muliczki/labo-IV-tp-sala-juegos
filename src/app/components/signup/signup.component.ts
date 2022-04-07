import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  async registrar (user: string, pass: string){
    try{
      await this.auth.registrar(user, pass);
      this.router.navigateByUrl('/');
    }catch(e: any){
      alert(e.message);
    }
  }

}
