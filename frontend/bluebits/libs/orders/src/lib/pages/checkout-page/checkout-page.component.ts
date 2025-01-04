import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { InputTextarea } from 'primeng/inputtextarea';
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
import { Subject, take, takeUntil } from 'rxjs';
import { StripeService } from 'ngx-stripe';

@Component({
    selector: 'orders-checkout-page',
    providers: [MessageService],
    imports: [CardModule, EditorModule, InputMaskModule, DropdownModule, InputSwitchModule, InputTextModule, InputNumberModule, ToolbarModule, CommonModule, ColorPickerModule, ToastModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, OrderSummaryComponent],
    templateUrl: './checkout-page.component.html',
    styles: ``
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private messageService: MessageService, 
    
  ) {}

  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId:string | undefined;
  countries: { id: string; name: string; }[] = [];
  unsubscribe$: Subject<any> = new Subject();

  ngOnInit(): void {
    this._initCheckoutForm();
     this._autoFillUserData();
    this._getCartItems();
    this._getCountries();

  }

    ngOnDestroy(): void {
      this.unsubscribe$.next(this.checkoutForm);
      this.unsubscribe$.complete();
  }

 private _autoFillUserData() {
   this.usersService.observeCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      console.log(user,'Testing');

     if (user) {
       this.userId = user.id;
      this.checkoutForm['name'].setValue(user?.name);
      this.checkoutForm['email'].setValue(user?.email);
       this.checkoutForm['phone'].setValue(user?.phone);
        this.checkoutForm['city'].setValue(user?.city);
         this.checkoutForm['country'].setValue(user?.country);
          this.checkoutForm['zip'].setValue(user?.zip);
           this.checkoutForm['apartment'].setValue(user?.apartment);
            this.checkoutForm['street'].setValue(user?.street);
      }

    })
  }
  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map(item => {
      return {
        product: item.productId,
        quantity:item.quantity
      }
    });


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

    
    const order: Order = {
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
    };

    this.orderService.cacheOrderData(order);

   this.orderService.createCheckoutSession(this.orderItems).subscribe((error) => {
      if (error)
      {
        console.log('error in redirect to payment');
        
      }
      
    });  

  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
   show( action:string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Successfully ${action} order` });
  }
}
