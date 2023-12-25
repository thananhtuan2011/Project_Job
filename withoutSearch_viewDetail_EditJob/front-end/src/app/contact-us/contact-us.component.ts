import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { LayoutUtilsService, MessageType } from '../layout-utils.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {
  fullname!: string;
  email!: string;
  address!: string;
  city!: string;


  namecty!: string;
  phonety!: string;
  addresscty!: string;

  constructor(private _cotnact: ContactService, private layoutUtilsService: LayoutUtilsService,) {

  }
  Submit() {
    let item = {
      fullname: this.fullname,
      email: this.email,
      address: this.address,
      city: this.city,
      namecty: this.namecty,
      phonecty: this.phonety,
      addresscty: this.addresscty


    }
    this._cotnact.CreateContact(item).subscribe(res => {
      this.fullname = "";
      this.address = ""
      this.addresscty = ""
      this.city = ""
      this.email = ""
      this.phonety = "";
      this.namecty = "",
        this.layoutUtilsService.showActionNotification("TSuccessfully submitted", MessageType.Delete, 3000, true, false, 3000, 'top', 1);
    })
  }
  ngOnInit(): void {

  }

}
