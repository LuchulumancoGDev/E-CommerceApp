import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { AuthGuardService } from '@bluebits/users';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate:[AuthGuardService],
    component: ShellComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
        {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
        {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
        {
        path: 'users/form',
        component: UsersFormComponent
      },
        {
        path: 'users/form/:id',
        component: UsersFormComponent
      },
        {
        path: 'products',
        component: ProductsListComponent
      },
        {
        path: 'products/form',
        component: ProductsFormComponent
      },
        {
        path: 'products/form/:id',
        component: ProductsFormComponent
      },
        {
        path: 'orders',
        component: OrdersListComponent
      },

        {
        path: 'orders/:id',
        component: OrdersDetailComponent
      },

    ]
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  }
];
