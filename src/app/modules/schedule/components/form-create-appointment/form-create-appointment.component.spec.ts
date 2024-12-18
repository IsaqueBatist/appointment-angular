import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateAppointmentComponent } from './form-create-appointment.component';

describe('FormCreateAppointmentComponent', () => {
  let component: FormCreateAppointmentComponent;
  let fixture: ComponentFixture<FormCreateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCreateAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
