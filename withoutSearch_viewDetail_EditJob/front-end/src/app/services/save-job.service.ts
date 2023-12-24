import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveJobService {

  url: string;

  constructor() {
    let base = 'http://localhost:5500';

    this.url = base + '/api/jobApplication';
  }

  createJobApplication(jobApplication: any) {
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(jobApplication),
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

  updateJobApplication(jobApplicationId: any, jobApplication: any) {
    return fetch(this.url + '/' + jobApplicationId, {
      method: 'PUT',
      body: JSON.stringify(jobApplication),
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

  deleteJobApplication(jobApplicationId: any) {
    return fetch(this.url + '/' + jobApplicationId, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

  deleteJobApplicationByJobPosting(jobApplicationId: any, source: any) {
    return fetch(this.url + '/' + jobApplicationId + '/' + source, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

  getAllJobApplicationForUser() {
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


}
