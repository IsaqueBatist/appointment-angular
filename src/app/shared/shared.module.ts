import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from "./components/header/header.component";
import { ModalComponent } from "./components/modal/modal.component";
import { ToastComponent } from "./components/toast/toast.component";
import { TimePipe } from "./pipes/time.pipe";

@NgModule({
  declarations: [
    HeaderComponent,
    ToastComponent,
    ModalComponent,
    TimePipe,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ToastComponent,
    ModalComponent,
    TimePipe
  ]
})
export class SharedModule { }
