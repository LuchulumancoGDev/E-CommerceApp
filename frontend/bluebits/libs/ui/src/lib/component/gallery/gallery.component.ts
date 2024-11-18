import { Component } from '@angular/core';

@Component({
  selector: 'lib-ui-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styles: ``
})
export class GalleryComponent {

  selectedImage?: string ='data:image/jpeg;base64,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';
}
