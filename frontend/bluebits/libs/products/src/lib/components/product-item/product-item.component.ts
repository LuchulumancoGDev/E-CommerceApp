import { Component, Input,  OnInit } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { RippleModule } from 'primeng/ripple';
import { CartItem, CartService } from '@bluebits/orders';
@Component({
    selector: 'lib-products-product-item',
    imports: [ButtonModule, RippleModule, ToastModule, CommonModule, RouterModule],
    providers: [MessageService],
    templateUrl: './product-item.component.html',
    styles: ``
})
export class ProductItemComponent  {

@Input() product: Product | undefined

constructor(private cartService: CartService, private messageService: MessageService){

}



  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
    this.show();
  }
   show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Successfully added ${this.product?.name} item to cart` });
    }

}
