import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'orders-cart-page',
  standalone: true,
  imports: [ButtonModule,CommonModule,InputNumberModule],
  templateUrl: './cart-page.component.html',
  styles: ``
})
export class CartPageComponent implements OnInit {

  constructor(private router: Router) {

  }

ngOnInit(): void {
console.log("Method not implemented");

}

backToShop() {
  this.router.navigate(['/products']);
}

  deleteCartItem() {
    console.log("test delete");

  }
}
