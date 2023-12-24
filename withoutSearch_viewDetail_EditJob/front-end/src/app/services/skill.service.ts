import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  apiUrl!: string

  constructor(private http: HttpClient) {

    let base = 'http://localhost:5500';

    this.apiUrl = base + '/api/allskill';
  }

  // getAllSkills(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}`);
  // }

  getAllSkills() {
    const url = this.apiUrl;
    return this.http.get<any>(url);

  }

  // addSkill(skill: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}`, skill);
  // }
}
