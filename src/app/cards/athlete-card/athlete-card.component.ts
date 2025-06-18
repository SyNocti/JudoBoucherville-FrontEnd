import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AthleteSummary } from '../../models/AthleteSummary';

@Component({
  selector: 'app-athlete-card',
  imports: [CommonModule],
  templateUrl: './athlete-card.component.html',
  styleUrl: './athlete-card.component.css'
})
export class AthleteCardComponent {
  @Input() athlete!: AthleteSummary;

  constructor(private router: Router) { }

  onCardClick(): void {
    this.router.navigate(['/athlete', this.athlete.id]);
  }

  getDefaultProfilePicture(): string {
    return 'assets/images/default-profile.png';
  }
}
