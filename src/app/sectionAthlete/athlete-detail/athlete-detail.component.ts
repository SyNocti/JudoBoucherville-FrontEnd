import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { AthleteDetail } from '../../models/AthleteDetail';
import { Resultat } from '../../models/Resultat';
import { ResultatTableComponent } from '../../reusables/resultat-table/resultat-table.component';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';
import { HttpErrorResponse } from '@angular/common/http';

enum CategorieAge {
  U10 = 'U10',
  U12 = 'U12',
  U14 = 'U14',
  U16 = 'U16',
  U18 = 'U18',
  U21 = 'U21',
  Senior = 'Senior',
  Veteran = 'Vétéran'
}

@Component({
  selector: 'app-athlete-detail',
  imports: [CommonModule, ResultatTableComponent, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './athlete-detail.component.html',
  styleUrl: './athlete-detail.component.css'
})
export class AthleteDetailComponent implements OnInit {
  athlete: AthleteDetail | null = null;
  loading: boolean = true;
  error: boolean = false;
  notFound: boolean = false;
  interestingResults: Resultat[] = [];
  otherResults: Resultat[] = [];

  // Statistics variables
  totalWins: number = 0;
  totalLosses: number = 0;
  firstPlaces: number = 0;
  secondPlaces: number = 0;
  thirdPlaces: number = 0;
  winRatio: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadAthleteDetail(id);
    });
  }

  private loadAthleteDetail(id: number): void {
    this.loading = true;
    this.error = false;
    this.notFound = false;

    this.apiService.getAthleteDetail(id).subscribe({
      next: (athlete) => {
        this.athlete = athlete;
        if (athlete?.listeResultats) {
          this.interestingResults = athlete.listeResultats.filter(r => r.estInteressant);
          this.otherResults = athlete.listeResultats.filter(r => !r.estInteressant);
        }
        // Calculate all statistics when athlete is loaded
        this.calculateStatistics();
        this.loading = false;
        this.error = false;
        this.notFound = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading athlete:', error);
        this.loading = false;
        this.athlete = null;

        // Check if it's a 404 error (not found)
        if (error.status === 404) {
          this.notFound = true;
          this.error = false;
        } else {
          // Any other error (500, network error, etc.)
          this.error = true;
          this.notFound = false;
        }
      }
    });
  }

  private calculateStatistics(): void {
    if (!this.athlete?.listeResultats || this.athlete.listeResultats.length === 0) {
      this.resetStatistics();
      return;
    }

    const results = this.athlete.listeResultats;

    // Calculate podium places
    this.firstPlaces = results.filter(r => r.position === 1).length;
    this.secondPlaces = results.filter(r => r.position === 2).length;
    this.thirdPlaces = results.filter(r => r.position === 3).length;

    // Calculate total wins and losses
    this.totalWins = results.reduce((total, result) => total + result.nbVictoire, 0);
    this.totalLosses = results.reduce((total, result) => total + result.nbDefaites, 0);

    // Calculate win ratio
    const totalFights = this.totalWins + this.totalLosses;
    this.winRatio = totalFights === 0 ? 0 : Math.round((this.totalWins / totalFights) * 100);
  }

  private resetStatistics(): void {
    this.totalWins = 0;
    this.totalLosses = 0;
    this.firstPlaces = 0;
    this.secondPlaces = 0;
    this.thirdPlaces = 0;
    this.winRatio = 0;
  }

  formatBirthDate(birthDate: Date): string {
    const date = new Date(birthDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  calculateCategorieAge(birthDate: Date): string {
    const today = new Date();
    const referenceYear = today.getMonth() >= 8 // September is month 8 (0-indexed)
      ? today.getFullYear() + 1
      : today.getFullYear();

    const birthYear = birthDate.getFullYear();
    const age = referenceYear - birthYear;

    if (age === 8 || age === 9) {
      return CategorieAge.U10;
    } else if (age === 10 || age === 11) {
      return CategorieAge.U12;
    } else if (age === 12 || age === 13) {
      return CategorieAge.U14;
    } else if (age === 14 || age === 15) {
      return CategorieAge.U16;
    } else if (age === 16 || age === 17) {
      return CategorieAge.U18;
    } else if (age >= 18 && age <= 20) {
      return CategorieAge.U21;
    } else if (age >= 30) {
      return CategorieAge.Veteran;
    } else if (age >= 21) {
      return CategorieAge.Senior;
    } else {
      return ''; // Not in any category
    }
  }

  getBirthDateWithCategory(): string {
    if (!this.athlete?.dateDeNaissance) return '';

    try {
      const formattedDate = this.formatBirthDate(this.athlete.dateDeNaissance);
      const category = this.calculateCategorieAge(this.athlete.dateDeNaissance);
      return `${formattedDate} (${category})`;
    } catch (error) {
      return this.formatBirthDate(this.athlete.dateDeNaissance);
    }
  }

  getJudoExperience(): string | null {
    if (!this.athlete?.debutJudo) return null;
    
    // Si finJudo existe, calculer de debut à fin
    if (this.athlete.finJudo) {
      const years = this.athlete.finJudo - this.athlete.debutJudo;
      return `${this.athlete.debutJudo} - ${this.athlete.finJudo} (${years} ans d'expérience)`;
    }
    
    // Sinon, calculer de debut à maintenant
    const currentYear = new Date().getFullYear();
    const years = currentYear - this.athlete.debutJudo;
    return `${this.athlete.debutJudo} - présent (${years} ans d'expérience)`;
  }

  // Grade display method
  getGradeDisplayName(grade: string): string {
    const gradeMap: { [key: string]: string } = {
      'CeintureBlanche': 'Ceinture blanche',
      'CeintureJaune': 'Ceinture jaune',
      'CeintureOrange': 'Ceinture orange',
      'CeintureVerte': 'Ceinture verte',
      'CeintureBleue': 'Ceinture bleue',
      'CeintureMarron': 'Ceinture marron',
      'CeintureNoire1erDan': 'Ceinture noire 1er Dan',
      'CeintureNoire2eDan': 'Ceinture noire 2e Dan',
      'CeintureNoire3eDan': 'Ceinture noire 3e Dan',
      'CeintureNoire4eDan': 'Ceinture noire 4e Dan',
      'CeintureNoire5eDan': 'Ceinture noire 5e Dan',
      'CeintureNoire6eDan': 'Ceinture noire 6e Dan',
      'CeintureNoire7eDan': 'Ceinture noire 7e Dan',
      'CeintureNoire8eDan': 'Ceinture noire 8e Dan',
      'CeintureNoire9eDan': 'Ceinture noire 9e Dan'
    };

    return gradeMap[grade] || grade; // Return original if not found
  }

  // Team display method
  getEquipeDisplayName(equipe: string): string {
    const equipeMap: { [key: string]: string } = {
      'Canada': 'Équipe Canadienne',
      'Quebec': 'Équipe du Québec',
      'SportEtude': 'Équipe Sport-Études',
      'Boucherville': 'Équipe Boucherville',
      'Kata': 'Équipe de Kata',
      'Ancien': 'Anciens athlètes'
    };

    return equipeMap[equipe] || equipe; // Return original if not found
  }

  // Image handling methods
  getImageUrl(imagePath: string): string {
    if (!imagePath) return this.getDefaultImageUrl();
    return this.configService.getImageUrl(imagePath);
  }

  getDefaultImageUrl(): string {
    return 'assets/images/default-profile.png';
  }
}
