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

@Component({
  selector: 'lib-products-product-page',
  standalone: true,
  imports: [RatingModule,FormsModule, CommonModule, InputNumberModule, ButtonModule, GalleryComponent],
  templateUrl: './product-page.component.html',
  styles: ``
})
export class ProductPageComponent implements OnInit, OnDestroy {
addProductToCart() {
throw new Error('Method not implemented.');
}
  quantity?: number ;

  product: Product | undefined;
  endSubs$: Subject<any> = new Subject();
  constructor(private productService:ProductsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productid']) {
        this._getProducts(params['productid']);
      }
    })
  }

  // addProductToCart() {

  // }
  private _getProducts(id: string) {
    this.productService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(response => {
      this.product = response;
    });

  }

   ngOnDestroy(): void {
    this.endSubs$.next(this.product),
      this.endSubs$.complete()
  }

}
