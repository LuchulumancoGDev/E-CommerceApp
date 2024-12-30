import { Route } from "@angular/router";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

export const orderRoutes: Route[] = [
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },

];


