import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerDashboardComponent } from './job-seeker-dashboard.component';

describe('JobSeekerDashboardComponent', () => {
  let component: JobSeekerDashboardComponent;
  let fixture: ComponentFixture<JobSeekerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSeekerDashboardComponent]
    });
    fixture = TestBed.createComponent(JobSeekerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
