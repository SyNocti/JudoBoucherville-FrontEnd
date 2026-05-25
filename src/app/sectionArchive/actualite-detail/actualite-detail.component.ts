import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { ActualiteDetail } from '../../models/ActualiteDetail';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-actualite-detail',
  imports: [CommonModule, PageTitleComponent, MarkdownModule],
  templateUrl: './actualite-detail.component.html',
  styleUrl: './actualite-detail.component.css'
})
export class ActualiteDetailComponent implements OnInit {
  actualite: ActualiteDetail | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadActualiteDetail(id);
    });
  }

  private loadActualiteDetail(id: number): void {
    this.loading = true;

    this.apiService.getActualiteDetail(id).subscribe({
      next: (actualite) => {
        this.actualite = actualite;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading actualite:', error);
        this.loading = false;
      }
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatDateTime(date: Date): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} à ${hours}h${minutes}`;
  }

  // Image handling methods
  getImageUrl(imagePath?: string): string {
    if (!imagePath) return this.getDefaultImageUrl();
    return this.configService.getImageUrl(imagePath);
  }

  getDefaultImageUrl(): string {
    return 'assets/images/default-news.png';
  }

  // Get all images including the principal one
  getAllImages(): string[] {
    if (!this.actualite) return [];

    const allImages: string[] = [];

    // Add principal image first if it exists
    if (this.actualite.imagePrincipale) {
      allImages.push(this.actualite.imagePrincipale);
    }

    // Add other images if they exist and are not duplicates
    if (this.actualite.images) {
      this.actualite.images.forEach(image => {
        allImages.push(image);
      });
    }

    return allImages;
  }

  // Open external link
  openExternalLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
