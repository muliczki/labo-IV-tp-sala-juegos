import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { TablaComponent } from 'src/app/components/tabla/tabla.component';
import { WordleComponent } from './wordle/wordle.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WordleComponent,
    PreguntadosComponent,
    EncuestaComponent,
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JuegosModule { }
