import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Question } from '../models/Question';
import { PageTitleComponent } from '../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../reusables/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent, RouterModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit {
  questions: Question[] = [];
  loading: boolean = true;
  error: boolean = false;
  expandedQuestions: Set<number> = new Set();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  private loadQuestions(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getQuestions().subscribe({
      next: (questions) => {
        this.questions = questions.sort((a, b) => a.displayOrder - b.displayOrder);
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        this.loading = false;
        this.error = true;
        this.questions = [];
      }
    });
  }

  toggleQuestion(questionId: number): void {
    if (this.expandedQuestions.has(questionId)) {
      this.expandedQuestions.delete(questionId);
    } else {
      this.expandedQuestions.add(questionId);
    }
  }

  isExpanded(questionId: number): boolean {
    return this.expandedQuestions.has(questionId);
  }
}
