import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  
  constructor(public ruta:Router, public auth:AuthService) {
    console.log(ruta.url);
  }  

  ngOnInit(): void {
  }

  salir(){
    this.auth.logout();
    this.auth.nombreUserLoggeado=undefined;
    this.auth.userLoggeado=undefined;
  }

}
