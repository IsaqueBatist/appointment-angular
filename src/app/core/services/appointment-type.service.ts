import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentType } from '../models/appointmentType';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTypeService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:3000/appointment-types"

  getAppintmentTypes(): Observable<AppointmentType[]>{
    return this.http.get<AppointmentType[]>(this.baseUrl)
  }
}
