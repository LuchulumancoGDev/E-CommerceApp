import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from "./shared/header/header.component";

import { FooterComponent } from "./shared/footer/footer.component";
import { CartService } from '@bluebits/orders';
import { UsersService } from '@bluebits/users';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterModule, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnInit{
  title = 'ngshop';

  constructor(cartService: CartService, private userService: UsersService) {
    cartService.initCartLocalStorage();

  }
  ngOnInit(): void {
    this.userService.initAppSession();
  }
}
