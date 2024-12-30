import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { OrderItem } from '../../models/orderItem';
import { CardModule } from 'primeng/card';
import { OrderSummaryComponent } from "../../components/order-summary/order-summary.component";
import * as countriesLib from 'i18n-iso-countries';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

import en from 'i18n-iso-countries/langs/en.json';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrderService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../order.constants';

@Component({
  selector: 'orders-checkout-page',
  standalone: true,
   providers:[MessageService],
  imports: [CardModule, EditorModule, InputMaskModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputNumberModule, ToolbarModule, CommonModule, ColorPickerModule, ToastModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, OrderSummaryComponent],
  templateUrl: './checkout-page.component.html',
  styles: ``
})
export class CheckoutPageComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService
  ) {}
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId="609d65943373711346c5e950";
countries: { id: string; name: string; }[] = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map(item => {
      return {
        product: item.productId,
        quantity:item.quantity
      }
    });

    console.log(this.orderItems);

  }
  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  // private _getCountries() {
  //   this.countries = this.usersService.getCountries();
  // }

  private _getCountries() {
    countriesLib.registerLocale(en);  // Use the imported JSON directly
    this.countries = Object.entries(countriesLib.getNames("en", { select: "official" })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order={
        orderItems: this.orderItems,
        shippingAddress1: this.checkoutForm['street'].value,
        shippingAddress2: this.checkoutForm['apartment'].value,
        city: this.checkoutForm['city'].value,
        zip: this.checkoutForm['zip'].value,
        country: this.checkoutForm['country'].value,
        phone: this.checkoutForm['phone'].value,
        status: Object.keys(ORDER_STATUS)[0],
        user: this.userId,
        dateOrdered: Date.now().toString(),
    }

    this.orderService.createOrder(order).subscribe(() => {
      //redirect
      console.log("Successful");

    })
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
