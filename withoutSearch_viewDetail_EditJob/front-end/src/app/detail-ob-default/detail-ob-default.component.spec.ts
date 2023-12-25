import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailObDefaultComponent } from './detail-ob-default.component';

describe('DetailObDefaultComponent', () => {
  let component: DetailObDefaultComponent;
  let fixture: ComponentFixture<DetailObDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailObDefaultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailObDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
