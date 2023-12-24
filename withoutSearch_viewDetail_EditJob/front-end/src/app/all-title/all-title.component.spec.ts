import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTitleComponent } from './all-title.component';

describe('AllTitleComponent', () => {
  let component: AllTitleComponent;
  let fixture: ComponentFixture<AllTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
