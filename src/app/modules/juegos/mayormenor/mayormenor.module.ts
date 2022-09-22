import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayormenorRoutingModule } from './mayormenor-routing.module';
import { MayormenorComponent } from './mayormenor.component';
import { TablaComponent } from 'src/app/components/tabla/tabla.component';


@NgModule({
  declarations: [
    MayormenorComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    MayormenorRoutingModule
  ]
})
export class MayormenorModule { }
