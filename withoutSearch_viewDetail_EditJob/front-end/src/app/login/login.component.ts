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
  radiovalue!: any;
  name!: string;
  email!: string;
  lastname!: string;
  firstname!: string
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
    item.firstName = this.firstname;
    item.lastName = this.lastname;
    item.username = this.username;
    item.email = this.email;
    item.password = this.pass;
    item.role = this.radiovalue

    return item
  }
  login() {

    this.userService
      .login(this.username, this.password)
      .then((obj: any) => {
        if (obj.status === 'success') {
          localStorage.setItem("roles", JSON.stringify(obj));
          this.userService.checklogin$.next(true)
          if (obj.role === 'JobSeeker') {
            this.router.navigate(['home']);
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

    setTimeout(() => {

      this.userService.findLoggedUser()
        .then((user) => {
          if (user !== null) {
            if (user.firstName === undefined) {
            }
            localStorage.setItem("user", JSON.stringify(user));
            this.userService.checklogin$.next(true)
          } else {
            console.log('User: null');
          }
        });

    }, 200);
  }

  register() {
    if (this.radiovalue) {


      let item = this.ItemAccount();
      this.userService.createUser(item).then(res => {
        if (res.status == true) {
          alert("success");
          this.password = item.password
          this.toggleInactiveState();
        }
        else {
          alert("username is inval");
        }
      })
    }
    else {
      alert("Please choose roles");
    }
  }
  radioChange() {
    // console.log("ffff", this.radiovalue)
  }
}






