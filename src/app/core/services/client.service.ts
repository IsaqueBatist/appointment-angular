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

  getClientsPage(filter: string, page: number): Observable<HttpResponse<Client[]>>{
    const url = `${this.baseUrl}?name_like=${filter}&_page=${page}&_limit=10&_sort=name`
    return this.http.get<Client[]>(url, {observe: 'response'})
  }
  getClientsWithNameContaining(clientNameFilter: string): Observable<Client[]>{
    const url = `${this.baseUrl}?name_like=${clientNameFilter}&_limit=10`
    return this.http.get<Client[]>(url)
  }

  deleteClient(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }

  saveNewClient(client: Client): Observable<void>{
    return this.http.post<void>(this.baseUrl, client)
  }

  getClientById(id: number): Observable<Client>{
    let url = `${this.baseUrl}/${id}`
    return this.http.get<Client>(url)
  }

  updateClient(client: Client): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/${client.id}`, client)
  }
}
