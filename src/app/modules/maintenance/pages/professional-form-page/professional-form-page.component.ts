import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { AreaService } from '../../../../core/services/area.service';
import { Area } from '../../../../core/models/area';
import { ProfessionalService } from '../../../../core/services/professional.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-professional-form-page',
  templateUrl: './professional-form-page.component.html',
  styleUrl: './professional-form-page.component.css'
})
export class ProfessionalFormPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private areaService: AreaService,
    private professionalService: ProfessionalService,
    private location: Location,
    private router: ActivatedRoute,
    private toastService: ToastService
  ){
    this.formGroupProfessional = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      active: [false, [Validators.required]],
      areaId: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.loadAreas()
    this.router.paramMap.subscribe(
      params => {
        let professionalId = Number(params.get('id') ?? "0")
        if(professionalId){
          this.isEditingMode = true;
          this.loadClient(professionalId);
        }
      }
    )
  }

  loadClient(professionalId: number) {
    this.professionalService.getProfessionalById(professionalId).subscribe({
      next: professional => this.formGroupProfessional.setValue(professional),
      error: () => this.toastService.show("Erro ao carregar o profissional", {classname: 'bg-danger text-light'})
    })
  }

  formGroupProfessional: FormGroup;
  isEditingMode: boolean = false
  areas: Area[] = []

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas = areas,
      error: () => this.toastService.show("Erro ao carregar as Áreas", {classname: 'bg-danger text-light'})
    })
  }

  saveProfessional(){
    if (this.formGroupProfessional.valid && !this.isEditingMode) {
      this.professionalService.createProfessional(this.formGroupProfessional.value).subscribe({
        next: () => {
          this.toastService.show("Profissional cirado com sucesso", {classname: 'bg-success text-light'})
          this.location.back()
        },
        error: () => this.toastService.show("Erro ao criar profissional", {classname: 'bg-danger text-light'})
      })
    }else if(this.formGroupProfessional.valid && this.isEditingMode){
      this.professionalService.updateProfessional(this.formGroupProfessional.value).subscribe({
        next: () => {
          this.isEditingMode = false
          this.toastService.show("Profissional atualizado com sucesso", {classname: 'bg-success text-light'})
          this.location.back()
        },
        error: () => this.toastService.show("Erro ao atualizar o profissional", {classname: 'bg-danger text-light'})
      })
    }
  }

  cancel(){
    this.location.back()
  }

  get pfname() {return this.formGroupProfessional.get('name')}
  get pfphone() {return this.formGroupProfessional.get('phone')}
  get pfactive() {return this.formGroupProfessional.get('active')}
  get pfarea() {return this.formGroupProfessional.get('areaId')}
}
