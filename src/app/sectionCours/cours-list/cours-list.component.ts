import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { CoursSummary } from '../../models/CoursSummary';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-cours-list',
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent, RouterModule],
  templateUrl: './cours-list.component.html',
  styleUrl: './cours-list.component.css'
})
export class CoursListComponent implements OnInit {
  cours: CoursSummary[] = [];
  coursGroupes: { [category: string]: CoursSummary[] } = {};
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.loadCours();
  }

  private loadCours(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getCours().subscribe({
      next: (cours) => {
        console.log('API Response:', cours); // Debug log
        this.cours = cours;
        this.coursGroupes = this.groupByCategory(cours);
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading cours:', error);
        this.loading = false;
        this.error = true;
        this.cours = [];
      }
    });
  }

  navigateToCours(cours: CoursSummary): void {
    this.router.navigate(['/cours/detail', cours.id]);
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return this.getDefaultImageUrl();
    return this.configService.getImageUrl(imagePath);
  }

  getDefaultImageUrl(): string {
    return 'assets/images/default-competition.png';
  }

  private groupByCategory(cours: CoursSummary[]): { [category: string]: CoursSummary[] } {
    return cours.reduce((groups, coursItem) => {
      console.log('Course item:', coursItem); // Debug log
      const category = coursItem.category || 'Autre';
      console.log('Category for', coursItem.nom, ':', category); // Debug log
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(coursItem);
      return groups;
    }, {} as { [category: string]: CoursSummary[] });
  }

    getOrderedCategories(): string[] {
    const preferredOrder = ['CoursEnfant', 'CoursAdoEtAdulte', 'CoursJiuJitsu', 'CoursFemme'];
    const categories = Object.keys(this.coursGroupes);
    
    // First add categories in preferred order if they exist (case-insensitive matching)
    const orderedCategories: string[] = [];
    preferredOrder.forEach(preferredCategory => {
      const matchingCategory = categories.find(category => 
        category.toLowerCase() === preferredCategory.toLowerCase()
      );
      if (matchingCategory) {
        orderedCategories.push(matchingCategory);
      }
    });
    
    // Add any remaining categories that weren't in the preferred order (alphabetically sorted)
    const remainingCategories = categories
      .filter(category => !preferredOrder.some(preferred => 
        preferred.toLowerCase() === category.toLowerCase()
      ))
      .sort();
    
    return [...orderedCategories, ...remainingCategories];
  }

  formatCategory(category: string): string {
    if (!category) return '';
    // Add space before capital letters (except the first one)
    return category.replace(/([A-Z])/g, ' $1').trim();
  }
}
