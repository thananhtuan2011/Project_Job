// job-board.component.ts

import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css']
})
export class JobBoardComponent implements OnInit {

  keywordOrTitle: string = " ";
  location: string= " ";
  states = ['Ho Chi Minh City',
  'Ha Noi',
  'Da Nang',
  'Hai Phong',
  'Can Tho',
  'Bien Hoa',
  'Nha Trang',
  'Hue',
  'Vung Tau',
  'Qui Nhon'];

  constructor(private router: Router) {}

  setVal(val: any) {
    this.location = val;
  }

  getInputVal() {
    return this.location;
  }

  ngOnInit() {}
}

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
  transform(value: string[], search: string): string[] {
    if (!search) {
      return value;
    }
    const solution = value.filter((v: string) => {
      if (!v) {
        return false;
      }
      return v.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    return solution;
  }
}
