import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForCadidateComponent } from './for-cadidate.component';

describe('ForCadidateComponent', () => {
  let component: ForCadidateComponent;
  let fixture: ComponentFixture<ForCadidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForCadidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForCadidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
