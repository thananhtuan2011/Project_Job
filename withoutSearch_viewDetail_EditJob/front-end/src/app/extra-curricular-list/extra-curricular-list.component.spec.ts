import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraCurricularListComponent } from './extra-curricular-list.component';

describe('ExtraCurricularListComponent', () => {
  let component: ExtraCurricularListComponent;
  let fixture: ComponentFixture<ExtraCurricularListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraCurricularListComponent]
    });
    fixture = TestBed.createComponent(ExtraCurricularListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
