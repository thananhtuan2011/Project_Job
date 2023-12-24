import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: User = new User('', '', '', '', '', '', '', '', '', '', '', '', '', null);

  constructor(private userService: UserService, private router: Router) {
    this.router.events.subscribe(() => this.sessionCheck());
  }

  sessionCheck() {
    this.userService.findLoggedUser().then((user) => this.user = user);
  }

  logout() {
    this.userService.logout().then(() => this.router.navigate(['*']))
      .then(() => this.userService.findLoggedUser().then((user) => this.user = user));
  }

  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight;
    return tmp_height + 'px';
  }
}
