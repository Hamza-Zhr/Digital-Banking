import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  public username: any;
  constructor(public authService:AuthService, private router :Router) {
  }

  ngOnInit() {
    //this.username=this.authService.username;
  }

  handleLogout() {
    this.authService.logout();
  }
}
