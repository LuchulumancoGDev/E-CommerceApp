import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Router, RouterModule } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
    selector: 'admin-categories-list',
    providers: [MessageService, ConfirmationService],
    imports: [CardModule, ToolbarModule, CommonModule, ConfirmDialogModule, ColorPickerModule, ToastModule, ButtonModule, TableModule, RouterModule],
    templateUrl: './categories-list.component.html',
    styles: ``
})
export class CategoriesListComponent implements OnInit{

  categories: Category[] = [];
  constructor(private categoryService: CategoriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router

  ) { }


  ngOnInit(): void {

    this.getCategories();

  }

  onDelete(categoryId: string) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptIcon: "none",
        rejectIcon: "none",

        accept: () => {
            this.categoryService.deleteCategory(categoryId).subscribe(
                r => {
                    this.getCategories();
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted' });
                },
                (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category has not been deleted' });
              }

          );
          console.log();

        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;

    })
  }

}
