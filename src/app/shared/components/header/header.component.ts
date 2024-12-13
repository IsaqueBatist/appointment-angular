import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  getRealName(): string{
    return 'Isaque'
  }
  isAdmin(): boolean {
    return true
  }
  logout(): void {
    console.log('Logout')
  }
}
