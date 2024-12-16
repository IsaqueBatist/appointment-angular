import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/client';
import { Page } from '../../../../core/models/page';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-clients-table-page',
  templateUrl: './clients-table-page.component.html',
  styleUrl: './clients-table-page.component.css'
})

export class ClientsTablePageComponent implements OnInit {

  constructor(private ClientService: ClientService, private toastService: ToastService) { }

  ClientPage: Page<Client> = {} as Page<Client>;
  nameFilter:string = ""
  page=1;


  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(){
    this.ClientService.getClients(this.nameFilter, this.page).subscribe({
      next: response =>{
        this.ClientPage.content = response.body
        this.ClientPage.numberofElements = parseInt(response.headers.get('X-Total-Count') || '0')
      }
    })
  }

  filterName() {
    this.loadClients();
  }

  removeClient(id: number){
    this.ClientService.deleteClient(id).subscribe({
      next: () => {
        this.toastService.show("Client removido com sucesso", {classname: 'bg-success text-light'})
        this.loadClients()
      },
      error: () => {
        this.toastService.show("Erro ao deletar cliente", {classname: 'bg-danger text-light'})
      }
    })
  }

  pageChange(){
    this.loadClients()
  }

}
