import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 baseUrl = environment.apiUrl + 'categories';
  constructor(private http: HttpClient) { }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl)
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${categoryId}`)
  }

  createCategory(category: Category):Observable<Category>{
    return this.http.post<Category>(this.baseUrl, category)
  }

  updateCategory(category: Category):Observable<Category>{
    return this.http.put<Category>(this.baseUrl+'/'+category.id, category)
  }

  deleteCategory(categoryId: string): Observable<object>{
    return this.http.delete<object>(`${this.baseUrl}/${categoryId}`)
  }
}
