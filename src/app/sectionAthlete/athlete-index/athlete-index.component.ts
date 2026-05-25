import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AthleteSummary } from '../../models/AthleteSummary';
import { AthleteCardComponent } from '../../cards/athlete-card/athlete-card.component';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-athlete-index',
  imports: [CommonModule, FormsModule, AthleteCardComponent, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './athlete-index.component.html',
  styleUrl: './athlete-index.component.css'
})
export class AthleteIndexComponent implements OnInit {
  athletes: AthleteSummary[] = [];
  group: string = '';
  loading: boolean = true;
  error: boolean = false;
  groupType: 'team' | 'niveau' = 'team';

  // Filtering state
  categories: string[] = [];
  selectedCategory: string = 'all';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const groupParam = params['group'] || 'boucherville';
      this.group = groupParam;
      this.groupType = this.determineGroupType(groupParam);
      this.loadAthletes();
    });
  }

  private determineGroupType(param: string): 'team' | 'niveau' {
    const paramLower = param.toLowerCase();
    
    // Check if it's a niveau first
    const niveaux = ['international', 'national', 'provincial'];
    if (niveaux.includes(paramLower)) {
      return 'niveau';
    }
    
    // Check if it's a team
    const teamNames = ['canada', 'quebec', 'sportetude', 'sport-etude', 'sport-études', 'boucherville', 'kata', 'ancien', 'anciens', 'veterans'];
    if (teamNames.includes(paramLower)) {
      return 'team';
    }
    
    // If neither team nor niveau, default to team boucherville
    this.group = 'boucherville';
    return 'team';
  }

  private loadAthletes(): void {
    this.loading = true;
    this.error = false;

    if (this.groupType === 'team') {
      this.apiService.getAllAthletes(this.group).subscribe({
        next: (athletes) => {
          this.athletes = athletes;
          this.buildCategories();
          this.loading = false;
          this.error = false;
        },
        error: (error) => {
          console.error('Error loading athletes:', error);
          this.loading = false;
          this.error = true;
          this.athletes = [];
          this.categories = [];
          this.selectedCategory = 'all';
        }
      });
    } else {
      // groupType === 'niveau'
      this.apiService.getAthletesByNiveau(this.group).subscribe({
        next: (athletes) => {
          this.athletes = athletes;
          this.buildCategories();
          this.loading = false;
          this.error = false;
        },
        error: (error) => {
          console.error('Error loading athletes by niveau:', error);
          this.loading = false;
          this.error = true;
          this.athletes = [];
          this.categories = [];
          this.selectedCategory = 'all';
        }
      });
    }
  }

  // Construire la liste unique des catégories d'âge à partir des athlètes chargés
  private buildCategories(): void {
    const cats = this.athletes
      .map(a => (a as any).categorieAge || '')
      .filter(c => c && c.trim().length > 0);
    this.categories = Array.from(new Set(cats)).sort((a, b) => a.localeCompare(b, 'fr'));
    if (!this.categories.includes(this.selectedCategory) && this.selectedCategory !== 'all') {
      this.selectedCategory = 'all';
    }
  }

  // Getter pour la liste filtrée selon selectedCategory
  get filteredAthletes(): AthleteSummary[] {
    if (!this.selectedCategory || this.selectedCategory === 'all') return this.athletes;
    return this.athletes.filter(a => (a as any).categorieAge === this.selectedCategory);
  }

  getGroupDisplayName(): string {
    if (this.groupType === 'team') {
      switch (this.group.toLowerCase()) {
        case 'canada':
          return 'Équipe du Canada';
        case 'quebec':
          return 'Équipe du Québec';
        case 'sportetude':
        case 'sport-etude':
        case 'sport-études':
          return 'Équipe Sport-Études';
        case 'boucherville':
          return 'Équipe Boucherville';
        case 'kata':
          return 'Équipe de Kata';
        case 'ancien':
        case 'anciens':
          return 'Anciens Athlètes';
        case 'veterans':
          return 'Équipe vétérans';
        default:
          return 'Équipe Boucherville';
      }
    } else {
      // groupType === 'niveau'
      switch (this.group.toLowerCase()) {
        case 'international':
          return 'Niveau International';
        case 'national':
          return 'Niveau National';
        case 'provincial':
          return 'Niveau Provincial';
        default:
          return 'Niveau Provincial';
      }
    }
  }

  trackByAthleteId(index: number, athlete: AthleteSummary): number {
    return athlete.id;
  }
}
