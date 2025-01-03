import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { ProductsSearchComponent } from "../../../../../../libs/products/src/lib/components/products-search/products-search.component";
import { CartIconComponent } from '@bluebits/orders';


@Component({
    selector: 'ngshop-header',
    imports: [NavComponent, ProductsSearchComponent, CartIconComponent],
    templateUrl: './header.component.html'
})
export class HeaderComponent {

}
