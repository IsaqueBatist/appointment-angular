import { Component, OnInit, ViewChild } from '@angular/core';
import { Area } from '../../../../core/models/area';
import { AreaService } from '../../../../core/services/area.service';
import { Professional } from '../../../../core/models/professional';
import { AppointmentTypeService } from '../../../../core/services/appointment-type.service';
import { AppointmentType } from '../../../../core/models/appointmentType';
import { ClientService } from '../../../../core/services/client.service';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { Client } from '../../../../core/models/client';
import { FormCreateAppointmentComponent } from '../../components/form-create-appointment/form-create-appointment.component';
import { ProfessionalService } from '../../../../core/services/professional.service';

@Component({
  selector: 'app-create-appointment-page',
  templateUrl: './create-appointment-page.component.html',
  styleUrl: './create-appointment-page.component.css'
})
export class CreateAppointmentPageComponent implements OnInit{
  areas: Area[] = []
  professionalsByArea: Professional[] = []
  appointmentTypes: AppointmentType[] = []
  selectedProfessional: Professional = {} as Professional

  calendarMonth: Date = new Date()
  avaiableDays: number[] = []

  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointComponent !: FormCreateAppointmentComponent

  constructor(private areaService: AreaService,
              private appointmentTypeService: AppointmentTypeService,
              private clientService: ClientService,
              private professionalService: ProfessionalService
            ){}

  ngOnInit(): void {
    this.loadAreas()
    this.loadAppointmentTypes()
  }

  onSelectedDate(date: Date){}

  onChangedMonth(date: Date){
    this.calendarMonth = date
    this.loadAvaiblesDays()
  }

  onSelectedProfessional(professional: Professional){
    this.selectedProfessional = professional,
    this.calendarMonth = new Date()
    this.loadAvaiblesDays()
  }

  loadAvaiblesDays(){
    this.professionalService.getAvailableDays(this.selectedProfessional, this.calendarMonth).subscribe({
      next: avaibleDays => this.avaiableDays = avaibleDays,
    })
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

