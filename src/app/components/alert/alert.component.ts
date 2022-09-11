import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import swal from'sweetalert2';

// https://jasonwatmore.com/post/2019/07/05/angular-8-alert-toaster-notifications


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
// https://sweetalert2.github.io/
export class AlertComponent implements OnInit {

  @Input() color!: string;
  @Input() mensaje!: string;
  @Input() vista!: boolean;


  constructor() { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.vista=false
      ,5000
    })
  }




}
