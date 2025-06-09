import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeDropdown: string | null = null;
  currentPage: string = 'accueil'; // This should be set based on current route
  private hideTimeout: any;

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
      }, 1000); // 1 second delay
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

  // Method to set current page (should be called from router or parent component)
  setCurrentPage(page: string): void {
    this.currentPage = page;
  }
}
