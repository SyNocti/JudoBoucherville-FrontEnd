import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompetitionSummary } from '../../models/CompetitionSummary';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-competition-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.css'
})
export class CompetitionCardComponent {
  @Input() competition!: CompetitionSummary;

  constructor(private configService: ConfigService) { }

  // Format date to display in a user-friendly way
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Calculate total medals
  getTotalMedals(): number {
    return this.competition.medals.gold + this.competition.medals.silver + this.competition.medals.bronze;
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
