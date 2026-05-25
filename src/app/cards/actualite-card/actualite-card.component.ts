import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActualiteSummary } from '../../models/ActualiteSummary';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-actualite-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actualite-card.component.html',
  styleUrl: './actualite-card.component.css'
})
export class ActualiteCardComponent {
  @Input() actualite!: ActualiteSummary;

  constructor(private configService: ConfigService) { }

  // Format date to display in a user-friendly way
  formatDate(date: Date | undefined | null): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Check if date exists and should be displayed
  hasDate(date: Date | undefined | null): boolean {
    return !!date;
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return this.getDefaultImageUrl();
    return this.configService.getImageUrl(imagePath);
  }

  getDefaultImageUrl(): string {
    return '/assets/images/logos/logo-medium.png';
  }

  isDefaultImage(imagePath: string | undefined): boolean {
    return !imagePath;
  }
}
