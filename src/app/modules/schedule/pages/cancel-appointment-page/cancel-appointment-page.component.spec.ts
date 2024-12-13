import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAppointmentPageComponent } from './cancel-appointment-page.component';

describe('CancelAppointmentPageComponent', () => {
  let component: CancelAppointmentPageComponent;
  let fixture: ComponentFixture<CancelAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelAppointmentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
