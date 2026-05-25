import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Resultat } from '../../models/Resultat';

@Component({
  selector: 'app-resultat-table',
  imports: [CommonModule],
  templateUrl: './resultat-table.component.html',
  styleUrl: './resultat-table.component.css'
})
export class ResultatTableComponent {
  @Input() resultats: Resultat[] = [];
  @Input() showAthleteName: boolean = true;
  @Input() showCompetitionName: boolean = true;

  constructor(private router: Router) { }

  onAthleteClick(athleteId: number): void {
    this.router.navigate(['/athletes/profile', athleteId]);
  }

  onCompetitionClick(competitionId: number): void {
    this.router.navigate(['/competition/detail', competitionId]);
  }

  getPositionClass(position?: number): string {
    if (!position) {
      return 'position-other';
    }

    switch (position) {
      case 1:
        return 'position-gold';
      case 2:
        return 'position-silver';
      case 3:
        return 'position-bronze';
      default:
        return 'position-other';
    }
  }

  getPositionDisplay(position?: number): string {
    if (!position) {
      return 'N/A';
    }

    switch (position) {
      case 1:
        return '1ère';
      case 2:
        return '2ème';
      case 3:
        return '3ème';
      default:
        return position + 'ème';
    }
  }

  getAgeCategoryDisplay(category: string): string {
    switch (category) {
      case 'U21_Senior':
        return 'U21/Senior';
      case 'Veteran':
        return 'Vétéran';
      case 'Ne_Waza':
        return 'Ne Waza';
      default:
        return category; // U10, U12, U14, U16, U18, U21, Senior stay the same
    }
  }
}
