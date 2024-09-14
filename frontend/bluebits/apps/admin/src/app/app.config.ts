import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
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
import { TagModule } from 'primeng/tag';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';



export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(),
    provideRouter([...appRoutes, ...routes]),
    importProvidersFrom(
      CardModule,
      EditorModule,
      ToolbarModule,
      CommonModule,
      ConfirmDialogModule,
      ButtonModule,
      TableModule,
      HttpClientModule,
      InputTextModule,
      FormsModule,
      ReactiveFormsModule,
      ToastModule,
      BrowserAnimationsModule,
      TagModule,
      DropdownModule,
      FieldsetModule,
      InputSwitchModule,
      InputTextareaModule,
      InputNumberModule,
      PaginatorModule,
      RouterModule,
      ColorPickerModule,
      InputMaskModule
    ),
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true}
  ],
};
