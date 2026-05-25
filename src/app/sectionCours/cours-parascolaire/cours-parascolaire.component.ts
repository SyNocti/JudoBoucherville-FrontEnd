import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ParaScolaire } from '../../models/ParaScolaire';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';
import { HttpErrorResponse } from '@angular/common/http';
import { marked } from 'marked';

@Component({
  selector: 'app-cours-parascolaire',
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './cours-parascolaire.component.html',
  styleUrl: './cours-parascolaire.component.css'
})
export class CoursParascolaireComponent implements OnInit {
  paraScolaire: ParaScolaire | null = null;
  loading: boolean = true;
  error: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadParaScolaire();
  }

  getFileUrl(fileName: string): string {
    return this.apiService.getFileUrl(fileName);
  }

  getCleanFileName(fileName: string): string {
    // Extract only the text before the first underscore
    const underscoreIndex = fileName.indexOf('_');
    return underscoreIndex !== -1 ? fileName.substring(0, underscoreIndex) : fileName;
  }

  getMarkdownHtml(markdownText: string): string {
    if (!markdownText) return '';
    try {
      const result = marked(markdownText);
      return typeof result === 'string' ? result : '';
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return markdownText; // Fallback to plain text
    }
  }

  private loadParaScolaire(): void {
    this.loading = true;
    this.error = false;
    console.log('Loading ParaScolaire data...');

    this.apiService.getParaScolaire().subscribe({
      next: (data) => {
        console.log('ParaScolaire data received:', data);
        this.paraScolaire = data;
        this.loading = false;
        this.error = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading ParaScolaire:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        this.loading = false;
        this.error = true;
        this.paraScolaire = null;
      }
    });
  }
}
