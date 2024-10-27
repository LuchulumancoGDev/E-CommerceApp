import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'products-categories-banner',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './categories-banner.component.html',
  styles: ``
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories: Category[]=[];
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) {

  }
 
  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(category =>{
      this.categories = category;
      console.log(this.categories);
      
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

}
