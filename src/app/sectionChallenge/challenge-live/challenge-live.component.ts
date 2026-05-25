import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';
import { ChallengeInfo } from '../../models/ChallengeInfo';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-challenge-live',
  imports: [CommonModule, LoadingSpinnerComponent, PageTitleComponent, RouterModule],
  templateUrl: './challenge-live.component.html',
  styleUrl: './challenge-live.component.css'
})
export class ChallengeLiveComponent implements OnInit {
  challenge: ChallengeInfo | null = null;
  loading: boolean = true;
  error: boolean = false;
  safeUrl: SafeResourceUrl | null = null;

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadChallengeInfo();
  }

  loadChallengeInfo(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getChallengeInfo().subscribe({
      next: (challengeInfo) => {
        this.challenge = challengeInfo;
        this.loading = false;
        this.error = false;
        this.setupLivestream();
      },
      error: (error) => {
        console.error('Error loading challenge info:', error);
        this.loading = false;
        this.error = true;
        this.challenge = null;
      }
    });
  }

  private setupLivestream(): void {
    if (this.challenge && this.challenge.livestreamUrl) {
      const embedUrl = this.convertToEmbedUrl(this.challenge.livestreamUrl);
      if (embedUrl) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      }
    }
  }

  private convertToEmbedUrl(url: string): string | null {
    // Convert various YouTube URL formats to embed format
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
    }

    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }

    return null;
  }

  formatDate(date: Date | string): string {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return dateObj.toLocaleDateString('fr-FR', options);
  }

  retry(): void {
    this.loadChallengeInfo();
  }

  isLivestreamAvailable(): boolean {
    return !!(this.challenge?.livestreamUrl && this.safeUrl);
  }
}
