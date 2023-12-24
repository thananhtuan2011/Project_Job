import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecruiterDetailService {

  url: string;

  constructor() {
    let base = 'http://localhost:5500';

    this.url = base + '/api/recruiter';
  }

  findRecruiterDetailsByUserId() {
    return fetch(this.url + '/user', {
      credentials: 'include',
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  updateRecruiterDetail(recruiterId: any, recruiter: any) {
    //console.log(JSON.stringify(user));
    return fetch(this.url + '/' + recruiterId, {
      method: 'PUT',
      body: JSON.stringify(recruiter),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    });
  }

  createRecruiterDetail(recruiterDetail: any) {
    // console.log(JSON.stringify(user));
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(recruiterDetail),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    });
  }

  deleteRecruiterDetail(Id: any) {
    return fetch(this.url + '/' + Id, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

}
