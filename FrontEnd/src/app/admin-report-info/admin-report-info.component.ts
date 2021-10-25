import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkUserService } from '../services/network-user.service';


@Component({
  selector: 'app-admin-report-info',
  templateUrl: './admin-report-info.component.html',
  styleUrls: ['./admin-report-info.component.css']
})
export class AdminReportInfoComponent implements OnInit {

  @ViewChild('reportForm', { static: true }) reportForm: NgForm


  constructor(private activatedRoute: ActivatedRoute,
    private networkUserService: NetworkUserService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.feedData(params.id)
      }
    )
  }

  feedData(id: number) {
    this.networkUserService.getReports(id).subscribe(
      data => {
        var { id, roomnum, name, phonenum, requre, title, theproblems, admin_check } = { ...data[0] }
        this.reportForm.setValue({ id, roomnum, name, phonenum, requre, title, theproblems, admin_check });
      },
      error => {
        this.router.navigate(["/admin-report"])
        alert(`error`)
      }
    )

  }

}
