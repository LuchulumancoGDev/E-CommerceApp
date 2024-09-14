import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from 'primeng/editor';
import { routes } from 'libs/users/src/lib/lib.routes';
import { JwtInterceptor } from '@bluebits/users';



export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(),
    provideRouter([...appRoutes, ...routes]),
    importProvidersFrom(CardModule,EditorModule, ToolbarModule, ConfirmDialogModule, ButtonModule,TableModule, HttpClientModule, InputTextModule,FormsModule,ReactiveFormsModule, CommonModule,ToastModule,BrowserAnimationsModule),
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true}
  ],
};
