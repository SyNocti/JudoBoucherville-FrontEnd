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
    this.router.navigate(['/athlete', athleteId]);
  }

  onCompetitionClick(competitionId: number): void {
    this.router.navigate(['/competition', competitionId]);
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
}
