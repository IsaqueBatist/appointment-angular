import { Component, OnInit, ViewChild } from '@angular/core';
import { Area } from '../../../../core/models/area';
import { AreaService } from '../../../../core/services/area.service';
import { Professional } from '../../../../core/models/professional';
import { AppointmentTypeService } from '../../../../core/services/appointment-type.service';
import { AppointmentType } from '../../../../core/models/appointmentType';
import { ClientService } from '../../../../core/services/client.service';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { Client } from '../../../../core/models/client';
import { FormCreateAppointmentComponent } from '../../component/form-create-appointment/form-create-appointment.component';

@Component({
  selector: 'app-create-appointment-page',
  templateUrl: './create-appointment-page.component.html',
  styleUrl: './create-appointment-page.component.css'
})
export class CreateAppointmentPageComponent implements OnInit{
  areas: Area[] = []
  professionalsByArea: Professional[] = []
  appointmentTypes: AppointmentType[] = []

  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointComponent !: FormCreateAppointmentComponent

  constructor(private areaService: AreaService,
              private appointmentTypeService: AppointmentTypeService,
              private clientService: ClientService
            ){}

  ngOnInit(): void {
    this.loadAreas()
    this.loadAppointmentTypes()
  }

  searchClients = (text: Observable<string>): Observable<Client[]> => {
    return text.pipe(
			debounceTime(200),
			distinctUntilChanged(),
      filter(term => term.length >= 2),
      switchMap(term => this.clientService.getClientsWithNameContaining(term as string)),
		);
  }

  loadAppointmentTypes() {
    this.appointmentTypeService.getAppintmentTypes().subscribe({
      next: appointmentTypes =>  this.appointmentTypes = appointmentTypes,
      error: () => {alert('Erro ao carregar tipos de agendamento')}
    })
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas = areas,
      error: () => {alert('Erro ao carregar areas')}
    })
  }

  onSelectedArea(area:Area){
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: profesisonalsByArea => this.professionalsByArea = profesisonalsByArea,
      error: () => {alert('Erro ao carregar profissionais')}
    })
  }

  createAppointment(){
    this.formCreateAppointComponent.submitted = true  
    console.info(this.formCreateAppointComponent.appointmentForm.value)
  }
}

