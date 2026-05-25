import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Telechargement } from '../../models/Telechargement';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-telechargements',
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './telechargements.component.html',
  styleUrl: './telechargements.component.css'
})
export class TelechargementsComponent implements OnInit {
  telechargements: Telechargement[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.loadTelechargements();
  }

  private loadTelechargements(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getTelechargements().subscribe({
      next: (telechargements) => {
        this.telechargements = telechargements;
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading telechargements:', error);
        this.loading = false;
        this.error = true;
        this.telechargements = [];
      }
    });
  }

  // Get PDF URL for opening in new tab
  openPdf(fileName: string) {
    const url = this.configService.getFileUrl(fileName);
    window.open(url, '_blank');
  }

  // Get icon class based on file type
  getFileIcon(): string {
    return 'fas fa-file-pdf';
  }
}
