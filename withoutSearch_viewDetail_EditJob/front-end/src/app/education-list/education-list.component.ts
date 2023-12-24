import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { EducationService } from '../services/education.service';

interface Education {
  _id?: string; // Add "?" to make it optional
  institute: string;
  location: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  ongoingStatus: boolean;
  description: string;
  fieldOfStudy: string;
  degree: string;
}


@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.css']
})
export class EducationListComponent implements OnInit {
  addMode = false;
  editMode = false;
  startMonth = 'Month';
  startYear = 'Year';
  endMonth = 'Month';
  endYear = 'Year';
  defaultAddOnGoing = false;
  months: string[] = [
    'Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  years: string[] = [
    'Year',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023'
  ];

  user: any; // Change 'any' to the type you expect from your UserService
  institute: string = '';
  fieldOfStudy: string = '';
  degree: string = '';
  location: string = '';
  startDate: { month: string; year: string } = { month: 'Month', year: 'Year' };
  endDate: { month: string; year: string } = { month: 'Month', year: 'Year' };
  ongoingStatus: boolean = false; // Update this to a more specific type
  description: string = '';
  updateId: string = '';
  education: Education[] = [];

  constructor(private userService: UserService, private educationService: EducationService) {}

  ngOnInit() {
    this.userService.findLoggedUser()
      .then((user: any) => {
        this.user = user;
        if (user !== null) {
          this.educationService.findEducationByUserId()
            .then((educationArray: Education[]) => {
              console.log('educations array : ', educationArray);
              this.education = educationArray;
            });
        }
      });
  }

  edit(education: Education, updateId: string) {
    if (education.ongoingStatus === undefined) {
      this.ongoingStatus = false;
    } else {
      this.ongoingStatus = education.ongoingStatus;
    }
    this.startDate = education.startDate;
    this.endDate = education.endDate;
    this.institute = education.institute;
    this.location = education.location;
    this.description = education.description;
    this.degree = education.degree;
    this.fieldOfStudy = education.fieldOfStudy;
    this.updateId = updateId;
    this.editMode = true;
  }

  disableMonth(mm: string): boolean {
    return mm === 'Month';
  }

  disableYear(yy: string): boolean {
    return yy === 'Year';
  }

  checkAddStatus(status: boolean) {
    this.ongoingStatus = !status;
  }

  checkUpdateStatus() {
    this.ongoingStatus = !this.ongoingStatus;
  }

  getEditMode(updateId: string): boolean {
    return this.updateId === updateId && this.editMode === true;
  }

  check() {
    console.log(this.ongoingStatus);
  }

  add() {
    this.institute = '';
    this.location = '';
    this.startDate = { month: 'Month', year: 'Year' };
    this.endDate = { month: 'Month', year: 'Year' };
    this.ongoingStatus = false;
    this.description = '';
    this.degree = '';
    this.fieldOfStudy = '';
    this.addMode = true;
  }

  create() {
    const newEducation: Education = {
      institute: this.institute,
      location: this.location,
      startDate: { month: this.startMonth, year: this.startYear },
      endDate: { month: this.endMonth, year: this.endYear },
      ongoingStatus: this.defaultAddOnGoing,
      description: this.description,
      fieldOfStudy: this.fieldOfStudy,
      degree: this.degree
    };

    this.educationService.createEducation(newEducation)
      .then((response) => {
        console.log('Add new education : ', response);
        this.educationService.findEducationByUserId()
          .then((educationArray: Education[]) => {
            console.log('educations array : ', educationArray);
            this.education = educationArray;
          });
      });

    this.addMode = false;
  }

  delete(id: string) {
    this.educationService.deleteEducation(id)
      .then((response) => {
        this.educationService.findEducationByUserId()
          .then((educationArray: Education[]) => {
            console.log('educations array : ', educationArray);
            this.education = educationArray;
          });
      });
  }

  update() {
    const updatedEducation: Education = {
      degree: this.degree,
      fieldOfStudy: this.fieldOfStudy,
      institute: this.institute,
      location: this.location,
      startDate: { month: this.startMonth, year: this.startYear },
      endDate: { month: this.endMonth, year: this.endYear },
      ongoingStatus: !this.ongoingStatus,
      description: this.description
    };

    this.editMode = false;
    this.educationService.updateEducation(this.updateId, updatedEducation)
      .then((response) => {
        console.log('Updated in DB : ', response);
        this.educationService.findEducationByUserId()
          .then((educationArray: Education[]) => {
            console.log('educations array : ', educationArray);
            this.education = educationArray;
          });
      });
  }

  cancelAdd() {
    this.addMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
