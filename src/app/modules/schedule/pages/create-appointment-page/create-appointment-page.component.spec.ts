import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppointmentPageComponent } from './create-appointment-page.component';

describe('CreateAppointmentPageComponent', () => {
  let component: CreateAppointmentPageComponent;
  let fixture: ComponentFixture<CreateAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAppointmentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
