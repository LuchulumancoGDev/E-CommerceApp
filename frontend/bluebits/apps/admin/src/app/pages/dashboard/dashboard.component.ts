import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Order, OrderService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { UsersService } from '@bluebits/users';

@Component({
    selector: 'admin-dashboard',
    imports: [CommonModule, CardModule],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  orders: Order[] =[] ;
  products:any;
  users: any;
  totalSales=0;
  constructor( private orderService: OrderService,private productsService: ProductsService,private usersService: UsersService,){

      this.orderService.getOrders().subscribe((orders) => {
        this.orders = orders;
        let total = 0;
        this.orders.forEach(order => {
          const priceStr = order.totalPrice ?? '0';
          total += parseFloat(priceStr);
        });
        this.totalSales = total;
 
      });

      this.productsService.getProducts().subscribe((products) => {
        this.products = products;


      });
      this.usersService.getUsers().subscribe((users) => {
        this.users = users;


      });
    }


}
