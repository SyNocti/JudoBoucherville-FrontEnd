import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { CoursDetail } from '../../models/CoursDetail';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-cours-detail',
  imports: [CommonModule, RouterModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './cours-detail.component.html',
  styleUrl: './cours-detail.component.css'
})
export class CoursDetailComponent implements OnInit {
  cours: CoursDetail | null = null;
  loading: boolean = true;
  error: boolean = false;
  coursId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.coursId = +params['id'];
      if (this.coursId) {
        this.loadCoursDetail();
      } else {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private loadCoursDetail(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getCoursDetail(this.coursId).subscribe({
      next: (cours) => {
        this.cours = cours;
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading cours detail:', error);
        this.loading = false;
        this.error = true;
        this.cours = null;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/cours/liste']);
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return this.getDefaultImageUrl();
    return this.configService.getImageUrl(imagePath);
  }

  getDefaultImageUrl(): string {
    return 'assets/images/default-competition.png';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(price);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }

  formatCategory(category: string): string {
    if (!category) return '';
    // Add space before capital letters (except the first one)
    return category.replace(/([A-Z])/g, ' $1').trim();
  }

  calculateWeeks(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.ceil(diffDays / 7);
  }

  formatTextWithBullets(text: string): string {
    if (!text) return '';
    
    // Check if text starts with a dash
    if (text.trim().startsWith('-')) {
      // Split by dash and format all parts as bullet points
      const parts = text.split('-').map(part => part.trim()).filter(part => part.length > 0);
      let formatted = '';
      for (const part of parts) {
        formatted += `<p>• ${part}</p>`;
      }
      return formatted;
    } else {
      // Split by dash and format with bullet points
      const parts = text.split('-').map(part => part.trim()).filter(part => part.length > 0);
      
      if (parts.length <= 1) {
        return `<p>${text}</p>`;
      }
      
      // First part remains as is, subsequent parts become bullet points
      let formatted = `<p>${parts[0]}</p>`;
      for (let i = 1; i < parts.length; i++) {
        formatted += `<p>• ${parts[i]}</p>`;
      }
      
      return formatted;
    }
  }
}
