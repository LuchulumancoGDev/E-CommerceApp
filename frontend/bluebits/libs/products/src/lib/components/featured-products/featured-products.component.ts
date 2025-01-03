import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'lib-products-featured-products',
    imports: [ProductItemComponent, CommonModule, RouterModule],
    templateUrl: './featured-products.component.html',
    styles: ``
})
export class FeaturedProductsComponent implements OnInit, OnDestroy{

  featuredProducts: Product[] =[];
  endSubs$ : Subject<any> = new Subject();
  constructor(private prodService: ProductsService){

  }



  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  private _getFeaturedProducts(){
    this.prodService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(products=>{
      this.featuredProducts =products.products


    })
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();

  }
}
