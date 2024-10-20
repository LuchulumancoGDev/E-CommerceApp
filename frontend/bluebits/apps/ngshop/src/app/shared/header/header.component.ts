import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { ProductsSearchComponent } from "../../../../../../libs/products/src/lib/components/products-search/products-search.component";

@Component({
  selector: 'ngshop-header',
  standalone: true,
  imports: [NavComponent, ProductsSearchComponent],
  templateUrl: './header.component.html',

})
export class HeaderComponent {

}
