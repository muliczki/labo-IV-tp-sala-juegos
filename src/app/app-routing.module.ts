import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/guardauth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LoginComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'quiensoy', component: QuiensoyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', 
  canActivate: [AuthGuard],
  component: HomeComponent,
  },
  {path: 'signup', component: SignupComponent},
  {
    path:'juegos', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
  },
  {
    path:'**', redirectTo: 'login', pathMatch: 'full' 
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
