import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'admin-products-list',
    providers: [MessageService, ConfirmationService],
    imports: [CardModule, ToolbarModule, CommonModule, PaginatorModule, ConfirmDialogModule, ColorPickerModule, ToastModule, ButtonModule, TableModule, RouterModule],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{
  products:any;

  constructor(private productsService: ProductsService,private router: Router,   private messageService: MessageService,  private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
    this._getProducts();
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
}
onDelete(productId: string) {
   this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptIcon: "none",
        rejectIcon: "none",

        accept: () => {
            this.productsService.deleteProduct(productId).subscribe(
                r => {
                    this._getProducts();
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is deleted' });
                },
                (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product has not been deleted' });
              }

          );
          console.log();

        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
}


  private _getProducts() {

    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
 

    });


  }

}
