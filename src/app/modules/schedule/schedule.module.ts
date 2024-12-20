import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { CancelAppointmentPageComponent } from './pages/cancel-appointment-page/cancel-appointment-page.component';
import { ClientHistoryPageComponent } from './pages/client-history-page/client-history-page.component';
import { CreateAppointmentPageComponent } from './pages/create-appointment-page/create-appointment-page.component';
import { ProfessionalWorkdaysPageComponent } from './pages/professional-workdays-page/professional-workdays-page.component';
import { TodayAppointmentsPageComponent } from './pages/today-appointments-page/today-appointments-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCreateAppointmentComponent } from './components/form-create-appointment/form-create-appointment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TimeComponent } from './components/time/time.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CancelAppointmentPageComponent,
    ClientHistoryPageComponent,
    CreateAppointmentPageComponent,
    ProfessionalWorkdaysPageComponent,
    TodayAppointmentsPageComponent,
    FormCreateAppointmentComponent,
    CalendarComponent,
    TimeComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ]
})
export class ScheduleModule { }
