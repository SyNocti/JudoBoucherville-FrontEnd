import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Professeur } from '../../models/Professeur';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-professeurs-index',
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './professeurs-index.component.html',
  styleUrl: './professeurs-index.component.css'
})
export class ProfesseursIndexComponent implements OnInit {
  professeurs: Professeur[] = [];
  anciensProfesseurs: Professeur[] = [];
  professeursGroupes: { [affiliation: string]: Professeur[] } = {};
  anciensGroupes: { [affiliation: string]: Professeur[] } = {};
  loading: boolean = true;
  error: boolean = false;
  
  // Define the order of affiliations
  affiliationOrder = ['Judo', 'Aiki Ju-Jitsu', 'Jiu-Jitsu brésilien'];

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.loadProfesseurs();
  }

  private loadProfesseurs(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getProfesseurs().subscribe({
      next: (professeurs) => {
        // Separate current and former professors
        this.professeurs = professeurs.filter(p => !p.estAncien);
        this.anciensProfesseurs = professeurs.filter(p => p.estAncien);
        
        // Group professors by affiliation
        this.professeursGroupes = this.groupByAffiliation(this.professeurs);
        this.anciensGroupes = this.groupByAffiliation(this.anciensProfesseurs);
        
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading professeurs:', error);
        this.loading = false;
        this.error = true;
        this.professeurs = [];
        this.anciensProfesseurs = [];
      }
    });
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return this.getDefaultImageUrl();
    return this.configService.getImageUrl(imagePath);
  }

  getDefaultImageUrl(): string {
    return 'assets/images/default-profile.png';
  }

  private groupByAffiliation(professeurs: Professeur[]): { [affiliation: string]: Professeur[] } {
    return professeurs.reduce((groups, professeur) => {
      const affiliation = professeur.affiliation || 'Autre';
      if (!groups[affiliation]) {
        groups[affiliation] = [];
      }
      groups[affiliation].push(professeur);
      return groups;
    }, {} as { [affiliation: string]: Professeur[] });
  }

  getOrderedAffiliations(groups: { [affiliation: string]: Professeur[] }): string[] {
    const availableAffiliations = Object.keys(groups);
    const ordered: string[] = [];
    
    // Add affiliations in the specified order if they exist
    this.affiliationOrder.forEach(affiliation => {
      if (availableAffiliations.includes(affiliation)) {
        ordered.push(affiliation);
      }
    });
    
    // Add any remaining affiliations that aren't in the predefined order
    availableAffiliations.forEach(affiliation => {
      if (!this.affiliationOrder.includes(affiliation)) {
        ordered.push(affiliation);
      }
    });
    
    return ordered;
  }
}
