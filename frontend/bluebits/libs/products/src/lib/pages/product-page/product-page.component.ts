import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { RatingModule } from 'primeng/rating';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from '@bluebits/ui';
import { CartItem, CartService } from '@bluebits/orders';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'lib-products-product-page',
    imports: [RatingModule, FormsModule, CommonModule, ToastModule, InputNumberModule, ButtonModule, GalleryComponent],
    providers: [MessageService],
    templateUrl: './product-page.component.html',
    styles: ``
})
export class ProductPageComponent implements OnInit, OnDestroy {

  quantity?: number =1 ;

  product: Product | undefined;
  endSubs$: Subject<any> = new Subject();
  constructor(private productService:ProductsService, private messageService: MessageService, private route: ActivatedRoute, private cartService:CartService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productid']) {
        this._getProducts(params['productid']);
      }
    })
  }

  addProductToCart() {
    const cartItem: CartItem ={
      productId: this.product?.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
    this.show();
  }
  private _getProducts(id: string) {
    this.productService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(response => {
      this.product = response;
    });

  }

   show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Successfully added ${this.product?.name} item to cart` });
    }

   ngOnDestroy(): void {
    this.endSubs$.next(this.product),
      this.endSubs$.complete()
  }

}
