import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { ApiService } from '../services/api.service';
import { MessagesImportant } from '../models/MessagesImportant';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, NgxMarqueeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeDropdown: string | null = null;
  mobileActiveDropdown: string | null = null;
  mobileMenuOpen: boolean = false;
  isScrolled: boolean = false;
  isMainPage: boolean = false;
  isChallengeSection: boolean = false;
  private hideTimeout: any;
  announcements: string[] = [];
  marqueeBackgroundColor: string = '#ca0101';
  animationDuration: string = '15s'; // Default value
  inscriptionLinks: string[] = ["https://docs.google.com/forms/d/e/1FAIpQLSfc2-w6GImhuqQtreQGU4lkY_ZUnEtW6fpEf70twCGxUp6A4w/viewform", "https://www.judoboucherville.com/chall/"];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Track route changes to detect main page and challenge section
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isMainPage = event.url === '/accueil' || event.url === '/' || event.url === '/challenge';
      this.isChallengeSection = event.url.startsWith('/challenge');
    });

    // Set initial state based on current route
    this.isMainPage = this.router.url === '/accueil' || this.router.url === '/';
    this.isChallengeSection = this.router.url.startsWith('/challenge');

    this.apiService.getAnnouncements().subscribe((data: MessagesImportant[]) => {
      // If no messages, just return
      if (data.length === 0) {
        this.announcements = [];
        return;
      }
      this.marqueeBackgroundColor = data[0].couleur || '#ca0101';

      // Extract just the message text from each MessagesImportant object
      const messages = data.map(item => item.message);

      // Calculate total message length
      const totalLength = messages.reduce((sum, message) => sum + message.length, 0);

      // We want to ensure enough content to fill the screen width
      // A typical screen might need around 200-300 characters to fill the width
      const minRequiredLength = 300; // Minimum characters to fill width

      if (totalLength < minRequiredLength) {
        // Duplicate messages to ensure enough content for the marquee
        const repeatedMessages = [];
        // Calculate how many times to repeat the messages
        const repeatCount = Math.max(3, Math.ceil(minRequiredLength / totalLength));

        for (let i = 0; i < repeatCount; i++) {
          repeatedMessages.push(...messages);
        }
        this.announcements = repeatedMessages;
      } else if (messages.length === 1) {
        // If only one message but it's long enough, duplicate it at least once
        this.announcements = [messages[0], messages[0], messages[0]];
      } else {
        // Still duplicate messages a few times to ensure continuous flow
        this.announcements = [...messages, ...messages, ...messages];
      }

      // Calculate appropriate animation duration based on the new content length
      this.calculateAnimationDuration();
    });
  }

  private calculateAnimationDuration(): void {
    // Calculate total characters in all announcements
    const totalLength = this.announcements.reduce((sum, msg) => sum + msg.length, 0);

    // Base calculation: 1 second for every 5 characters, with minimum of 15s and maximum of 120s
    // You can adjust these values to fine-tune the speed
    const baseSpeed = 5; // characters per second
    let calculatedDuration = totalLength / baseSpeed;

    // Apply min/max constraints
    calculatedDuration = Math.max(15, Math.min(120, calculatedDuration));

    // Set the animation duration
    this.animationDuration = `${calculatedDuration}s`;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Set isScrolled to true if window is scrolled more than 50px, otherwise false
    this.isScrolled = window.scrollY > 50;
  }

  // Desktop dropdown methods
  showDropdown(dropdown: string): void {
    // Clear any pending hide timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.activeDropdown = dropdown;
  }

  scheduleHideDropdown(dropdown: string): void {
    // Only schedule hide if this is the active dropdown
    if (this.activeDropdown === dropdown) {
      this.hideTimeout = setTimeout(() => {
        this.activeDropdown = null;
        this.hideTimeout = null;
      }, 500); // 0.5 second delay
    }
  }

  setActiveItem(item: string): void {
    // Close any open dropdown when hovering over regular nav items
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.activeDropdown = null;
  }

  // Mobile menu methods
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (!this.mobileMenuOpen) {
      this.mobileActiveDropdown = null;
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.mobileActiveDropdown = null;
  }

  toggleMobileDropdown(dropdown: string): void {
    if (this.mobileActiveDropdown === dropdown) {
      this.mobileActiveDropdown = null;
    } else {
      this.mobileActiveDropdown = dropdown;
    }
  }

  getInscriptionText(): string {
    return this.isChallengeSection ? 'Inscription Challenge' : 'Inscription';
  }

  getInscriptionLink(): string {
    return this.isChallengeSection ? this.inscriptionLinks[1] : this.inscriptionLinks[0];
  }

  // Development method to clear cache
  clearSessionCache(): void {
    this.apiService.clearCache();
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
    console.log('Session cache cleared by user');
  }
}
