import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
