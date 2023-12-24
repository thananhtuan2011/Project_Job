import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  url: string;

  constructor() {
    let base = 'http://localhost:5500';

    this.url = base + '/api/education';
  }

  findEducationByUserId() {
    console.log('test pass');
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

  updateEducation(educationId:any, education:any) {
    // console.log(JSON.stringify(user));
    return fetch(this.url + '/' + educationId, {
      method: 'PUT',
      body: JSON.stringify(education),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    });
  }

  createEducation(education:any) {
    // console.log(JSON.stringify(user));
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(education),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    });
  }

  deleteEducation(Id:any) {
    return fetch(this.url + '/' + Id, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

}
