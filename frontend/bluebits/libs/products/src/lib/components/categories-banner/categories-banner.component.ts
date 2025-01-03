import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'lib-products-categories-banner',
    imports: [CommonModule, RouterModule, CarouselModule],
    templateUrl: './categories-banner.component.html',
    styles: ``
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  responsiveOptions: any[] | undefined;
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) {

  }

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(category => {
      this.categories = category;
      console.log(this.categories);

    });
     this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
  }

  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

}
