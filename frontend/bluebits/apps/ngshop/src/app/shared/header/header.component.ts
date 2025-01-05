import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";

import { CartIconComponent } from '@bluebits/orders';
import { ProductsSearchComponent } from '@bluebits/products';


@Component({
    selector: 'ngshop-header',
    imports: [NavComponent, ProductsSearchComponent, CartIconComponent],
    templateUrl: './header.component.html'
})
export class HeaderComponent {

}
