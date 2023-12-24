import { Component, OnInit } from '@angular/core';
import { JobPostingModelClient } from '../models/job-posting.model.client';
import { ActivatedRoute } from '@angular/router';
import { JobListingService } from '../services/job-listing.service';
import { JobPostingService } from '../services/job-posting.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  location: string = '';
  type: string = '';
  typeList: string[] = [];
  company: string = '';
  companyList: string[] = [];
  keywordOrTitle: string = '';
  filterCriteria: { [key: string]: any } = {};
  filterItems: { type: string; val: any }[] = [];
  states: string[] = [];
  jobs: JobPostingModelClient[] = [];

  constructor(
    private service: JobListingService,
    private route: ActivatedRoute,
    private jobPostService: JobPostingService
  ) {
    let location = ' ';
    this.route.params.subscribe(param => {
      location = param['location'];
    });

    let keyword = ' ';
    this.route.params.subscribe(param => {
      keyword = param['keyword'];
    });

    console.log(location);
    console.log(keyword);

    if (location !== ' ' || keyword !== ' ') {
      this.fetchFilteredJobs(location, keyword);
    } else {
      this.fetchAllJobs();
    }
  }

  setVal(location: string) {
    this.location = location;
    this.filterCriteria['location'] = location;
    this.filterItems = this.filterItems.filter((obj) => obj.type !== 'location');
    this.filterItems.push({ type: 'location', val: location });
    this.searchJob();
  }

  setCompany(company: string) {
    this.company = company;
    this.filterCriteria['company'] = company;
    this.filterItems = this.filterItems.filter((obj) => obj.type !== 'company');
    this.filterItems.push({ type: 'company', val: company });
    this.searchJob();
  }

  setJobType(type: string) {
    this.type = type;
    this.filterCriteria['type'] = type;
    this.filterItems = this.filterItems.filter((obj) => obj.type !== 'type');
    this.filterItems.push({ type: 'type', val: type });
    this.searchJob();
  }

  removeItems(item: any, i: number) {
    this.filterItems.splice(i, 1);
    delete this.filterCriteria[item.type];
    this.searchJob();
  }

  searchJob() {
    this.jobPostService.getAllJobPostings().then((jobs: JobPostingModelClient[]) =>
      this.jobs = jobs
    ).then(() => console.log(this.jobs)).then(() =>
      this.service.findAllJobs().then((jobs: any) => {
        jobs.forEach((job: JobPostingModelClient, index: number) => {
          const d = new Date(job.created_at);
          job.created_at = d.toDateString();
          job.jobSource = 'github';
        });
        this.jobs = this.jobs.concat(jobs);

        this.jobs.forEach((job) => {
          const d = new Date(job.datePosted);
          job.date = d.toDateString();
        });

        this.companyList = this.jobs.map(item => item.company)
          .filter((value, index, self) => self.indexOf(value) === index);
        this.typeList = this.jobs.map(item => item.type)
          .filter((value, index, self) => self.indexOf(value) === index);
        this.states = this.jobs.map(item => item.location)
          .filter((value, index, self) => self.indexOf(value) === index);
      }).then(() => {
        for (const filter in this.filterCriteria) {
          if (this.filterCriteria.hasOwnProperty(filter)) {
            console.log(this.filterCriteria[filter]);
            console.log(filter);
            this.jobs = this.jobs.filter((value) => (value as any)[filter] === this.filterCriteria[filter]);
            console.log(this.jobs);
          }
        }
      })
    );
  }

  // fetchAllJobs() {
  //   this.jobPostService.getAllJobPostings().then((jobs: JobPostingModelClient[]) =>
  //     this.jobs = jobs
  //   ).then(() => console.log(this.jobs)).then(() =>
  //     this.service.findAllJobs().then((jobs: any) => {
  //       jobs.forEach((job: JobPostingModelClient, index: number) => {
  //         const d = new Date(job.created_at);
  //         job.created_at = d.toDateString();
  //         job.jobSource = 'github';
  //       });

  //       this.jobs = this.jobs.concat(jobs);
  //       this.jobs.forEach((job) => {
  //         const d = new Date(job.datePosted);
  //         job.date = d.toDateString();
  //       });
  //       this.companyList = this.jobs.map(item => item.company)
  //         .filter((value, index, self) => self.indexOf(value) === index);
  //       this.typeList = this.jobs.map(item => item.type)
  //         .filter((value, index, self) => self.indexOf(value) === index);
  //       this.states = this.jobs.map(item => item.location)
  //         .filter((value, index, self) => self.indexOf(value) === index);
  //     })
  //   );
  // }

  fetchAllJobs() {
    this.jobPostService.getAllJobPostings().then((jobs: JobPostingModelClient[]) =>
      this.jobs = jobs
    ).then(() => console.log(this.jobs)).then(() =>
      this.service.findAllJobs().then((jobs: any) => {
        jobs.forEach((job: JobPostingModelClient, index: number) => {
          if (job.jobSource === 'github') {
            const d = new Date(job.created_at);
            job.created_at = d.toDateString();
          } else {
            const d = new Date(job.datePosted);
            job.date = d.toDateString();
          }
        });
        this.jobs = this.jobs.concat(jobs);
  
        this.companyList = this.jobs.map(item => item.company)
          .filter((value, index, self) => self.indexOf(value) === index);
        this.typeList = this.jobs.map(item => item.type)
          .filter((value, index, self) => self.indexOf(value) === index);
        this.states = this.jobs.map(item => item.location)
          .filter((value, index, self) => self.indexOf(value) === index);
      }).then(() => {
        for (const filter in this.filterCriteria) {
          if (this.filterCriteria.hasOwnProperty(filter)) {
            console.log(this.filterCriteria[filter]);
            console.log(filter);
            this.jobs = this.jobs.filter((value) => (value as any)[filter] === this.filterCriteria[filter]);
            console.log(this.jobs);
          }
        }
      })
    );
  }
  

  fetchFilteredJobs(location: string, keyword: string) {
    this.service.findFilteredJobs(location, keyword).then((jobs: JobPostingModelClient[]) => {
      this.jobs = jobs;
      this.jobs.forEach((job: JobPostingModelClient, index: number) => {
        const d = new Date(job.created_at);
        job.created_at = d.toDateString();
        job.jobSource = 'github';
      });
      this.companyList = this.jobs.map(item => item.company)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.typeList = this.jobs.map(item => item.type)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.states = this.jobs.map(item => item.location)
        .filter((value, index, self) => self.indexOf(value) === index);
    });
  }

  ngOnInit() {
  }
}
