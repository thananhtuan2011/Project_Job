import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardComponent } from './job-board.component';

describe('JobBoardComponent', () => {
  let component: JobBoardComponent;
  let fixture: ComponentFixture<JobBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobBoardComponent]
    });
    fixture = TestBed.createComponent(JobBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
