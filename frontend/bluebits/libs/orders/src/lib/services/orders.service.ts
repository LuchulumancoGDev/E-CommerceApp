import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl + 'orders';
  baseProductsUrl = environment.apiUrl + 'products';
  constructor(private http: HttpClient) { }


  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl)
  }

  getOrder(OrderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${OrderId}`)
  }

  createOrder(Order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}`, Order)
  }
getProduct(productId?: string): Observable<any> {
    return this.http.get<any>(`${this.baseProductsUrl}/${productId}`)
  }
 updateOrder(orderStatus: {status:string}, orderId?:string): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${orderId}`,orderStatus)
  }



  deleteOrder(OrderId: string): Observable<object>{
    return this.http.delete<object>(`${this.baseUrl}/${OrderId}`)
  }
}
