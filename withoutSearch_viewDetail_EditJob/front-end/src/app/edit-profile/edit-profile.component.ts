import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { LayoutUtilsService, MessageType } from '../layout-utils.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  firstName!: string;
  email!: string;
  address!: string;
  lastName!: string;


  user: any
  constructor(private layoutUtilsService: LayoutUtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private _user: UserService,
    private dialogRef: MatDialogRef<EditProfileComponent>,

  ) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  Submit() {
    let item = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,

    }
    this._user.updateaccount(this.user._id, item).subscribe(res => {

      this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 3000, true, false, 3000, 'top', 1);
    })
  }
  ngOnInit(): void {
    this.firstName = this.data.firstName
    this.lastName = this.data.lastName
    this.email = this.data.email
  }
}
