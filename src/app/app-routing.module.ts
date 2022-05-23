import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'quiensoy', component: QuiensoyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {
    path:'ahorcado', loadChildren: () => import('./modules/ahorcado/ahorcado.module').then(m => m.AhorcadoModule)
  },
  {
    path:'mayormenor', loadChildren: () => import('./modules/mayormenor/mayormenor.module').then(m => m.MayormenorModule)
  },
  {
    path:'**', component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
