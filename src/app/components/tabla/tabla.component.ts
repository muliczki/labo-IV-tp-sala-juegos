import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() titulos: any;
  @Input() filas: any;

  objectKeys = Object.keys;


  constructor() {
  }


  ngOnInit(): void {
  }
}
