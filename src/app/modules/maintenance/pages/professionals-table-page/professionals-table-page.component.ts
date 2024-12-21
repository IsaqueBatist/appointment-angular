import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../core/models/page';
import { Professional } from '../../../../core/models/professional';
import { ProfessionalService } from '../../../../core/services/professional.service';

@Component({
  selector: 'app-professionals-table-page',
  templateUrl: './professionals-table-page.component.html',
  styleUrl: './professionals-table-page.component.css'
})
export class ProfessionalsTablePageComponent implements OnInit{
  ProfessionalPage: Page<Professional> = {} as Page<Professional>
  filter: string = ""
  page=1;

  constructor(private professionalService: ProfessionalService){}

  ngOnInit(): void {
    this.loadProfessionals()
  }

  loadProfessionals() {
    this.professionalService.getProfessionals(this.filter).subscribe({
      next: response => {
        this.ProfessionalPage.content = response.body
        this.ProfessionalPage.numberofElements = parseInt(response.headers.get('X-Total-Count')  || '0')
        console.log(this.ProfessionalPage.content)
      },
      error: () => console.log("Erro ao procurar profissionais")
    })
  }

  filterName(){
    this.loadProfessionals()
  }

  removeProfesional(professional: Professional){
    this.professionalService.deleteProfessional(professional).subscribe({
      next: () => {
        console.log("Profissional removido com sucesso")
        this.loadProfessionals()
      },
      error: () => console.log("Erro ao excluir o profissional")
    })
  }


}
