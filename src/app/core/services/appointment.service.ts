import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl = "http://localhost:3000/appointments"
  constructor(private http: HttpClient) { }

  createAppointment(appointment: Appointment): Observable<void>{
    return this.http.post<any>(this.baseUrl, appointment)
  }
}
