import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypePageComponent } from './appointment-type-page.component';

describe('AppointmentTypePageComponent', () => {
  let component: AppointmentTypePageComponent;
  let fixture: ComponentFixture<AppointmentTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentTypePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
