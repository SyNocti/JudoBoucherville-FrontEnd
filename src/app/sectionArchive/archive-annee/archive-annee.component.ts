import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

interface ArchiveYear {
  year: number;
  displayText: string;
  routerLink: string;
}

@Component({
  selector: 'app-archive-annee',
  imports: [CommonModule, RouterModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './archive-annee.component.html',
  styleUrl: './archive-annee.component.css'
})
export class ArchiveAnneeComponent implements OnInit {
  archiveType: string = '';
  years: ArchiveYear[] = [];
  loading: boolean = true;
  error: boolean = false;
  pageTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.archiveType = params['type'];
      this.setPageTitle();
      this.loadArchiveYears();
    });
  }

  private setPageTitle(): void {
    switch (this.archiveType) {
      case 'resultats':
        this.pageTitle = 'Archives des résultats';
        break;
      case 'actualites':
        this.pageTitle = 'Archives des actualités';
        break;
      case 'journaux':
        this.pageTitle = 'Archives des journaux';
        break;
      default:
        this.pageTitle = 'Archives';
    }
  }

  private loadArchiveYears(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getArchiveYears(this.archiveType).subscribe({
      next: (yearsList) => {
        this.years = this.processYears(yearsList);
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading archive years:', error);
        this.loading = false;
        this.error = true;
        this.years = [];
      }
    });
  }

  private processYears(yearsList: number[]): ArchiveYear[] {
    const sortedYears = yearsList.sort((a, b) => b - a);

    if (this.archiveType === 'journaux') {
      return sortedYears.map(year => ({
        year: year,
        displayText: year.toString(),
        routerLink: `/archive/${this.archiveType}/${year}`
      }));
    } else {
      // For resultats and actualites, display as seasons (2022-2023 format)
      return sortedYears.map(year => ({
        year: year,
        displayText: `${year}-${year + 1}`,
        routerLink: `/archive/${this.archiveType}/${year}`
      }));
    }
  }

  getArchiveTypeDisplayName(): string {
    switch (this.archiveType) {
      case 'resultats':
        return 'résultats';
      case 'actualites':
        return 'actualités';
      case 'journaux':
        return 'journaux';
      default:
        return 'archives';
    }
  }
}
