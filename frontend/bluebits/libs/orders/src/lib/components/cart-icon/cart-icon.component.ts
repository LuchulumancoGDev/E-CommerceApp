import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'orders-cart-icon',
  standalone: true,
  imports: [BadgeModule],
  templateUrl: './cart-icon.component.html',
  styles: ``
})
export class CartIconComponent  implements OnInit{
  cartCount: number | undefined;

  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.items?.length;
    });
   this.cartCount= this.cartService.getCart().items?.length;
  }

}
