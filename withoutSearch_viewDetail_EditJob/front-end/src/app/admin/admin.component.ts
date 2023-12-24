import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  users: any = [];
  currentAdmin: User | null = null;
  allJobSeekers: any = [];
  allUsers: any = [];
  username: string = "";
  password: string = "";
  admins: any = [];
  usernameExists = false;

  ngOnInit() {
    this.fetchPendingUser();
  }

  fetchPendingUser() {
    this.userService.findPendingRecruiters().then(
      (user: any) => {
        this.users = user;
        this.findAllUsers();
      },
      (error: any) => {
        console.error('Error fetching pending recruiters:', error);
      }
    );
  }

  findAllUsers() {
    this.userService.findAllUsers().then(
      (users: any) => {
        this.allUsers = users;
        this.allJobSeekers = users.filter((user: any) => user.role === 'JobSeeker' && user.premiumRequestStatus);
        this.admins = this.allUsers.filter((user: any) => user.role === 'Admin');
      },
      (error: any) => {
        console.error('Error fetching all users:', error);
      }
    );

    // this.userService.findLoggedUser().then(
    //   (user: any) => {
    //     this.currentAdmin = user;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching logged user:', error);
    //   }
    // );
  }

  approveUser(id: any) {
    this.userService.approveRecruiter(id).then(() => this.fetchPendingUser());
  }

  rejectUser(id: any) {
    this.userService.rejectRecruiter(id).then(() => this.fetchPendingUser());
  }

  grantPremiumAccess(id: any) {
    this.userService.grantPremiumAccess(id).then(() => this.findAllUsers());
  }

  revokePremiumAccess(id: any) {
    this.userService.revokePremiumAccess(id).then(() => this.findAllUsers());
  }

  // deleteAdmin(id: any) {
  //   this.userService.deleteUser(id).then(() => this.findAllUsers());
  // }

  // deleteAdmin(userId: any) {
  //   const confirmDelete = window.confirm('Are you sure you want to delete this admin?');

  //   if (confirmDelete) {
  //     this.userService.deleteUser(userId)
  //       .then(() => {
  //         console.log('Admin deleted successfully.');
  //         this.findAllUsers(); // Reload the admin list after deletion
  //       })
  //       .catch((err: any) => {
  //         console.error('Error deleting admin:', err);
  //       });
  //   }
  // }

  deleteAdmin(id: any) {
    this.userService.deleteUser(id).then(() => this.findAllUsers());
  }

  createAdmin(username: any, password: any) {

    const role = 'Admin';
    // this.userService.createUser({username, password, role}).then((res) => {
    //   if (res.status === true) {
    //     this.findAllUsers();
    //     this.usernameExists = false;
    //   } else {
    //     this.usernameExists = true;
    //   }
    // });
  }
}
