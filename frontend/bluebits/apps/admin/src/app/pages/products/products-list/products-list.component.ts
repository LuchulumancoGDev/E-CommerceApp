import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'admin-products-list',
  standalone: true,
  providers:[MessageService, ConfirmationService],
  imports: [CardModule, ToolbarModule,CommonModule,ConfirmDialogModule,ColorPickerModule,ToastModule, ButtonModule ,TableModule,RouterModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{
updateProduct(arg0: any) {
throw new Error('Method not implemented.');
}
onDelete(arg0: any) {
throw new Error('Method not implemented.');
}

  products:any;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this._getProducts();
  }


  private _getProducts() {

    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });


  }

}
