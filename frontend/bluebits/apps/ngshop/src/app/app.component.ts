import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from "./shared/header/header.component";

import { FooterComponent } from "./shared/footer/footer.component";
import { CartService } from '@bluebits/orders';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterModule, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'ngshop';

  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();

  }
}
