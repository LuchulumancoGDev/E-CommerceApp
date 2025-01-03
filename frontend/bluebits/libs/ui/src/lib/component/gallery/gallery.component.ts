import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'lib-ui-gallery',
    imports: [CommonModule],
    templateUrl: './gallery.component.html',
    styles: ``
})
export class GalleryComponent implements OnInit {



 selectedImageUrl?: string ;

  @Input() images?:string[];


  ngOnInit(): void {
    if (this.hasImages) {
         this.selectedImageUrl = this.images![0];
      }

  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl
  }

   get hasImages() {
    return this.images?.length ? true : false; 
  }
}
