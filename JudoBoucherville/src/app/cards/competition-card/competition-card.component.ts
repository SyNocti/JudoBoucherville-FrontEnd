import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompetitionSummary } from '../../models/CompetitionSummary';

@Component({
  selector: 'app-competition-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.css'
})
export class CompetitionCardComponent {
  @Input() competition!: CompetitionSummary;

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
}
