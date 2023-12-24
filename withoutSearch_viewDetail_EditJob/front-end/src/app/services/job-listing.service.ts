import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Job } from '../models/Job';


@Injectable({
  providedIn: 'root'
})
export class JobListingService {

  constructor() { }


  findAllJobs() {
    return $.ajax({
      url: 'http://localhost:5500/api/allJobPosting',
      dataType: 'jsonp'
    });
  }

  // findFilteredJobs(location: any, keyword: any) {
  //   console.log('service');
  //   return $.ajax({
  //     url: 'https://jobs.github.com/positions.json?description=' + keyword + '&location=' + location,
  //     dataType: 'jsonp'
  //   });
  // }

  findFilteredJobs(location: any, keyword: any) {
    console.log('service');
    return $.ajax({
      url: 'http://localhost:5500/api/allJobPosting' + keyword + '&location=' + location,
      dataType: 'jsonp'
    });
  }
}
