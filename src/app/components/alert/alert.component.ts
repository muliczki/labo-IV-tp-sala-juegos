import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() color!: string;
  @Input() mensaje!: string;
  vista = true;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.vista = false;
  }

}
