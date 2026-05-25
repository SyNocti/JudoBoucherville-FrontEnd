import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { SportEtude } from '../../models/SportEtude';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cours-sport-etude',
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './cours-sport-etude.component.html',
  styleUrl: './cours-sport-etude.component.css'
})
export class CoursSportEtudeComponent implements OnInit {
  sportEtude: SportEtude | null = null;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.loadSportEtude();
  }

  private loadSportEtude(): void {
    this.loading = true;
    this.error = false;
    console.log('Loading SportEtude data...');

    this.apiService.getSportEtude().subscribe({
      next: (data) => {
        console.log('SportEtude data received:', data);
        this.sportEtude = data;
        this.loading = false;
        this.error = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading Sport-Études:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        this.loading = false;
        this.error = true;
        this.sportEtude = null;
      }
    });
  }

  getFileUrl(fileName: string): string {
    return this.configService.getFileUrl(fileName);
  }

  getCleanFileName(fileName: string): string {
    // Extract only the text before the first underscore
    const underscoreIndex = fileName.indexOf('_');
    return underscoreIndex !== -1 ? fileName.substring(0, underscoreIndex) : fileName;
  }
}
