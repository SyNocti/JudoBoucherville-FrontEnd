import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ChallengeInscription } from '../../models/ChallengeInscription';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';

@Component({
  selector: 'app-challenge-inscription',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, PageTitleComponent],
  templateUrl: './challenge-inscription.component.html',
  styleUrl: './challenge-inscription.component.css'
})
export class ChallengeInscriptionComponent implements OnInit {
  inscriptions: ChallengeInscription[] = [];
  loading: boolean = true;
  error: boolean = false;
  groupedInscriptions: Map<string, string[]> = new Map();
  categories: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadInscriptions();
  }

  loadInscriptions(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getChallengeInscriptions().subscribe({
      next: (data) => {
        this.inscriptions = data;
        this.groupInscriptionsByCategory();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading challenge inscriptions:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  private groupInscriptionsByCategory(): void {
    this.groupedInscriptions = new Map<string, string[]>();

    // Group inscriptions by category
    this.inscriptions.forEach(inscription => {
      const category = inscription.categorieAge;
      const teamName = inscription.nomEquipe;

      if (!this.groupedInscriptions.has(category)) {
        this.groupedInscriptions.set(category, []);
      }

      const teams = this.groupedInscriptions.get(category);
      if (teams) {
        teams.push(teamName);
      }
    });

    // Extract sorted categories
    this.categories = Array.from(this.groupedInscriptions.keys());
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

  retry(): void {
    this.loadInscriptions();
  }
}
