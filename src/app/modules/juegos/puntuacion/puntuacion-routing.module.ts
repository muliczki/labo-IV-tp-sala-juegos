import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuntuacionComponent } from './puntuacion.component';

const routes: Routes = [
  {path: '', component: PuntuacionComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuntuacionRoutingModule { }
