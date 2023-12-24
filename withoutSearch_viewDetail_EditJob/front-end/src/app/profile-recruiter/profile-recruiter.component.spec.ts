import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecuiterComponent } from './profile-recruiter.component';

describe('ProfileRecuiterComponent', () => {
  let component: ProfileRecuiterComponent;
  let fixture: ComponentFixture<ProfileRecuiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileRecuiterComponent]
    });
    fixture = TestBed.createComponent(ProfileRecuiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
