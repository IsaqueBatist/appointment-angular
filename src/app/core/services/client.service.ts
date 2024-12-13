import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = "http://localhost:3000/clients"
  constructor(private http: HttpClient) {   }

  getClients(filter: string, page: number): Observable<HttpResponse<Client[]>>{
    const url = `${this.baseUrl}?name_like=${filter}&_page=${page}&_sort=name`
    return this.http.get<Client[]>(url, {observe: 'response'})
  }

    deleteClient(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }
}
