import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AthleteSummary } from '../../models/AthleteSummary';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-athlete-card',
  imports: [CommonModule],
  templateUrl: './athlete-card.component.html',
  styleUrl: './athlete-card.component.css'
})
export class AthleteCardComponent {
  @Input() athlete!: AthleteSummary;

  constructor(
    private router: Router,
    private configService: ConfigService
  ) { }

  onCardClick(): void {
    this.router.navigate(['/athletes/profile', this.athlete.id]);
  }

  getProfilePicture(): string {
    if (this.athlete.profilePicture) {
      return this.configService.getImageUrl(this.athlete.profilePicture);
    }
    return this.getDefaultProfilePicture();
  }

  getDefaultProfilePicture(): string {
    return 'assets/images/default-profile.png';
  }

  getDisplayText(): string {
    if (this.athlete.finJudo) {
      return this.athlete.finJudo.toString();
    }
    return this.athlete.categorieAge;
  }
}
