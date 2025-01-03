import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Order, OrderService } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ORDER_STATUS } from '@bluebits/orders';




@Component({
    selector: 'admin-orders-list',
    providers: [MessageService, ConfirmationService],
    imports: [CardModule, TagModule, ToolbarModule, CommonModule, ConfirmDialogModule, ColorPickerModule, ToastModule, ButtonModule, TableModule, RouterModule],
    templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {


  orders: Order[] =[] ;
  orderStatus = ORDER_STATUS;
  constructor(
    private orderService: OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;

    })



  }

  onDelete(orderId: string) {
this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptIcon: "none",
        rejectIcon: "none",

        accept: () => {
            this.orderService.deleteOrder(orderId).subscribe(
                r => {
                     this._getOrders();
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order is deleted' });
                },
                (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category has not been deleted' });
              }

          );


        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
  }

showOrder(orderId: any) {
  this.router.navigateByUrl(`orders/${orderId}`)
  }

}
