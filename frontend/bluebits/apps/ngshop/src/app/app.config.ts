import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { routes } from '@bluebits/products';
import { JwtInterceptor, usersRoutes } from '@bluebits/users';
import { orderRoutes } from '@bluebits/orders';
import {  provideState, provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { usersReducer, USERS_FEATURE_KEY } from '@bluebits/users';
import { UsersEffects } from 'libs/users/src/lib/state/users.effects';
import { provideNgxStripe } from 'ngx-stripe';




export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxStripe('pk_test_51QdYdBP1oGOAo5TtKpj1aD25lrNRvM5qSdFIllmXgnoBkqbPQJRpAnIq7AiolfOKf2MDnjbyF1UTWNPu20I1fjJK005SImLr5O'),
     provideStore(),
  provideState(USERS_FEATURE_KEY, usersReducer),
  provideEffects([UsersEffects]),
    provideRouter([ ...routes, ...appRoutes, ...orderRoutes, ...usersRoutes ]),
    importProvidersFrom(
    //   StoreModule.forRoot({}),
    //   StoreModule.forFeature(USERS_FEATURE_KEY, usersReducer),
    //   EffectsModule.forRoot([]),
    
    // EffectsModule.forFeature([UsersEffects]),
      BrowserModule,
      AccordionModule,
      BrowserAnimationsModule,
      HttpClientModule),
    
        {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true}

  ],
};
