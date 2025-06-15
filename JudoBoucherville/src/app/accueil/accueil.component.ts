import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FuturEventCardComponent } from '../cards/futur-event-card/futur-event-card.component';
import { CompetitionCardComponent } from '../cards/competition-card/competition-card.component';
import { ActualiteCardComponent } from '../cards/actualite-card/actualite-card.component';
import { FuturEvent } from '../models/FuturEvent';
import { CompetitionSummary } from '../models/CompetitionSummary';
import { ActualiteSummary } from '../models/ActualiteSummary';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FuturEventCardComponent, CompetitionCardComponent, ActualiteCardComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccueilComponent implements OnInit {
  // Sponsor data with name, image path, and URL
  sponsors = [
    {
      name: 'Sponsor 1',
      image: '/assets/images/logo.png',
      url: 'https://sponsor1.com'
    },
    {
      name: 'Sponsor 2',
      image: '/assets/images/logo.png',
      url: 'https://sponsor2.com'
    },
    {
      name: 'Sponsor 3',
      image: '/assets/images/logo.png',
      url: 'https://sponsor3.com'
    },
    {
      name: 'Sponsor 4',
      image: '/assets/images/logo.png',
      url: 'https://sponsor4.com'
    },
    {
      name: 'Sponsor 5',
      image: '/assets/images/logo.png',
      url: 'https://sponsor5.com'
    },
    {
      name: 'Sponsor 6',
      image: '/assets/images/logo.png',
      url: 'https://sponsor6.com'
    }
  ];

  // Event data that will come from API
  futurCompetitions: FuturEvent[] = [];
  futurOtherEvents: FuturEvent[] = [];
  recentCompetitions: CompetitionSummary[] = [];
  actualites: ActualiteSummary[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Fetch competitions
    this.apiService.getCompetitions().subscribe(data => {
      this.futurCompetitions = data;
    });

    // Fetch other events
    this.apiService.getEvents().subscribe(data => {
      this.futurOtherEvents = data;
    });

    // Fetch recent competitions
    this.apiService.getCompetitionsSummary().subscribe(data => {
      this.recentCompetitions = data;
    });

    // Fetch actualités
    this.apiService.getActualiteSummary().subscribe(data => {
      this.actualites = data;
    });
  }
}
