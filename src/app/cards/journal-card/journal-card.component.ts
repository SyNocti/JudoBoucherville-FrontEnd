import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Journal } from '../../models/Journal';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-journal-card',
  imports: [CommonModule],
  templateUrl: './journal-card.component.html',
  styleUrl: './journal-card.component.css'
})
export class JournalCardComponent {
  @Input() journal!: Journal;

  constructor(private configService: ConfigService) { }

  // Open PDF in new tab
  openPdf(): void {
    if (this.journal.fichierNom) {
      const url = this.configService.getFileUrl(this.journal.fichierNom);

      // Open PDF in new tab/window
      const newWindow = window.open(url, '_blank');

      // Check if popup blocker prevented opening
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback: try to navigate to the PDF directly
        window.location.href = url;
      } else {
        // Focus on the new window
        newWindow.focus();
      }
    }
  }

  // Format date for display
  formatDate(date: Date): string {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return dateObj.toLocaleDateString('fr-FR', options);
  }

  // Get icon class for PDF
  getFileIcon(): string {
    return 'fas fa-file-pdf';
  }
}
