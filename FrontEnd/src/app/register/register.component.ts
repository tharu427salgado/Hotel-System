import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { register } from '../models/register.model';
import { NetworkUserService } from '../services/network-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  eye: boolean

  valuePassword = ''
  valueRepassword = ''

  constructor(private networkUserservice: NetworkUserService, private location: Location) { }

  ngOnInit(): void {
  }


  onSubmit(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }
    const values = registerForm.value;
    let Register = new register();
    Register.username = values.username;
    Register.password = values.password;
    Register.repassword = values.repassword;
    Register.Usename = values.Usename;
    Register.Usesurname = values.Usesurname;
    Register.phoneNum = values.phoneNum;
    Register.idcard = values.idcard;
    Register.address = values.address;
    Register.email = values.email;


    if (values.repassword == values.password && Register.phoneNum.toString().length === 9) {
      alert(JSON.stringify(Register))
      // this.networkUserservice.postRegister(Register).subscribe(
      //   data => {
      //     if (data.status == 'success') {
      //       alert(`ลงทะเบียนเสร็จสื้้น`)
      //       window.location.href = '/login'
      //     } else {
      //       alert(data.data)
      //     }
      //   },
      //   error => {
      //     alert(status)
      //   }
      // )
    } else if (Register.phoneNum.toString().length !== 9) {
      alert(`Phone Number Incorrect`)
    }
    else {
      alert(`The password is incorrect, try it.`)
      this.valuePassword = ''
      this.valueRepassword = ''
    }



  }
  onClick() {
    this.eye = !this.eye;
    console.log(this.eye);
  }
}

