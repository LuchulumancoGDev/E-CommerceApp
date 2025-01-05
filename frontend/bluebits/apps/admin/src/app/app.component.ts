import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
    selector: 'admin-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [RouterModule]
})
export class AppComponent {
  title = 'admin';
}
