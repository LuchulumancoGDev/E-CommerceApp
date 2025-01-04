import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { BannerComponent } from "../../../../../../libs/ui/src/lib/component/banner/banner.component";
import { CategoriesBannerComponent } from "../../../../../../libs/products/src/lib/components/categories-banner/categories-banner.component";
import { FeaturedProductsComponent } from "../../../../../../libs/products/src/lib/components/featured-products/featured-products.component";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [AccordionModule, BannerComponent, CategoriesBannerComponent, FeaturedProductsComponent]
})
export class HomePageComponent {

}
