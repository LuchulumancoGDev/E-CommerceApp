import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
export const CART_KEY = "cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  initCartLocalStorage() {
    const initialCart = {
      items: []
    }
    const initialCartJson = JSON.stringify(initialCart)

    localStorage.setItem(CART_KEY,initialCartJson);
  }


  getCart(): Cart{
    const cartJsonString: string = localStorage.getItem(CART_KEY) || '{}';
    const cart: Cart = JSON.parse(cartJsonString);
    return cart
  }

 setCartItem(cartItem: CartItem): Cart {
   const cart = this.getCart();
   const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
   if (cartItemExist)
   {
     cart.items?.map((item) => {
       if (item.productId === cartItem.productId) {
         item.quantity = (item.quantity || 0) + (cartItem.quantity || 0);
         return item;
       }
     });
   }
   else {

    cart.items?.push(cartItem);
   }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
}

}
