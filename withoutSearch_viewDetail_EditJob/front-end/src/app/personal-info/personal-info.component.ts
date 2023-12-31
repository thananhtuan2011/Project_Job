import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

interface SocialContact {
  socialtype: string;
  url: string;
}

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  user: any;
  updateId = '';
  username = '';
  password = '';
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  facebook = '';
  linkedin = '';
  github = '';
  twitter = '';
  socialContact: SocialContact[] = [];
  editMode = false;
  Infor: any;
  constructor(private userService: UserService, private dialog: MatDialog,) { this.user = JSON.parse(localStorage.getItem("user")!); }

  edit() {
    this.editMode = true;
  }

  cancel() {
    this.editMode = false;
  }

  update() {
    const social: SocialContact[] = [
      { 'socialtype': 'github', 'url': this.github },
      { 'socialtype': 'linkedin', 'url': this.linkedin },
      { 'socialtype': 'facebook', 'url': this.facebook },
      { 'socialtype': 'twitter', 'url': this.twitter }
    ];

    const updateduser = {
      'username': this.username,
      // 'password': this.password,
      'firstName': this.firstName,
      'lastName': this.lastName,
      'email': this.email,
      'phone': this.phone,
      'socialContact': social
    };

    this.editMode = false;
    this.userService.updateUserProfile(updateduser)
      .then((updatedUser) => {
        console.log('Update success');
      });
  }

  checkHidden(url: string): boolean {
    return url === '';
  }
  InforUser() {
    this.userService.getIforUser(this.user._id).subscribe(res => {
      console.log("ccc", res)
      this.Infor = res
    })
  }
  Update() {

    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: "800px",
      data: this.Infor,
      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      this.InforUser();
    })

  }
  ngOnInit() {
    this.InforUser();
    // this.userService.findLoggedUser()
    //   .then((user) => {
    //     this.user = user;
    //     if (user !== null) {
    //       if (user.firstName === undefined) {
    //         this.editMode = true;
    //       }
    //       this.updateId = user._id;
    //       this.username = user.username;
    //       this.password = user.password;
    //       this.firstName = user.firstName;
    //       this.lastName = user.lastName;
    //       this.email = user.email;
    //       this.phone = user.phone;
    //       if (user.socialContact.length !== 0) {
    //         this.socialContact = user.socialContact;
    //         this.facebook = this.socialContact.find((s: SocialContact) => s.socialtype === 'facebook')?.url || '';
    //         this.github = this.socialContact.find((s: SocialContact) => s.socialtype === 'github')?.url || '';
    //         this.linkedin = this.socialContact.find((s: SocialContact) => s.socialtype === 'linkedin')?.url || '';
    //         this.twitter = this.socialContact.find((s: SocialContact) => s.socialtype === 'twitter')?.url || '';
    //       }
    //       console.log(this.user);
    //     } else {
    //       console.log('User: null');
    //     }
    //   });
  }
}
