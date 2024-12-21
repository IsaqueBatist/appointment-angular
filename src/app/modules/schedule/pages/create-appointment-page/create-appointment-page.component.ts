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
import { Time } from '../../components/time/models/time';
import { Appointment } from '../../../../core/models/appointment';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-create-appointment-page',
  templateUrl: './create-appointment-page.component.html',
  styleUrl: './create-appointment-page.component.css'
})
export class CreateAppointmentPageComponent implements OnInit{
  //Form Component
  areas: Area[] = []
  professionalsByArea: Professional[] = []
  appointmentTypes: AppointmentType[] = []
  selectedProfessional: Professional = {} as Professional

  //Time Component
  dateSelected !: Date
  timeSelected !: Time
  availablesTimes: Time[] = []
  timeErro: string = ""

  //Calendar Component
  calendarMonth: Date = new Date()
  avaiableDays: number[] = []
  calendarErro : string = ""

  appointment: Appointment = {} as Appointment

  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointComponent !: FormCreateAppointmentComponent

  constructor(private areaService: AreaService,
              private appointmentTypeService: AppointmentTypeService,
              private clientService: ClientService,
              private professionalService: ProfessionalService,
              private appointmentService: AppointmentService,
              private toastService: ToastService
            ){}

  ngOnInit(): void {
    this.loadAreas()
    this.loadAppointmentTypes()
  }

  clean(){
    this.formCreateAppointComponent.cleanForm()
    this.avaiableDays = []
    this.availablesTimes = []
    this.appointment = {} as Appointment
  }

  onSelectedDate(date: Date){
    this.dateSelected = date
    this.calendarErro = ""
    this.loadAvailableTimes()
  }
  loadAvailableTimes() {
    this.professionalService.getAvailableTimes(this.selectedProfessional, this.calendarMonth).subscribe({
      next: availablesTimes => this.availablesTimes = availablesTimes,
    })
  }

  onSelectedTime(time: Time){
    this.timeErro = ""
    this.timeSelected = time
  }


  onChangedMonth(date: Date){
    this.calendarMonth = date
    this.availablesTimes = []
    this.loadAvaiblesDays()
  }

  onSelectedProfessional(professional: Professional){
    this.selectedProfessional = professional,
    this.calendarMonth = new Date()
    this.availablesTimes = []
    this.loadAvaiblesDays()
  }

  loadAvaiblesDays(){
    this.professionalService.getAvailableDays(this.selectedProfessional, this.calendarMonth).subscribe({
      next: avaiableDays => this.avaiableDays = avaiableDays,
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
      error: () => this.toastService.show("Erro ao carregar Tipos de agendamento", {classname: 'bg-danger text-light' })
    })
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas = areas,
      error: () => this.toastService.show("Erro ao carregar Áreas", {classname: 'bg-danger text-light' })
    })
  }

  onSelectedArea(area:Area){
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: profesisonalsByArea => this.professionalsByArea = profesisonalsByArea,
      error: () => this.toastService.show("Erro ao carregar Profissionais", {classname: 'bg-danger text-light' })
    })
    this.avaiableDays = []
    this.availablesTimes = []
  }

  createAppointment(modalConfirm: ModalComponent){
    this.formCreateAppointComponent.submitted = true
    this.checkDateAndTimeErrors()

    if(this.isAppointmentValid()){
      this.appointment = this.createAppointmentObject()
      modalConfirm.open({size: "lg"}).then(confirm => {
        this.appointmentService.createAppointment(this.appointment).subscribe({
          next: () => {
            this.toastService.show("Agendado com sucesso", {classname: 'bg-success text-light'})
            this.clean()
          },
          error: () => this.toastService.show("Erro ao agendar", {classname: 'bg-danger text-light' })
        })
      })
    }

  }
  private createAppointmentObject(): Appointment {
    let newAppointment: Appointment = {} as Appointment
    newAppointment = {... this.formCreateAppointComponent.appointmentForm.value}
    newAppointment.startTime = this.timeSelected.startTime
    newAppointment.endTime = this.timeSelected.endTime
    newAppointment.date = this.dateSelected
    return newAppointment
  }
  isAppointmentValid(): boolean {
    return !!(this.formCreateAppointComponent.appointmentForm.valid && this.dateSelected && this.timeSelected)
  }
  checkDateAndTimeErrors() {
    if(!this.timeSelected){
      this.timeErro = "*Selecione um horário"
    }
    if(!this.dateSelected){
      this.calendarErro = "*Selecione uma data"
    }
  }
}

