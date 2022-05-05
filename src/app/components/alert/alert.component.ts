import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import swal from'sweetalert2';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
// https://sweetalert2.github.io/
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

  alertPosicion(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      width: '300px',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
