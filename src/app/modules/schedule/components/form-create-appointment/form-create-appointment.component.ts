import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Area } from '../../../../core/models/area';
import { Professional } from '../../../../core/models/professional';
import { AppointmentType } from '../../../../core/models/appointmentType';
import { OperatorFunction } from 'rxjs';
import { Client } from '../../../../core/models/client';

@Component({
  selector: 'app-form-create-appointment',
  templateUrl: './form-create-appointment.component.html',
  styleUrl: './form-create-appointment.component.css'
})
export class FormCreateAppointmentComponent{
  constructor(private formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      area: ['', [Validators.required]],
      professional: [{value: '', disabled: true}, Validators.required],
      type: ['', [Validators.required]],
      client: ['', [Validators.required]],
      comments: [''],
    })
  }
  appointmentForm: FormGroup
  submitted: boolean = false

  @Input() areas: Area[] = []

  @Input() professionalsByArea: Professional[] = []

  @Input() appointmentTypes: AppointmentType[] = []

  @Output() selectedAreaEvent = new EventEmitter<Area>()

  @Input() searchClients !: OperatorFunction<string, readonly Client[]>

  @Output() selectedProfessionalEvent = new EventEmitter<Professional>()

  formatter = (client: Client) => client.name

  schedule(){
    if(this.appointmentForm.valid){
      console.log(this.appointmentForm.value)
    }
  }
  getSelectedClient(): Client{
    return this.appointmentForm.controls['client'].value
  }
  onAreaChanged(){
    this.selectedAreaEvent.emit(this.appointmentForm.value["area"])
    this.appointmentForm.controls['professional'].enable()
  }
  onProfessionalChanged(){
    this.selectedProfessionalEvent.emit(this.appointmentForm.value["professional"])
  }

  cleanForm(){
    this.appointmentForm.reset()
    this.submitted = false
  }

  get aparea() {return this.appointmentForm.get('area')}
  get approfessional() {return this.appointmentForm.get('professional')}
  get apappointmentType() {return this.appointmentForm.get('appointmentType')}
  get apclient() {return this.appointmentForm.get('client')}
  get apcomments() {return this.appointmentForm.get('comments')}
}
