import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordleComponent } from './wordle.component';

const routes: Routes = [
  {path: '', component: WordleComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordleRoutingModule { }
