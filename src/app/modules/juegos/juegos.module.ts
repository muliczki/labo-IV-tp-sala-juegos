import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { TablaComponent } from 'src/app/components/tabla/tabla.component';
import { WordleComponent } from './wordle/wordle.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

@NgModule({
  declarations: [
    WordleComponent,
    PreguntadosComponent,

    
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule, 
  ]
})
export class JuegosModule { }
