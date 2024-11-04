import { Component, Input,  OnInit } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'products-product-item',
  standalone: true,
  imports: [ButtonModule,CommonModule],
  templateUrl: './product-item.component.html',
  styles: ``
})
export class ProductItemComponent implements OnInit {

@Input() product: Product | undefined

constructor(){
  
}

ngOnInit(): void {
  
}

}
