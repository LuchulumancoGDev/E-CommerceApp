import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'admin-categories-list',
  standalone: true,
   providers:[MessageService, ConfirmationService],
  imports: [CardModule, ToolbarModule,CommonModule,ConfirmDialogModule, ToastModule, ButtonModule, TableModule, RouterModule],
  templateUrl: './categories-list.component.html',
  styles: ``
})
export class CategoriesListComponent implements OnInit{

  categories: Category[] = [];
  constructor(private categoryService: CategoriesService,private confirmationService: ConfirmationService,private messageService: MessageService) { }


  ngOnInit(): void {
    
    this.getCategories();
    
  }

  onDelete(categoryId: string) {
    this.categoryService.deleteCategory(categoryId).subscribe(r => {
      this.getCategories();
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted' });
    },
      (error)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category has not been deleted' });
      }
    )
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;
      
    })
  }
  
}
