import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'lib-products-list',
    imports: [CommonModule, ProductItemComponent, CheckboxModule, FormsModule],
    templateUrl: './products-list.component.html',
    styles: ``
})
export class ProductsListComponent implements OnInit {

  products: Product[] =[];
  categories: Category[]=[];
  isCategoryPage?:boolean;
constructor(private productService: ProductsService, private categoryService: CategoriesService, private route:ActivatedRoute){

}


  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });

    this._getCategories();
  }


   private _getProducts(categoriesFilter?:string[]){
    this.productService.getProducts(categoriesFilter).subscribe(products =>{
      this.products= products;
    });
   }

   private _getCategories(){
    this.categoryService.getCategories().subscribe(cats=>{
      this.categories = cats;
    })
   }

   categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id)
      .filter((id): id is string => id !== undefined);

    this._getProducts(selectedCategories);
  }

}
