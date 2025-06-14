import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, NgxMarqueeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeDropdown: string | null = null;
  mobileActiveDropdown: string | null = null;
  currentPage: string = 'accueil';
  mobileMenuOpen: boolean = false;
  isScrolled: boolean = false;
  private hideTimeout: any;
  announcements: string[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAnnouncements().subscribe(data => {
      if (data.length == 1)
        data.push(data[0]);
      this.announcements = data;
    });
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

  // Method to set current page (should be called from router or parent component)
  setCurrentPage(page: string): void {
    this.currentPage = page;
  }
}
