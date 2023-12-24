import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcountModel } from './acount.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name!: string;
  email!: string;
  username!: string;
  password!: string;
  pass!: string;
  badUserNamePass: boolean;
  verificationPending: boolean;
  constructor(private router: Router, private userService: UserService) {
    this.badUserNamePass = false;
    this.verificationPending = false;
  }
  @ViewChild('container') container: ElementRef | undefined;

  toggleActiveState() {
    if (this.container) {
      this.container.nativeElement.classList.add('active');
    }
  }

  toggleInactiveState() {
    if (this.container) {
      this.container.nativeElement.classList.remove('active');
    }
  }

  BackHome() {
    this.router.navigate(['']);
  }

  ItemAccount(): AcountModel {

    const item = new AcountModel();
    item.name = this.name;
    item.username = this.username;
    item.pass = this.password;

    return item
  }
  login() {

    this.userService
      .login(this.username, this.password)
      .then((obj: any) => {
        console.log("objobjobj", obj)
        if (obj.status === 'success') {
          if (obj.role === 'JobSeeker') {
            this.router.navigate(['profile-seeker']);
          } else if (obj.role === 'Admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['profile-recruiter']);
          }
          // if (user.username === 'admin') {
          //   this.router.navigate(['admin']);
          // } else if (user.username === 'faculty') {
          //   this.router.navigate(['faculty']);
          // } else {
          //   this.router.navigate(['profile']);
          // }
        } else if (obj.status === 'user does not exists') {
          this.badUserNamePass = true;
          this.verificationPending = false;
        } else {
          this.badUserNamePass = false;
          this.verificationPending = true;
        }
      });
  }

}






