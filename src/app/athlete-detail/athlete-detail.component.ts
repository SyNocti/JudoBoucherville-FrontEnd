import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AthleteDetail } from '../models/AthleteDetail';
import { Resultat } from '../models/Resultat';
import { ResultatTableComponent } from '../reusables/resultat-table/resultat-table.component';
import { PageTitleComponent } from '../reusables/page-title/page-title.component';

@Component({
  selector: 'app-athlete-detail',
  imports: [CommonModule, ResultatTableComponent, PageTitleComponent],
  templateUrl: './athlete-detail.component.html',
  styleUrl: './athlete-detail.component.css'
})
export class AthleteDetailComponent implements OnInit {
  athlete: AthleteDetail | null = null;
  loading: boolean = true;
  interestingResults: Resultat[] = [];
  otherResults: Resultat[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadAthleteDetail(id);
    });
  }

  private loadAthleteDetail(id: number): void {
    this.loading = true;

    this.apiService.getAthleteDetail(id).subscribe({
      next: (athlete) => {
        this.athlete = athlete;
        if (athlete?.listeResultats) {
          this.interestingResults = athlete.listeResultats.filter(r => r.estInteressant);
          this.otherResults = athlete.listeResultats.filter(r => !r.estInteressant);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading athlete:', error);
        this.loading = false;
      }
    });
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  getJudoExperience(): number | null {
    if (!this.athlete?.debutJudo) return null;
    return new Date().getFullYear() - this.athlete.debutJudo;
  }

  // Statistics methods
  getFirstPlaces(): number {
    return this.athlete?.listeResultats?.filter(r => r.position === 1).length || 0;
  }

  getSecondPlaces(): number {
    return this.athlete?.listeResultats?.filter(r => r.position === 2).length || 0;
  }

  getThirdPlaces(): number {
    return this.athlete?.listeResultats?.filter(r => r.position === 3).length || 0;
  }

  getTotalWins(): number {
    return this.athlete?.listeResultats?.reduce((total, result) => total + result.nbVictoire, 0) || 0;
  }

  getTotalLosses(): number {
    return this.athlete?.listeResultats?.reduce((total, result) => total + result.nbDefaites, 0) || 0;
  }

  getWinRatio(): number {
    const wins = this.getTotalWins();
    const losses = this.getTotalLosses();
    const total = wins + losses;

    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
  }
}
