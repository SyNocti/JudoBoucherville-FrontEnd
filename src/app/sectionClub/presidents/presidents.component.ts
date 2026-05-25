import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { President } from '../../models/President';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-presidents',
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './presidents.component.html',
  styleUrl: './presidents.component.css'
})
export class PresidentsComponent implements OnInit {
  presidents: President[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadPresidents();
  }

  private loadPresidents(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getPresidents().subscribe({
      next: (presidents) => {
        // Sort presidents by start year (most recent first)
        this.presidents = presidents.sort((a, b) => b.anneeDebut - a.anneeDebut);
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading presidents:', error);
        this.loading = false;
        this.error = true;
        this.presidents = [];
      }
    });
  }

  // Check if president is current (no end year)
  isCurrentPresident(president: President): boolean {
    return !president.anneeFin;
  }

  // Get the duration string for a president's term
  getTermDuration(president: President): string {
    if (this.isCurrentPresident(president)) {
      return `${president.anneeDebut} - Présent`;
    }
    return `${president.anneeDebut} - ${president.anneeFin}`;
  }
}
