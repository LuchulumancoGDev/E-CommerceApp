import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";

@Component({
    standalone: true,
    selector: 'admin-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [NxWelcomeComponent, RouterModule, SidebarComponent]
})
export class AppComponent {
  title = 'admin';
}
