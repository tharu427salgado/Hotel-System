
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BookingRes } from '../models/Respones.model';
import { MatSort } from '@angular/material/sort';
import { NetworkUserService } from '../services/network-user.service';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css']
})
export class AdminBookingComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  displayedColumns: string[] = ['id', 'name', 'idcard', 'phonenum', 'email', 'roomNum', 'date', 'admin_check'];
  dataSource = new MatTableDataSource<BookingRes>();
  textSearch: any;
  checklist: number[] = []
  indexarray: number = 0
  add: boolean = true

  constructor(private networkUserservic: NetworkUserService) { }


  ngOnInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.feedata();
  }

  feedata() {
    this.networkUserservic.getBooking().subscribe(
      data => {
        this.dataSource.data = data
      }, error => {

      }
    )
  }

  search(event: Event) {
    let fliterValue = '';
    if (event) {
      fliterValue = (event.target as HTMLInputElement).value;
    }
    console.log(typeof fliterValue);
    this.dataSource.filter = fliterValue.trim().toLowerCase();
  }

  clearSearch() {
    this.textSearch = '';
    this.search(null!);
  }

  oncheck(id: number) {
    this.checklist.forEach((Ifchecklist) => {
      if (Ifchecklist === id) {
        this.checklist.splice(this.indexarray, 1)
        console.log(this.indexarray);
        this.add = false
      }
      else {
        this.indexarray++
      }
    })
    if (this.add == true) {
      this.checklist.push(id)
      this.indexarray = 0
    }
    else {
      this.indexarray = 0
    }
  }

  onclickSubmitcheck() {
    if (this.checklist.length !== 0) {
      this.networkUserservic.putbookingcheck(this.checklist).subscribe(
        data => {
          if (data.status == 'success') {
            alert(data.data)
            window.location.href = '/admin-booking'
          }
          else {
            alert(`Error 404`)
          }
        })
    }
    else {
      alert(`กรุณา Checklist ก่อน`)
    }
  }
}




