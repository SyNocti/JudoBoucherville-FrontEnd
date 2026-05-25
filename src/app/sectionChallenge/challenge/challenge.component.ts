import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { interval, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { ChallengeInfo } from '../../models/ChallengeInfo';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-challenge',
  imports: [CommonModule, RouterModule, NgxMarqueeComponent, LoadingSpinnerComponent],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChallengeComponent implements OnInit, OnDestroy {
  challenge: ChallengeInfo | null = null;
  sponsorLogoUrls: { [sponsorId: number]: string } = {};
  loading: boolean = true;
  error: boolean = false;

  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  private countdownSubscription?: Subscription;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.loadChallengeInfo();
  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  loadChallengeInfo(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getChallengeInfo().subscribe({
      next: (challengeInfo) => {
        this.challenge = challengeInfo;
        this.loading = false;
        this.error = false;
        this.startCountdown();
        this.challenge.sponsors.forEach(sponsor => {
          this.sponsorLogoUrls[sponsor.id] = this.getSponsorLogoUrl(sponsor.logoFileName);
        });
      },
      error: (error) => {
        console.error('Error loading challenge info:', error);
        this.loading = false;
        this.error = true;
        this.challenge = null;
      }
    });
  }

  private startCountdown() {
    if (!this.challenge) return;

    this.countdownSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
    this.updateCountdown(); // Initial call
  }

  private updateCountdown() {
    if (!this.challenge) return;

    const now = new Date().getTime();
    const challengeDate = new Date(this.challenge.date).getTime();
    const difference = challengeDate - now;

    if (difference > 0) {
      this.countdown.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      this.countdown.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.countdown.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.countdown.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    } else {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  scrollToNextSection(): void {
    // Try to scroll to the first available section after the hero
    const sectionsToTry = [
      '.partners-section',
      '.quick-info-section', 
      '.content-loading-wrapper',
      '.content-error-state',
      '.contact-section'
    ];
    
    for (const sectionSelector of sectionsToTry) {
      const section = document.querySelector(sectionSelector);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
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

  downloadPDF(fileName: string): void {
    const url = this.configService.getFileUrl(fileName);
    const newWindow = window.open(url, '_blank');

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = url;
    } else {
      newWindow.focus();
    }
  }

  openFacebookGroup(): void {
    window.open('https://www.facebook.com/share/g/1NbdM7QFsZ/?mibextid=NSMWBT', '_blank');
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return '';
    return this.configService.getImageUrl(imagePath);
  }

  getSponsorLogoUrl(logoFileName?: string): string {
    if (!logoFileName) return '';
    return this.configService.getImageUrl(logoFileName);
  }

  /**
   * Calculate animation duration to maintain consistent scrolling speed
   * Base duration: 40s for a single set of sponsors
   * Adjust based on number of sponsors to maintain consistent speed
   */
  get marqueeAnimationDuration(): string {
    if (!this.challenge?.sponsors?.length) {
      return '40s';
    }
    
    // Base speed calculation
    const baseSpeed = 20; // seconds for reference number of sponsors
    const referenceSponsors = 8; // reference number of sponsors for baseSpeed
    const duplications = 6;
    
    // Adjust duration based on actual number of sponsors
    // More sponsors should move faster to maintain visual consistency
    const sponsorCount = this.challenge.sponsors.length;
    const scaleFactor = sponsorCount / referenceSponsors;
    const adjustedDuration = baseSpeed * scaleFactor * duplications;
    
    return `${adjustedDuration}s`;
  }
}
