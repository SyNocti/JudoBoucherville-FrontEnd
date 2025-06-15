import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuturEvent } from '../../models/FuturEvent';


@Component({
  selector: 'app-futur-event-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './futur-event-card.component.html',
  styleUrl: './futur-event-card.component.css'
})
export class FuturEventCardComponent {
  @Input() title: string = '';
  @Input() futurEvents: FuturEvent[] = [];

  formatDate(date: Date): string {
    if (!date) return '';

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
