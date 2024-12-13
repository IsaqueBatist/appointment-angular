import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaPageComponent } from './pages/area-page/area-page.component';
import { ProfessionalPageComponent } from './pages/professional-page/professional-page.component';
import { AppointmentTypePageComponent } from './pages/appointment-type-page/appointment-type-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ClientsTablePageComponent } from './pages/clients-table-page/clients-table-page.component';

const routes: Routes = [
  {path: 'area', component: AreaPageComponent},
  {path: 'professional', component: ProfessionalPageComponent},
  {path: 'appointmentType', component: AppointmentTypePageComponent},
  {path: 'clients-table', component: ClientsTablePageComponent},
  {path: 'user', component: UserPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
