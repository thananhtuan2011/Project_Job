// job-seeker-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveJobService } from '../services/save-job.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model.client';

@Component({
  selector: 'app-job-seeker-dashboard',
  templateUrl: './job-seeker-dashboard.component.html',
  styleUrls: ['./job-seeker-dashboard.component.css']
})
export class JobSeekerDashboardComponent implements OnInit {
  user!: User; // Uncomment this line
  keywordOrTitle!: string;
  location!: string;
  jobsSaved = 0;
  jobsApplied = 0;
  savedApplication: any[] = [];
  appliedApplication: any[] = [];
  allApplications: any[] = [];
  recruiters: User[] = [];
  states = ['Ho Chi Minh City',
    'Ha Noi',
    'Da Nang',
    'Hai Phong',
    'Can Tho',
    'Bien Hoa',
    'Nha Trang',
    'Hue',
    'Vung Tau',
    'Qui Nhon'];

  constructor(private router: Router, private jobApplicationService: SaveJobService, private userService: UserService) { }

  setVal(val: string) {
    this.location = val;
  }

  getInputVal() {
    return this.location;
  }

  getJobApplication() {
    this.jobsSaved = 0;
    this.jobsApplied = 0;
    this.savedApplication = [];
    this.appliedApplication = [];

    this.jobApplicationService.getAllJobApplicationForUser().then((application) => {
      if (application.status != null && application.status === 'session expired') {
        this.allApplications = [];
      } else {
        this.allApplications = application;
      }
    }).then(() => {
      console.log(this.allApplications);
      this.allApplications.forEach((jobApp: any) => {
        if (jobApp.jobSource === 'github') {
          jobApp['id'] = jobApp.gitHubJobId;
        } else {
          jobApp['id'] = jobApp.jobPosting;
        }

        jobApp.dateApplied = new Date(jobApp.dateApplied).toDateString();

        if (jobApp.status === 'save') {
          this.savedApplication.push(jobApp);
        } else {
          this.appliedApplication.push(jobApp);
        }
      });
    }).then(() => {
      this.jobsApplied = this.appliedApplication.length;
      this.jobsSaved = this.savedApplication.length;
    });
  }

  ngOnInit() {
    this.getJobApplication();
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    // this.userService.findLoggedUser().then((user: User) => {
    //   this.user = user ;
    // }).then(() => {
    //   this.userService.findAllUsers().then((users: User[]) => {
    //     this.recruiters = users.filter((user) =>
    //       user.role === 'Recruiter' && user.requestStatus === 'Verified'
    //     );
    //   });
    // });
  }

  saveJobId(job: any) {
    let jobApplication;
    console.log(job.jobSource);
    if (job.jobSource === 'github') {
      jobApplication = {
        dateApplied: new Date(), status: 'save', jobSource: job.jobSource, gitHubJobId: job.id,
        location: job.location, title: job.title, company: job.company
      };
    } else {
      jobApplication = {
        dateApplied: new Date(), status: 'save', jobSource: job.jobSource, jobPosting: job._id,
        location: job.location, title: job.title, company: job.company
      };
    }
    // this.jobApplicationService.createJobApplication(jobApplication).then(() => this.getJobApplication());
  }

  deleteJobId(job: any) {
    let id;
    if (job.jobSource === 'github') {
      id = job.id;
    } else {
      id = job._id;
      console.log(id);
      console.log(job.id);
      console.log(job.jobSource);
    }
    this.jobApplicationService.deleteJobApplicationByJobPosting(id, job.jobSource).then(() => this.getJobApplication());
  }

  applyJob(job: any) {
    let jobApplication: any;
    console.log(job.jobSource);
    if (job.jobSource === 'github') {
      jobApplication = {
        dateApplied: new Date(), status: 'applied', jobSource: job.jobSource, gitHubJobId: job.id,
        location: job.location, title: job.title, company: job.company
      };
    } else {
      jobApplication = {
        dateApplied: new Date(), status: 'applied', jobSource: job.jobSource, jobPosting: job._id,
        location: job.location, title: job.title, company: job.company
      };
    }

    let id;
    if (job.jobSource === 'github') {
      id = job.id;
    } else {
      id = job._id;
    }

    //   this.jobApplicationService.deleteJobApplicationByJobPosting(id, job.jobSource).then(() =>
    //     // this.jobApplicationService.createJobApplication(jobApplication).then(() => this.getJobApplication())
    //   // );
  }
}
