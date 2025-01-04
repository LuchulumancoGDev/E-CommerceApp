import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../services/orders.service';
import { CartService } from '@bluebits/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-thank-you',
  imports: [ButtonModule, CommonModule],
     providers: [MessageService],
    templateUrl: './thank-you.component.html',
    styleUrl: './thank-you.component.css'
})
export class ThankYouComponent implements OnInit {

  constructor(private router: Router,private messageService: MessageService, private orderService: OrderService,private cartService: CartService,) {

  }
  ngOnInit(): void {
    const orderData = this.orderService.getCachedOrderData();

     this.orderService.createOrder(orderData).subscribe(() => {
      //redirect
      this.show("placed");
       this.cartService.emptyCart();
       this.orderService.removeCachedOrderData();
      //this.router.navigate(['/success']);

    }, () => {
      console.log("Error something went wrong");

    })

  }

  show(action:string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Successfully ${action} order` });
  }
  backToHome() {
    this.router.navigate(['/']);
  }
}
