import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { CompetitionDetail } from '../../models/CompetitionDetail';
import { Resultat } from '../../models/Resultat';
import { ResultatTableComponent } from '../../reusables/resultat-table/resultat-table.component';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';

@Component({
  selector: 'app-competition-detail',
  imports: [CommonModule, ResultatTableComponent, PageTitleComponent],
  templateUrl: './competition-detail.component.html',
  styleUrl: './competition-detail.component.css'
})
export class CompetitionDetailComponent implements OnInit {
  competition: CompetitionDetail | null = null;
  loading: boolean = true;
  allResults: Resultat[] = [];

  // Statistics variables
  totalParticipants: number = 0;
  goldMedals: number = 0;
  silverMedals: number = 0;
  bronzeMedals: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadCompetitionDetail(id);
    });
  }

  private loadCompetitionDetail(id: number): void {
    this.loading = true;

    this.apiService.getCompetitionDetail(id).subscribe({
      next: (competition) => {
        this.competition = competition;
        if (competition?.listeResultats) {
          this.allResults = competition.listeResultats;
          this.calculateStatistics();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading competition:', error);
        this.loading = false;
      }
    });
  }

  private calculateStatistics(): void {
    if (!this.competition?.listeResultats || this.competition.listeResultats.length === 0) {
      this.resetStatistics();
      return;
    }

    const results = this.competition.listeResultats;

    // Calculate total participants
    this.totalParticipants = results.length;

    // Calculate medals
    this.goldMedals = results.filter(r => r.position === 1).length;
    this.silverMedals = results.filter(r => r.position === 2).length;
    this.bronzeMedals = results.filter(r => r.position === 3).length;
  }

  private resetStatistics(): void {
    this.totalParticipants = 0;
    this.goldMedals = 0;
    this.silverMedals = 0;
    this.bronzeMedals = 0;
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Image handling methods
  getImageUrl(imagePath?: string): string {
    if (!imagePath) return this.getDefaultImageUrl();
    return this.configService.getImageUrl(imagePath);
  }

  getDefaultImageUrl(): string {
    return 'assets/images/default-competition.png';
  }

  getTitle(): string {
    return this.competition!!.nom + " " + new Date(this.competition!!.date).getFullYear().toString();
  }
}
