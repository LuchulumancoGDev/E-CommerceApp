import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'admin-shell',
    templateUrl: './shell.component.html',
    styleUrl: './shell.component.scss',
    imports: [SidebarComponent, RouterModule]
})
export class ShellComponent {

}
