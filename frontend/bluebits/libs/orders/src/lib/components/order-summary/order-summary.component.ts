import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, take } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/orders.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'orders-order-summary',
    imports: [ButtonModule, CommonModule],
    templateUrl: './order-summary.component.html',
    styles: ``
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();
  totalPrice = 0;
  isCheckout = false;

  constructor(private cartService: CartService, private ordersService: OrderService, private router: Router) {
    this.router.url.includes('checkout') ? this.isCheckout = true : this.isCheckout = false;
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(this.totalPrice);
    this.endSubs$.complete();
  }

  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {
          this.ordersService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * (item.quantity ?? 0);
            });
        });
      }
    });
  }
  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
