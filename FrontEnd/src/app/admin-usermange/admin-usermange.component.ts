import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserRes } from '../models/Respones.model';
import { NetworkUserService } from '../services/network-user.service';

@Component({
  selector: 'app-admin-usermange',
  templateUrl: './admin-usermange.component.html',
  styleUrls: ['./admin-usermange.component.css']
})
export class AdminUsermangeComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  displayedColumns: string[] = ['id', 'usename', 'usersurname', 'username', 'idcard', 'phonenum', 'email', 'action'];
  dataSource = new MatTableDataSource<UserRes>();
  textSearch: any

  constructor(private networkUserService: NetworkUserService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.feedata()
  }

  feedata() {
    this.networkUserService.getUseser().subscribe(
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
  onClickdelet(id: number) {
    this.networkUserService.deleteUser(id).subscribe(
      data => {
        if (data.status == 'success') {
          alert(data.data)
          window.location.href = '/admin-usermanage'
        }
      }
    )
  }
}