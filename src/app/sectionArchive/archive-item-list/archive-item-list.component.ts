import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';
import { ActualiteCardComponent } from '../../cards/actualite-card/actualite-card.component';
import { CompetitionCardComponent } from '../../cards/competition-card/competition-card.component';
import { JournalCardComponent } from '../../cards/journal-card/journal-card.component';
import { ActualiteSummary } from '../../models/ActualiteSummary';
import { CompetitionSummary } from '../../models/CompetitionSummary';
import { Journal } from '../../models/Journal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-archive-item-list',
  imports: [
    CommonModule,
    RouterModule,
    PageTitleComponent,
    LoadingSpinnerComponent,
    ActualiteCardComponent,
    CompetitionCardComponent,
    JournalCardComponent
  ],
  templateUrl: './archive-item-list.component.html',
  styleUrl: './archive-item-list.component.css'
})
export class ArchiveItemListComponent implements OnInit {
  archiveType: string = '';
  year: number = 0;
  displayYear: string = '';
  pageTitle: string = '';
  loading: boolean = true;
  error: boolean = false;

  // Data arrays for different types
  actualites: ActualiteSummary[] = [];
  competitions: CompetitionSummary[] = [];
  journals: Journal[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.archiveType = params['type'];
      this.year = Number(params['year']);
      this.setDisplayYear();
      this.setPageTitle();
      this.loadArchiveData();
    });
  }

  private setDisplayYear(): void {
    if (this.archiveType === 'journaux') {
      this.displayYear = this.year.toString();
    } else {
      // For resultats and actualites, display as season
      this.displayYear = `${this.year}-${this.year + 1}`;
    }
  }

  private setPageTitle(): void {
    switch (this.archiveType) {
      case 'resultats':
        this.pageTitle = `Résultats ${this.displayYear}`;
        break;
      case 'actualites':
        this.pageTitle = `Actualités ${this.displayYear}`;
        break;
      case 'journaux':
        this.pageTitle = `Journaux ${this.displayYear}`;
        break;
      default:
        this.pageTitle = `Archives ${this.displayYear}`;
    }
  }

  // Update page title after data is loaded to use correct singular/plural
  private updatePageTitleAfterLoad(): void {
    const count = this.getTotalCount();

    switch (this.archiveType) {
      case 'resultats':
        this.pageTitle = count === 1 ? `Résultat ${this.displayYear}` : `Résultats ${this.displayYear}`;
        break;
      case 'actualites':
        this.pageTitle = count === 1 ? `Actualité ${this.displayYear}` : `Actualités ${this.displayYear}`;
        break;
      case 'journaux':
        this.pageTitle = count === 1 ? `Journal ${this.displayYear}` : `Journaux ${this.displayYear}`;
        break;
      default:
        this.pageTitle = count === 1 ? `Archive ${this.displayYear}` : `Archives ${this.displayYear}`;
    }
  }

  private loadArchiveData(): void {
    this.loading = true;
    this.error = false;

    // Clear all data arrays
    this.actualites = [];
    this.competitions = [];
    this.journals = [];

    // Call the appropriate API method based on archive type
    switch (this.archiveType) {
      case 'actualites':
        this.apiService.getArchiveActualites(this.year).subscribe({
          next: (data) => {
            this.actualites = data;
            this.loading = false;
            this.error = false;
            this.updatePageTitleAfterLoad();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error loading archive actualités:', error);
            this.loading = false;
            this.error = true;
            this.actualites = [];
          }
        });
        break;

      case 'resultats':
        this.apiService.getArchiveCompetitions(this.year).subscribe({
          next: (data) => {
            this.competitions = data;
            this.loading = false;
            this.error = false;
            this.updatePageTitleAfterLoad();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error loading archive competitions:', error);
            this.loading = false;
            this.error = true;
            this.competitions = [];
          }
        });
        break;

      case 'journaux':
        this.apiService.getArchiveJournals(this.year).subscribe({
          next: (data) => {
            this.journals = data;
            this.loading = false;
            this.error = false;
            this.updatePageTitleAfterLoad();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error loading archive journals:', error);
            this.loading = false;
            this.error = true;
            this.journals = [];
          }
        });
        break;

      default:
        console.error('Unknown archive type:', this.archiveType);
        this.loading = false;
        this.error = true;
    }
  }

  getArchiveTypeDisplayName(): string {
    const count = this.getTotalCount();

    switch (this.archiveType) {
      case 'resultats':
        return count === 1 ? 'résultat' : 'résultats';
      case 'actualites':
        return count === 1 ? 'actualité' : 'actualités';
      case 'journaux':
        return count === 1 ? 'journal' : 'journaux';
      default:
        return count === 1 ? 'archive' : 'archives';
    }
  }

  getBackLink(): string {
    return `/archive/${this.archiveType}`;
  }

  // Get total count of items for current type
  getTotalCount(): number {
    switch (this.archiveType) {
      case 'actualites':
        return this.actualites.length;
      case 'resultats':
        return this.competitions.length;
      case 'journaux':
        return this.journals.length;
      default:
        return 0;
    }
  }

  // Get appropriate verb form based on count (singular/plural)
  getCountText(): string {
    const count = this.getTotalCount();
    const typeName = this.getArchiveTypeDisplayName();

    if (count === 0) {
      switch (this.archiveType) {
        case 'resultats':
          return 'Aucun résultat trouvé';
        case 'actualites':
          return 'Aucune actualité trouvée';
        case 'journaux':
          return 'Aucun journal trouvé';
        default:
          return 'Aucune archive trouvée';
      }
    } else if (count === 1) {
      switch (this.archiveType) {
        case 'resultats':
          return `1 résultat trouvé`;
        case 'actualites':
          return `1 actualité trouvée`;
        case 'journaux':
          return `1 journal trouvé`;
        default:
          return `1 archive trouvée`;
      }
    } else {
      switch (this.archiveType) {
        case 'resultats':
          return `${count} résultats trouvés`;
        case 'actualites':
          return `${count} actualités trouvées`;
        case 'journaux':
          return `${count} journaux trouvés`;
        default:
          return `${count} archives trouvées`;
      }
    }
  }
}
