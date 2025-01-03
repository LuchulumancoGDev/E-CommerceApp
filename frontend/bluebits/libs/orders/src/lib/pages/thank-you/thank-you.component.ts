import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'orders-thank-you',
    imports: [ButtonModule, CommonModule],
    templateUrl: './thank-you.component.html',
    styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {

  constructor(private router: Router) {

  }

  backToHome() {
    this.router.navigate(['/']);
  }
}
