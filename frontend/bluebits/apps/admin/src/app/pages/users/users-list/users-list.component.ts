import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api'; // Correct import path
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { UsersService } from '../../../../../../../libs/users/src/lib/users.service';
import { ConfirmationService } from 'primeng/api'; // Correct import path
import { Router, RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import * as countries from 'i18n-iso-countries';

declare const require: (arg0: string) => countries.LocaleData;
@Component({
    selector: 'admin-users-list',
    providers: [MessageService, ConfirmationService],
    imports: [CardModule, ToolbarModule, CommonModule, TagModule, ConfirmDialogModule, ColorPickerModule, ToastModule, ButtonModule, TableModule, RouterModule],
    templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
  users: any;

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  getCountryName(data: string)
  {
     countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

    return countries.getName(data, "en");
  }

  onDelete(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          r => {
            this._getUsers();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User has not been deleted' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
 

    });
  }
}
