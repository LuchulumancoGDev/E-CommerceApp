import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { HeaderComponent } from "./shared/header/header.component";

import { FooterComponent } from "./shared/footer/footer.component";
import { UiComponent } from '@bluebits/ui';


@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [NxWelcomeComponent, RouterModule, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent, UiComponent]
})
export class AppComponent {
  title = 'ngshop';
}
