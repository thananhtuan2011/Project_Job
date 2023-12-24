import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = '/api/skill';

  constructor(private http: HttpClient) { }

  getAllSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addSkill(skill: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, skill);
  }
}
