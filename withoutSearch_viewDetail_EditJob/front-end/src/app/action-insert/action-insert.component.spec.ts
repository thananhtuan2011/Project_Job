import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionInsertComponent } from './action-insert.component';

describe('ActionInsertComponent', () => {
  let component: ActionInsertComponent;
  let fixture: ComponentFixture<ActionInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionInsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
