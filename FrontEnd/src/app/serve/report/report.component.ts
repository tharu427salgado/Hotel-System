import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Report } from 'src/app/models/Reports.model';
import { NetworkUserService } from 'src/app/services/network-user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {




  constructor(private networtUserservice: NetworkUserService) { }

  valueName: string
  valueRoomnum: string = '204'
  valuePhone: number

  ngOnInit(): void {

    const stats = JSON.parse(localStorage.getItem('_u') || '{}')
    this.valueName = stats.usename
    this.valuePhone = stats.phonenum
    console.log(this.valueRoomnum);
  }

  onSubmit(reportForm: NgForm) {
    if (reportForm.invalid) {
      //return console.log(`Error`);
      ;
    }

    const values = reportForm.value;
    let reports = new Report();
    reports.roomNum = values.roomNum;
    reports.name = values.name;
    reports.phoneNum = values.phoneNum;
    reports.theProblems = values.theProblems;
    reports.title = values.title;

    this.networtUserservice.postReport(reports).subscribe(
      data => {
        if (data.status == 'success') {
          alert(`Submit Report`)
        } else {
          alert(data.data)
        }
      }, erorr => {

      }

    )

  }

}