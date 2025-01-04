import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';
import { StripeService } from 'ngx-stripe';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl + 'orders';
  baseProductsUrl = environment.apiUrl + 'products';
  constructor(private http: HttpClient, private stripeService: StripeService) { }


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

  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http.post<{ id: string }>(`${this.baseUrl}/create-checkout-session`, orderItem).pipe(
      switchMap((session) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.id });
      })
    );
  }

  cacheOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  getCachedOrderData():Order {
   return JSON.parse(localStorage.getItem('orderData') ?? '');
  }

  removeCachedOrderData() {
    localStorage.removeItem('orderData')
  }
}
