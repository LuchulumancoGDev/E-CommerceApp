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
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'admin-orders-list',
  standalone: true,
  providers:[MessageService, ConfirmationService],
  imports: [CardModule, ToolbarModule,CommonModule,ConfirmDialogModule,ColorPickerModule, ToastModule, ButtonModule, TableModule, RouterModule],
  templateUrl: './orders-list.component.html'

})
export class OrdersListComponent implements OnInit {


  orders: Order[] =[] ;

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
      console.log(this.orders );
    })



  }

  onDelete(arg0: any) {
throw new Error('Method not implemented.');
}
showOrder(arg0: any) {
throw new Error('Method not implemented.');
}
}
