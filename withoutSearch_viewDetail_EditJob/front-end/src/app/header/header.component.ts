import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: any
  roles: any
  constructor(private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem("user")!);
    this.roles = JSON.parse(localStorage.getItem("roles")!);
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    this.user = undefined
    this.roles = undefined
  }
  ngOnInit(): void {

    this.userService.checklogin$.subscribe(res => {
      console.log("check", res)
      if (res == true) {
        this.user = JSON.parse(localStorage.getItem("user")!);
        this.roles = JSON.parse(localStorage.getItem("roles")!);
      }
    })
  }


}
