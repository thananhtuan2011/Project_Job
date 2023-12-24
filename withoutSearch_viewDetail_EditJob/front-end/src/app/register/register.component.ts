import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = " ";
  password: string= " ";
  verifyPassword: string= " ";
  usernameExists: boolean;
  role = ' ';
  successMsg: boolean;
  email: string= " ";

  constructor(private router: Router,
              private service: UserService,
              private http: HttpClient) {
    this.usernameExists = false;
    this.successMsg = false;
  }

//test
register() {
  let user;
  if (this.role === 'Recruiter') {
    user = {
      "username" : this.username,
      "password" : this.password,
      "role" : this.role,
      "email" : this.email,
    };
  } else {
    user = {
      "username" : this.username,
      "password" : this.password,
      "role" : this.role,
    };
  }

  this.http.post("http://localhost:5500/api/register", user).subscribe((resultData: any) => {
    console.log(resultData);
    alert("User Registered Successfully");
  });
}
  ngOnInit() {
  }


}
