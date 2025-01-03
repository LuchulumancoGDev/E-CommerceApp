import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { Order, OrderService, ORDER_STATUS} from '@bluebits/orders';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'admin-orders-detail',
    providers: [MessageService, ConfirmationService],
    imports: [CardModule, TagModule, FormsModule, DropdownModule, FieldsetModule, ToolbarModule, CommonModule, ConfirmDialogModule, ColorPickerModule, ToastModule, ButtonModule, TableModule, RouterModule],
    templateUrl: './orders-detail.component.html',
    styleUrl: './orders-detail.component.css'
})
export class OrdersDetailComponent implements OnInit {
  order?: Order;
  orderStatuses: any;
  selectedStatus: any;
  constructor(private orderService:OrderService, private route: ActivatedRoute,  private messageService: MessageService) { }


  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();

  }

  private _mapOrderStatus() {
   this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
     return {
       id: key,
       name: ORDER_STATUS[+key].label
     };
});


  }

  private _getOrder() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderService.getOrder(params['id']).subscribe(order => {
          this.order = order;
          if (this.order)
          {
            this.selectedStatus = this.order.status;
          }
       })
      }
    })

  }

  onStatusChange(event:any) {
    this.orderService.updateOrder({ status: event.value }, this.order?.id).subscribe(order => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order is updated` });

    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:'Order is not updated'
      })
   })

  }


}
