import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AthleteSummary } from '../models/AthleteSummary';
import { AthleteCardComponent } from '../cards/athlete-card/athlete-card.component';

@Component({
  selector: 'app-athlete-index',
  imports: [CommonModule, AthleteCardComponent],
  templateUrl: './athlete-index.component.html',
  styleUrl: './athlete-index.component.css'
})
export class AthleteIndexComponent implements OnInit {
  athletes: AthleteSummary[] = [];
  team: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.team = params['team'] || 'boucherville';
      this.loadAthletes();
    });
  }

  private loadAthletes(): void {
    this.loading = true;

    this.apiService.getAllAthletes().subscribe({
      next: (athletes) => {
        this.athletes = athletes;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading athletes:', error);
        this.loading = false;
      }
    });
  }

  getTeamDisplayName(): string {
    switch (this.team.toLowerCase()) {
      case 'recreation':
        return 'Équipe Récréation';
      case 'competition':
        return 'Équipe Compétition';
      case 'elite':
        return 'Équipe Élite';
      case 'Équipe Boucherville':
      default:
        return 'Équipe Boucherville';
    }
  }

  trackByAthleteId(index: number, athlete: AthleteSummary): number {
    return athlete.id;
  }
}
