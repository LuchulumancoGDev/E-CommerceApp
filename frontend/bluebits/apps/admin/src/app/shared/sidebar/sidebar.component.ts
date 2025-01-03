import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bluebits/users';

@Component({
    selector: 'admin-sidebar',
    imports: [RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logoutUser() {
    this.authService.logout();
  }
}
