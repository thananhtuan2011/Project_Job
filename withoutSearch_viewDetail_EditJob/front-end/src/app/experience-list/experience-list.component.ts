import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ExperienceService } from '../services/experience.service';

interface Experience {
  _id?: string; // Make _id optional
  title: string;
  company: string;
  location: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  ongoingStatus: boolean;
  description: string;
}

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit {
  addMode = false;
  editMode = false;
  months: string[] = [
    'Month',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
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

  user: any; // Replace 'any' with the actual type of your user object
  experiences: Experience[] = [];
  title = '';
  company = '';
  location = '';
  startMonth = 'Month';
  startYear = 'Year';
  endMonth = 'Month';
  endYear = 'Year';
  ongoingStatus = false; // present working on this job
  defaultAddOnGoing = false;
  description = '';
  updateId = '';

  constructor(private userService: UserService, private experienceService: ExperienceService) {}

  edit(experience: Experience, updateId: string) {
    if (experience.ongoingStatus === undefined) {
      this.ongoingStatus = false;
    } else {
      this.ongoingStatus = experience.ongoingStatus;
    }
    this.title = experience.title;
    this.company = experience.company;
    this.location = experience.location;
    this.startMonth = experience.startDate.month;
    this.endMonth = experience.endDate.month;
    this.startYear = experience.startDate.year;
    this.endYear = experience.endDate.year;
    this.description = experience.description;
    this.updateId = updateId;
    this.editMode = true;
  }

  disableMonth(mm: string): boolean {
    return mm === 'Month';
  }

  disableYear(yy: string): boolean {
    return yy === 'Year';
  }

  getEditMode(updateId: string): boolean {
    return this.updateId === updateId && this.editMode === true;
  }

  checkAddStatus(status: boolean) {
    this.defaultAddOnGoing = !status;
  }

  checkUpdateStatus() {
    this.ongoingStatus = !this.ongoingStatus;
  }

  add() {
    this.title = '';
    this.company = '';
    this.location = '';
    this.startMonth = 'Month';
    this.startYear = 'Year';
    this.endMonth = 'Month';
    this.endYear = 'Year';
    this.defaultAddOnGoing = false;
    this.description = '';
    this.addMode = true;
  }

  create() {
    const newExperience: Experience = {
      title: this.title,
      company: this.company,
      location: this.location,
      startDate: { month: this.startMonth, year: this.startYear },
      endDate: { month: this.endMonth, year: this.endYear },
      ongoingStatus: this.defaultAddOnGoing,
      description: this.description
    };
  
    this.experienceService.createExperience(newExperience).then((response) => {
      this.experienceService.findExperienceByUserId().then((experiences) => {
        this.experiences = experiences;
      });
    });
  
    this.addMode = false;
  }

  delete(id: string) {
    this.experienceService.deleteExperience(id).then((response) => {
      this.experienceService.findExperienceByUserId().then((experiences) => {
        this.experiences = experiences;
      });
    });
  }

  update() {
    const updatedExperience: Experience = {
      _id: this.updateId, // Include _id for updating
      title: this.title,
      company: this.company,
      location: this.location,
      startDate: { month: this.startMonth, year: this.startYear },
      endDate: { month: this.endMonth, year: this.endYear },
      ongoingStatus: this.ongoingStatus,
      description: this.description
    };
  
    this.editMode = false;
    this.experienceService.updateExperience(this.updateId, updatedExperience).then((response) => {
      this.experienceService.findExperienceByUserId().then((experiences) => {
        this.experiences = experiences;
      });
    });
  }

  cancelAdd() {
    this.addMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }

  ngOnInit() {
    this.userService.findLoggedUser().then((user) => {
      this.user = user;
      if (user !== null) {
        this.experienceService.findExperienceByUserId().then((experiences) => {
          this.experiences = experiences;
        });
      }
    });
  }
}
