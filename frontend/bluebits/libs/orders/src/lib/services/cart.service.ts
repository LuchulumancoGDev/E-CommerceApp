import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';
export const CART_KEY = "cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor() { }

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart.items) {
      const initialCart = {
        items: []
      };
      const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY,initialCartJson);
    }


  }

  emptyCart() {
    const initialCart = {
        items: []
    };
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY, initialCartJson);
    this.cart$.next(initialCart);
  }


  getCart(): Cart{
    const cartJsonString: string = localStorage.getItem(CART_KEY) || '{"items":[]}';
    const cart: Cart = JSON.parse(cartJsonString);
    return cart
  }

 setCartItem(cartItem: CartItem, updateCartItem?:boolean): Cart {
   const cart = this.getCart();
   const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
   if (cartItemExist)
   {
     cart.items?.map(item => {
       if (item.productId === cartItem.productId) {
         if (updateCartItem) {
           item.quantity = (cartItem.quantity || 0);
         }
         else {
           item.quantity = (item.quantity || 0) + (cartItem.quantity || 0);
         }


       }
     });
   }
   else {

    cart.items?.push(cartItem);
   }

   localStorage.setItem(CART_KEY, JSON.stringify(cart));
   this.cart$.next(cart);
    return cart;
}

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items?.filter(item => item.productId !== productId);

    cart.items = newCart;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
  }
}
