import { Route } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';



export const routes: Route[] = [
    { path: 'products', component: ProductsListComponent },
    { path: 'category/:categoryid', component: ProductsListComponent }
];


