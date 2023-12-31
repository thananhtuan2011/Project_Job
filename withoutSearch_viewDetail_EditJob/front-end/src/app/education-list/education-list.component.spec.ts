import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationListComponent } from './education-list.component';

describe('EducationListComponent', () => {
  let component: EducationListComponent;
  let fixture: ComponentFixture<EducationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationListComponent]
    });
    fixture = TestBed.createComponent(EducationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
