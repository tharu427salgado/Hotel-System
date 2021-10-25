import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CheckoutRes } from '../models/Respones.model';
import { NetworkUserService } from '../services/network-user.service';

@Component({
  selector: 'app-admin-checkout',
  templateUrl: './admin-checkout.component.html',
  styleUrls: ['./admin-checkout.component.css']
})


export class AdminCheckoutComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  displayedColumns: string[] = ['id', 'name', 'phonenum', 'roomnum', 'date', 'admin_check'];
  dataSource = new MatTableDataSource<CheckoutRes>();
  textSearch: any
  checklist: number[] = []
  indexarray: number = 0
  add: boolean = true

  constructor(private networkUserService: NetworkUserService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.feedata();
  }

  feedata() {
    this.networkUserService.getCheckout().subscribe(
      data => {
        this.dataSource.data = data
      }, error => {
        alert(`ERROR`)
      }
    )
  }

  search(event: Event) {
    let fliterValue = '';
    if (event) {
      fliterValue = (event.target as HTMLInputElement).value;
    }
    // console.log(typeof fliterValue);
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
      this.networkUserService.putcheckoutcheck(this.checklist).subscribe(
        data => {
          if (data.status == 'success') {
            alert(data.data)
            window.location.href = '/admin-checkout'
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




