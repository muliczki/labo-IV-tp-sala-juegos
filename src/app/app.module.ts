import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { LoginComponent } from './components/login/login.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MayormenorComponent } from './modules/mayormenor/mayormenor.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { WordleComponent } from './modules/wordle/wordle.component';



@NgModule({
  declarations: [
    AppComponent,
    QuiensoyComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    AlertComponent,
    NavbarComponent,
    MayormenorComponent,
    TablaComponent,
    WordleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, 
    AngularFireDatabaseModule, 
    AngularFirestoreModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
