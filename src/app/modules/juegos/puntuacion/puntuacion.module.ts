import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuntuacionRoutingModule } from './puntuacion-routing.module';
import { PuntuacionComponent } from './puntuacion.component';


@NgModule({
  declarations: [
    PuntuacionComponent
  ],
  imports: [
    CommonModule,
    PuntuacionRoutingModule
  ]
})
export class PuntuacionModule { }
