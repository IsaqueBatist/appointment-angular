import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { AppointmentTypePageComponent } from './pages/appointment-type-page/appointment-type-page.component';
import { AreaPageComponent } from './pages/area-page/area-page.component';
import { ClientFormPageComponent } from './pages/client-form-page/client-form-page.component';
import { ClientsTablePageComponent } from './pages/clients-table-page/clients-table-page.component';
import { ProfessionalPageComponent } from './pages/professional-page/professional-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ProfessionalsTablePageComponent } from './pages/professionals-table-page/professionals-table-page.component';




@NgModule({
  declarations: [
    AreaPageComponent,
    ProfessionalPageComponent,
    AppointmentTypePageComponent,
    UserPageComponent,
    ClientsTablePageComponent,
    ClientFormPageComponent,
    ProfessionalsTablePageComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
]
})
export class MaintenanceModule { }
