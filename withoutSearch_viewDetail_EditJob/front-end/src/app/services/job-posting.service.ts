import { Injectable } from '@angular/core';
import { JobPostingModelClient } from '../models/job-posting.model.client';
import { HttpClient, HttpErrorResponse, HttpHeaders } from
'@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobPostingService {

  url: string;
  allJobPostingUrl: string;
  constructor(private _http: HttpClient) {
    let base = 'http://localhost:5500';

    this.url = base + '/api/jobPosting';
    this.allJobPostingUrl =  base + '/api/allJobPosting';
  }

  createJobPosting(jobPosting: any) {
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(jobPosting),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  updateJobPosting(jobPostingId: any, jobPosting: any) {
    return fetch(this.url + '/' + jobPostingId, {
      method: 'PUT',
      body: JSON.stringify(jobPosting),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  deleteJobPosting(jobPostingId: any) {
    return fetch(this.url + '/' + jobPostingId, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

  getAllJobPostingForUser() {
    return fetch(this.url, {
      credentials: 'include'
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  getAllJobPostings() {
    console.log('in here');
    return fetch(this.allJobPostingUrl, {
      credentials: 'include'
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

}
