import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/guardauth.guard';
import { EncuestaComponent } from './encuesta/encuesta.component';

const routes: Routes = [
  {
    path:'mayormenor',
    canActivate: [AuthGuard],
    loadChildren: () => import('./mayormenor/mayormenor.module').then(m => m.MayormenorModule)
  },
  {
    path:'puntuaciones',
    canActivate: [AuthGuard],
    loadChildren: () => import('./puntuacion/puntuacion.module').then(m => m.PuntuacionModule)
  },
  {
    path:'encuesta',
    canActivate: [AuthGuard],
    loadChildren: () => import('./encuesta/encuesta.module').then(m => m.EncuestaModule)
  },
  {
    path:'ahorcado',
    canActivate: [AuthGuard],
    loadChildren: () => import('./ahorcado/ahorcado.module').then(m => m.AhorcadoModule)
  },
  {
    path:'wordle',
    canActivate: [AuthGuard],
    loadChildren: () => import('./wordle/wordle.module').then(m => m.WordleModule)
  },
  {
    path:'chat',
    canActivate: [AuthGuard],
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path:'preguntados',
    canActivate: [AuthGuard],
    loadChildren: () => import('./preguntados/preguntados.module').then(m => m.PreguntadosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
