import { Component, Input,  OnInit } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItem, CartService } from '@bluebits/orders';

@Component({
  selector: 'lib-products-product-item',
  standalone: true,
  imports: [ButtonModule,CommonModule,RouterModule],
  templateUrl: './product-item.component.html',
  styles: ``
})
export class ProductItemComponent implements OnInit {

@Input() product: Product | undefined

constructor(private cartService: CartService){

}

ngOnInit(): void {

  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }

}
