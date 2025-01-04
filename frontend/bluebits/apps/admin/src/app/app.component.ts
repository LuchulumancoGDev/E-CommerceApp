import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


import { SidebarComponent } from "./shared/sidebar/sidebar.component";

@Component({
    selector: 'admin-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [ RouterModule, SidebarComponent]
})
export class AppComponent {
  title = 'admin';
}
