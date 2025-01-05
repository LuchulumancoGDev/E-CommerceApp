import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { BannerComponent } from '@bluebits/ui';
import { CategoriesBannerComponent, FeaturedProductsComponent } from '@bluebits/products';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [AccordionModule, BannerComponent, CategoriesBannerComponent, FeaturedProductsComponent]
})
export class HomePageComponent {

}
