import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '@bluebits/products';
import { usersRoutes } from '@bluebits/users';
import { orderRoutes } from '@bluebits/orders';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([ ...routes, ...appRoutes, ...orderRoutes, ...usersRoutes ]),
    importProvidersFrom(BrowserModule, AccordionModule,BrowserAnimationsModule,HttpClientModule)

  ],
};
