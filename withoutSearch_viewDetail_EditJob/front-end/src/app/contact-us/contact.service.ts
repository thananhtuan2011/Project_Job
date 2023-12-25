import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    apiUrl!: string
    apiUrldetail!: string
    apiUrlradom!: string
    apiUrlmyjob!: string
    remove!: string
    public location$ = new BehaviorSubject<any>(null);
    apidefault!: string
    constructor(private http: HttpClient) {
        let base = 'http://localhost:5500';
        this.apiUrldetail = base + '/api/detailjob';
        this.apiUrl = base + '/api/contact';
        this.remove = base + '/api/removejob';
        this.apidefault = base + '/api/jobdetail_default';
        this.apiUrlradom = base + '/api/radomjob';
        this.apiUrlmyjob = base + '/api/myjob';
    }

    // getAllSkills(): Observable<any[]> {
    //   return this.http.get<any[]>(`${this.apiUrl}`);
    // }

    RandomJob() {
        const url = this.apiUrlradom;
        return this.http.get<any>(url);

    }

    MyJob(_id: any) {
        const url = this.apiUrlmyjob + '/' + _id;
        return this.http.get<any>(url);

    }
    RemoveJob(_id: any) {
        const url = this.remove + '/' + _id;
        return this.http.post<any>(url, null);

    }


    CreateContact(body: any) {
        const url = this.apiUrl;
        return this.http.post<any>(url, body);

    }

    DetailJob(_id: any) {
        const url = this.apiUrldetail + '/' + _id;
        return this.http.get<any>(url);

    }

    DetailJobDefault() {
        const url = this.apidefault;
        return this.http.get<any>(url);

    }




    // addSkill(skill: any): Observable<any> {
    //   return this.http.post<any>(`${this.apiUrl}`, skill);
    // }
}
