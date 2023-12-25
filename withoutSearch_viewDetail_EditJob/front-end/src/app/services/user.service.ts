import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;
  urlRegister: string;
  // urlLoggedUser: string;
  urlLoggedRecruiter: string;
  urlUpdateProfile: string;
  urlLogin: string;
  urlPassReset: string;
  urlVerifyUsername: string;
  urlLogout: string;
  urlDeleteProfile: string;
  urlApproveRecruiter: string;
  urlPending: string;
  infor!: string;
  urlRecruiterProfile: string;
  urlPremiumGrant: string;
  urlPremiumRevoke: string;
  urlupdateaccount!: string;
  public checklogin$ = new BehaviorSubject<any>(false);
  constructor(private _http: HttpClient) {

    let base = 'http://localhost:5500';
    this.infor = base + '/api/inforuser';
    this.url = base + '/api/user';
    this.urlRegister = base + '/api/register';
    // this.urlLoggedUser = base + '/api/profile';
    this.urlLoggedRecruiter = base + '/api/profile/recruiter';
    this.urlUpdateProfile = base + '/api/profile';
    this.urlLogin = base + '/api/login';
    this.urlupdateaccount = base + '/api/updateaccount';
    this.urlPassReset = base + '/api/reset';
    this.urlVerifyUsername = base + '/api/verify';
    this.urlLogout = base + '/api/logout';
    this.urlDeleteProfile = base + '/api/user';
    this.urlApproveRecruiter = base + '/api/approve';
    this.urlPending = base + '/api/pending';
    this.urlRecruiterProfile = base + '/api/profile/recruiter';
    this.urlPremiumGrant = base + '/api/premium/approve';
    this.urlPremiumRevoke = base + '/api/premium/revoke';
  }

  register(user: any) {
    return fetch(this.urlRegister, {
      method: 'POST',
      body: JSON.stringify(user),
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


  login(usname: any, pass: any) {
    let item = {
      username: usname,
      password: pass
    }
    const url = this.urlLogin;
    return this._http.post<any>(url, item);

  }
  getIforUser(_id: any) {

    const url = this.infor + '/' + _id;
    return this._http.get<any>(url);

  }
  updateaccount(_id: any, body: any) {

    const url = this.urlupdateaccount + '/' + _id;
    return this._http.post<any>(url, body);

  }

  //   return fetch(this.urlLogin, {
  //     method: 'POST',
  //     body: JSON.stringify({ username: username, password: password }),

  //   }).then(response => {
  //     if (response.headers.get('content-type') != null) {
  //       return response.json();
  //     } else {
  //       return null;
  //     }
  //   });
  // }


  logout() {
    return fetch(this.urlLogout, {
      method: 'POST',
      credentials: 'include',
    });
  }

  // findLoggedUser() {
  //   return fetch(this.urlLoggedUser, {
  //     credentials: 'include',
  //   }).then(response => {
  //     if (response.headers.get('content-type') != null) {
  //       return response.json();
  //     } else {
  //       return null;
  //     }
  //   });
  // }
  findLoggedRecruiter() {
    return fetch(this.urlLoggedRecruiter, {
      credentials: 'include',
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  updateUserProfile(user: any) {
    return fetch(this.urlUpdateProfile, {
      method: 'PUT',
      body: JSON.stringify(user),
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

  deleteUser(userId: any) {
    return fetch(this.url + '/' + userId, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

  createUser(user: any) {
    const url = this.urlRegister;
    return this._http.post<any>(url, user);

  }

  approveRecruiter(userId: any) {
    return fetch(this.urlApproveRecruiter + '/' + userId, {
      method: 'POST',
      credentials: 'include'
    });
  }

  rejectRecruiter(userId: any) {
    return fetch(this.url + '/' + userId, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

  grantPremiumAccess(userId: any) {
    return fetch(this.urlPremiumGrant + '/' + userId, {
      method: 'POST',
      credentials: 'include'
    });
  }

  revokePremiumAccess(userId: any) {
    return fetch(this.urlPremiumRevoke + '/' + userId, {
      method: 'POST',
      credentials: 'include'
    });
  }

  findPendingRecruiters() {
    return fetch(this.urlPending, {
      credentials: 'include'
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  addRecruiterProfile(recruiter: any) {
    return fetch(this.urlRecruiterProfile, {
      method: 'POST',
      body: JSON.stringify(recruiter),
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

  findAllUsers() {
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

  verifyUser(username: any, callback: any) {
    return fetch(this.urlVerifyUsername + '/' + username).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    }).then(callback);
  }

}
