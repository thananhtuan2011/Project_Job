import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  url: string;

  constructor() {
    let base = 'http://localhost:5500';

    this.url = base + '/api/experience';
  }

  findExperienceByUserId() {
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

  updateExperience(experienceId:any, experience:any) {
    // console.log(JSON.stringify(user));
    return fetch(this.url + '/' + experienceId, {
      method: 'PUT',
      body: JSON.stringify(experience),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    });
  }

  createExperience(experience:any) {
    // console.log(JSON.stringify(user));
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(experience),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    });
  }

  deleteExperience(Id:any) {
    return fetch(this.url + '/' + Id, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

}
