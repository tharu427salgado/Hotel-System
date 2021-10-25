import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { login } from '../models/login.model';
import { NetworkUserService } from '../services/network-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  _a: string;
  eye: boolean

  constructor(private networkUserservice: NetworkUserService) {

  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      //return console.log(`Error`);
      ;
    }

    const values = loginForm.value;
    let Login = new login();
    Login.username = values.username;
    Login.password = values.password;


    this.networkUserservice.postlogin(Login).subscribe(
      data => {
        console.log(data.status);
        if (data.status == 'success') {
          if (data.admin === null || data.admin === false) {
            this._a = 'useser'
          } else {
            this._a = 'admin'
          }
          const stats: object = {
            admin: this._a,
            email: data.email,
            phonenum: data.phoneNum,
            usename: data.usename
          }
          const keys = JSON.stringify(stats)
          localStorage.setItem('_u', keys.toString())
          alert(data.data)

          if (data.admin === true) {
            window.location.href = '/admin'
          }
          else {
            window.location.href = ''
          }

        } else {
          alert(data.data)
        }
      },
      error => {

      })
  }

  onClick() {
    this.eye = !this.eye
    console.log(this.eye);

  }

}

