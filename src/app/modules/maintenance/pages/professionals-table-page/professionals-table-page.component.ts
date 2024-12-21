import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../core/models/page';
import { Professional } from '../../../../core/models/professional';
import { ProfessionalService } from '../../../../core/services/professional.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-professionals-table-page',
  templateUrl: './professionals-table-page.component.html',
  styleUrl: './professionals-table-page.component.css'
})
export class ProfessionalsTablePageComponent implements OnInit{
  ProfessionalPage: Page<Professional> = {} as Page<Professional>
  filter: string = ""
  page: number = 1;
  selectedProfessional: Professional = {} as Professional

  constructor(
    private professionalService: ProfessionalService,
    private toastService: ToastService

  ){}

  ngOnInit(): void {
    this.loadProfessionals()
  }

  loadProfessionals() {
    this.professionalService.getProfessionals(this.filter, this.page).subscribe({
      next: response => {
        this.ProfessionalPage.content = response.body
        this.ProfessionalPage.numberofElements = parseInt(response.headers.get('X-Total-Count')  || '0')
      },
      error: () => this.toastService.show("Erro ao carregar os profissionais", {classname: 'bg-danger text-light'})
    })
  }

  filterName(){
    this.loadProfessionals()
  }

  pageChange(){
    this.loadProfessionals()
  }

  removeProfesional(professional: Professional, modalConfirm: ModalComponent){
    this.selectedProfessional = professional
    modalConfirm.open().then(confirm => {
      if(confirm){
        this.professionalService.deleteProfessional(professional).subscribe({
          next: () => {
            this.toastService.show("Profissional removido com sucesso", {classname: 'bg-success text-light'})
            this.loadProfessionals()
          },
          error: () => this.toastService.show("Erro ao excluir o profissional", {classname: 'bg-danger text-light'})
        })
      }
    })
  }


}
