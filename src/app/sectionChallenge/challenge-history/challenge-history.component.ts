import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ChallengeResultatYear, getCategoryAgeLabel } from '../../models/ChallengeResultat';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-challenge-history',
  imports: [CommonModule, FormsModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './challenge-history.component.html',
  styleUrl: './challenge-history.component.css'
})
export class ChallengeHistoryComponent implements OnInit {
  groupedResults: ChallengeResultatYear[] = [];
  availableYears: number[] = [];
  selectedYear: number | 'all' = 'all';
  loading: boolean = true;
  error: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadAvailableYears();
    this.loadGroupedResults();
  }

  private loadAvailableYears(): void {
    this.apiService.getChallengeAvailableYears().subscribe({
      next: (years) => {
        this.availableYears = years;
      },
      error: (error) => {
        console.error('Error loading available years:', error);
      }
    });
  }

  private loadGroupedResults(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getGroupedChallengeResults().subscribe({
      next: (results) => {
        this.groupedResults = results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading grouped results:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  getCategoryLabel(categoryValue: number): string {
    return getCategoryAgeLabel(categoryValue);
  }

  getPlacementSuffix(placement: number): string {
    if (placement === 1) return 'er';
    return 'e';
  }

  getPlacementClass(placement: number): string {
    switch (placement) {
      case 1: return 'gold';
      case 2: return 'silver';
      case 3: return 'bronze';
      default: return '';
    }
  }

  get filteredResults(): ChallengeResultatYear[] {
    if (this.selectedYear === 'all') {
      return this.groupedResults;
    }
    // Convert selectedYear to number for comparison
    const yearToFilter = typeof this.selectedYear === 'string' ? parseInt(this.selectedYear) : this.selectedYear;
    return this.groupedResults.filter(r => r.year === yearToFilter);
  }
}
