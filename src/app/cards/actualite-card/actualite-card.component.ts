import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActualiteSummary } from '../../models/ActualiteSummary';

@Component({
  selector: 'app-actualite-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actualite-card.component.html',
  styleUrl: './actualite-card.component.css'
})
export class ActualiteCardComponent {
  @Input() actualite!: ActualiteSummary;

  // Format date to display in a user-friendly way
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
