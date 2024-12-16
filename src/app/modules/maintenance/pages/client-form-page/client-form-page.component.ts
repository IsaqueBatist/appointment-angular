import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ClientService } from '../../../../core/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-client-form-page',
  templateUrl: './client-form-page.component.html',
  styleUrl: './client-form-page.component.css'
})
export class ClientFormPageComponent implements OnInit{

  constructor( private formBuilder: FormBuilder, private clientService: ClientService, private location: Location, private router: ActivatedRoute, private toastService: ToastService) {
    this.formGroupClient = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.minLength(3), Validators.required]],
      phone: ['', [Validators.minLength(11), Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    })
  }
  isEditinMode: boolean = false;
  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params => {
        let clinetId = Number(params.get('id') ?? "0")
        if(clinetId){
          this.isEditinMode = true;
          this.loadClient(clinetId)
        }
      }
    )
  }
  formGroupClient: FormGroup;

  loadClient(clientId: number){
    this.clientService.getClientById(clientId).subscribe({
      next: client => this.formGroupClient.setValue(client),
      error: () => {alert('Erro ao carregar cliente')}
    })
  }

  saveClient(){
    if(this.formGroupClient.valid && !this.isEditinMode){
      this.clientService.saveNewClient(this.formGroupClient.value).subscribe({
        next: () => {
          this.toastService.show("Cliente salvo com sucesso", {classname: 'bg-success text-light'})
          this.location.back()
        },
        error: () => {
          this.toastService.show("Erro ao salvar cliente", {classname: 'bg-danger text-light'})
        }
      })
    }else if(this.formGroupClient.valid && this.isEditinMode){
      this.clientService.updateClient(this.formGroupClient.value).subscribe({
        next: () => {
          this.isEditinMode = false;
          this.toastService.show("Cliente atualizado com sucesso", {classname: 'bg-success text-light'})
          this.location.back()},
        error: () => {
          this.toastService.show("Erro ao atualizar cliente", {classname: 'bg-danger text-light'})
        }
      })
    }
  }

  cencel(){
    this.location.back()
  }



  get pfsname(){return this.formGroupClient.get('name')}
  get pfsphone(){return this.formGroupClient.get('phone')}
  get pfsdateOfBirth(){return this.formGroupClient.get('dateOfBirth')}
}
