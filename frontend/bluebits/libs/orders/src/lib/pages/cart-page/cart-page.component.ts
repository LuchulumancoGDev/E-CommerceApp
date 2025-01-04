import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { CartService } from '../../services/cart.service';

import { OrderService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { OrderSummaryComponent } from "../../components/order-summary/order-summary.component";
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'orders-cart-page',
    imports: [ButtonModule, CommonModule, ToastModule, InputNumberModule, OrderSummaryComponent, FormsModule],
    providers: [MessageService],
    templateUrl: './cart-page.component.html',
    styles: ``
})
export class CartPageComponent implements OnInit,OnDestroy {


  cartItemsDetailed: CartItemDetailed[] = []
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();
  constructor(private router: Router,private messageService: MessageService, private cartService: CartService, private orderService:OrderService) {

  }


ngOnInit(): void {
  this._getCartDetails();

  }
  
  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(resCart => {
      this.cartItemsDetailed = [];
      this.cartCount = resCart.items?.length ?? 0;
      resCart.items?.forEach(cartItem => {
        this.orderService.getProduct(cartItem.productId).subscribe(resProduct => {
          this.cartItemsDetailed.push({
            product: resProduct,
            quantity:cartItem.quantity
          });

        })

      })
    })
  }

backToShop() {
  this.router.navigate(['/products']);
}

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
    this.show(cartItem.product.name, "deleted");

  }

  show(product:string, action:string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Successfully ${action} ${product} item to cart` });
  }

   ngOnDestroy(): void {
     this.endSubs$.next(this.cartItemsDetailed);
     this.endSubs$.complete();
  }

  updateCartItemQuantity($event: InputNumberInputEvent,cartItem: CartItemDetailed) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: $event.value as number ,
    }, true)
    this.show(cartItem.product.name, "updated");
}
}
