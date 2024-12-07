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

 setCartItem(cartItem: CartItem): Cart {
    const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    if (!cart.items) {
        cart.items = [];
    }
    cart.items.push(cartItem);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
}

}
