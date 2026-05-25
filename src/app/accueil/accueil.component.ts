import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
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
      name: 'Ville de Boucherville',
      image: '/assets/images/logos/ville_boucherville_logo-small.png',
      url: 'https://www.boucherville.ca/'
    },
    {
      name: 'Judo Québec',
      image: '/assets/images/logos/judo_quebec_logo-small.png',
      url: 'https://judo-quebec.qc.ca/'
    },
    {
      name: 'Judo Canada',
      image: '/assets/images/logos/judo_canada_logo-small.png',
      url: 'https://judocanada.org/'
    },
    {
      name: 'École secondaire de Mortagne',
      image: '/assets/images/logos/sport_etudes_logo-small.png',
      url: 'https://demortagne.cssp.gouv.qc.ca/'
    },
    {
      name: 'International Judo Federation',
      image: '/assets/images/logos/ijf_logo-small.png',
      url: 'https://www.ijf.org/'
    }
  ];

  valeursMorale = [
    'Respect',
    'Politesse',
    'Courage',
    'Sincérité',
    'Contrôle de soi',
    'Modestie',
    'Amitié',
    'Honneur'
  ];

  // Event data that will come from API
  futurCompetitions: FuturEvent[] = [];
  futurOtherEvents: FuturEvent[] = [];
  recentCompetitions: CompetitionSummary[] = [];
  actualites: ActualiteSummary[] = [];

  // Loading and error states
  loadingStates = {
    futurCompetitions: true,
    futurOtherEvents: true,
    recentCompetitions: true,
    actualites: true
  };

  errorStates = {
    futurCompetitions: false,
    futurOtherEvents: false,
    recentCompetitions: false,
    actualites: false
  };

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.loadFuturCompetitions();
    this.loadFuturOtherEvents();
    this.loadRecentCompetitions();
    this.loadActualites();
  }

  scrollToNextSection(): void {
    const nextSection = document.querySelector('.sponsors-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private loadFuturCompetitions(): void {
    this.loadingStates.futurCompetitions = true;
    this.errorStates.futurCompetitions = false;

    this.apiService.getCompetitions().subscribe({
      next: (data) => {
        this.futurCompetitions = data;
        this.loadingStates.futurCompetitions = false;
      },
      error: (error) => {
        console.error('Error loading future competitions:', error);
        this.errorStates.futurCompetitions = true;
        this.loadingStates.futurCompetitions = false;
      }
    });
  }

  private loadFuturOtherEvents(): void {
    this.loadingStates.futurOtherEvents = true;
    this.errorStates.futurOtherEvents = false;

    this.apiService.getEvents().subscribe({
      next: (data) => {
        this.futurOtherEvents = data;
        this.loadingStates.futurOtherEvents = false;
      },
      error: (error) => {
        console.error('Error loading future other events:', error);
        this.errorStates.futurOtherEvents = true;
        this.loadingStates.futurOtherEvents = false;
      }
    });
  }

  private loadRecentCompetitions(): void {
    this.loadingStates.recentCompetitions = true;
    this.errorStates.recentCompetitions = false;

    this.apiService.getCompetitionsSummary().subscribe({
      next: (data) => {
        this.recentCompetitions = data;
        this.loadingStates.recentCompetitions = false;
      },
      error: (error) => {
        console.error('Error loading recent competitions:', error);
        this.errorStates.recentCompetitions = true;
        this.loadingStates.recentCompetitions = false;
      }
    });
  }

  private loadActualites(): void {
    this.loadingStates.actualites = true;
    this.errorStates.actualites = false;

    this.apiService.getActualiteSummary().subscribe({
      next: (data) => {
        this.actualites = data;
        this.loadingStates.actualites = false;
      },
      error: (error) => {
        console.error('Error loading actualités:', error);
        this.errorStates.actualites = true;
        this.loadingStates.actualites = false;
      }
    });
  }
}
