import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'ngshop-header',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './header.component.html',

})
export class HeaderComponent {

}
