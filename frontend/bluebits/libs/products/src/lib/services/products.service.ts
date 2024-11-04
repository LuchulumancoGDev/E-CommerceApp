import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 baseUrl = environment.apiUrl + 'products';
  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`)
  }

  createProduct(productData: FormData):Observable<Product>{
    return this.http.post<Product>(this.baseUrl, productData);
  }

  updateProduct(product: FormData, productId: string):Observable<Product>{
    return this.http.put<Product>(this.baseUrl+'/'+productId, product)
  }

  deleteProduct(productId: string): Observable<object>{
    return this.http.delete<object>(`${this.baseUrl}/${productId}`)
  }

  getProductsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/get/count`)
    .pipe(map((objectValue:any) => objectValue.productCount));
  }

  getFeaturedProducts(count:number): Observable<{products:Product[]}>{
    return this.http.get<{products:Product[]}>(`${this.baseUrl}/get/featured/${count}`)
  }
}
