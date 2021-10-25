import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Booking } from '../models/booking.model';
import { NetworkUserService } from '../services/network-user.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private networkUserservice: NetworkUserService) { }

  valueName: string
  valueIDcard: string = '1234567890123'
  valuePhone: number
  valueEmial: string

  ngOnInit(): void {
    const stats = JSON.parse(localStorage.getItem('_u') || '{}')
    this.valueName = stats.usename
    this.valuePhone = stats.phonenum
    this.valueEmial = stats.email
    console.log();
  }

  onSubmit(reportForm: NgForm) {
    if (reportForm.invalid) {
      //return console.log(`Error`);
      ;
    }

    const values = reportForm.value;
    let booking = new Booking();
    booking.name = values.name;
    booking.idcard = values.idcard;
    booking.email = values.email;
    booking.phoneNum = values.phoneNum;
    booking.date = values.date;
    booking.roomNum = values.roomNum;

    if (booking.idcard.length === 13 && booking.phoneNum.toString().length === 9) {
      this.networkUserservice.postbooking(booking).subscribe(
        data => {
          console.log(data.status);
          if (data.status == 'success') {
            alert(data.data)
            window.location.href = '/'
          } else {
            alert(data.data)
          }
        },
        error => {
        })
    } else {
      alert(`Form incorrect`)
    }
  }
}