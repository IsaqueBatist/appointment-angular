import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayAppointmentsPageComponent } from './today-appointments-page.component';

describe('TodayAppointmentsPageComponent', () => {
  let component: TodayAppointmentsPageComponent;
  let fixture: ComponentFixture<TodayAppointmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodayAppointmentsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodayAppointmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
