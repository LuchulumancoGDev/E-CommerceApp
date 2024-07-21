import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
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

  // getCategory(categoryId: string): Observable<Category> {
  //   return this.http.get<Category>(`${this.baseUrl}/${categoryId}`)
  // }

  // createCategory(category: Category):Observable<Category>{
  //   return this.http.post<Category>(this.baseUrl, category)
  // }

  // updateCategory(category: Category):Observable<Category>{
  //   return this.http.put<Category>(this.baseUrl+'/'+category.id, category)
  // }

  // deleteCategory(categoryId: string): Observable<object>{
  //   return this.http.delete<object>(`${this.baseUrl}/${categoryId}`)
  // }
}
