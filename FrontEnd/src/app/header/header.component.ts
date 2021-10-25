import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Iflog: boolean = false;
  admin: boolean
  @Input("medie_query") mobileQueryMax: any;
  @Output("toggle") navtoggle = new EventEmitter();

  constructor() {
    console.log(this.mobileQueryMax);
  }

  ngOnInit(): void {
    const stats = JSON.parse(localStorage.getItem('_u') || '{}')
    if (stats.admin === 'admin' || stats.admin === 'useser') {
      console.log(stats);
      this.Iflog = true
      if (stats.admin === 'admin') {

        this.admin = true
      }
    }
    else {
      this.Iflog = false
    }

  }

  onClickNavToggle() {
    this.navtoggle.emit();
  }

  clickLogout() {
    localStorage.clear()
    this.Iflog = false
    window.location.href = ''
  }
}
