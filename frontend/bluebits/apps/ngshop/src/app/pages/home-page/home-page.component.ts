import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { AccordionModule } from 'primeng/accordion';
import { BannerComponent } from "../../../../../../libs/ui/src/lib/component/banner/banner.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [HeaderComponent, FooterComponent, AccordionModule, BannerComponent]
})
export class HomePageComponent {

}
