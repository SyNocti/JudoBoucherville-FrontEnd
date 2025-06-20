import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FuturEvent } from '../models/FuturEvent';
import { CompetitionSummary } from '../models/CompetitionSummary';
import { ActualiteSummary } from '../models/ActualiteSummary';
import { AthleteSummary } from '../models/AthleteSummary';
import { AthleteDetail } from '../models/AthleteDetail';
import { Resultat } from '../models/Resultat';
import { Administration } from '../models/administration';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private domain = 'http://localhost:';

  constructor(private http: HttpClient) { }

  getCompetitions(): Observable<FuturEvent[]> {
    return of(this.getMockCompetitions());
  }

  getEvents(): Observable<FuturEvent[]> {
    return of(this.getMockEvents());
  }

  getAnnouncements(): Observable<string[]> {
    return of(this.getMockAnnoucements());
  }

  getCompetitionsSummary(): Observable<CompetitionSummary[]> {
    return of(this.getMockCompetitionsSummary());
  }

  getActualiteSummary(): Observable<ActualiteSummary[]> {
    return of(this.getMockActualiteSummary());
  }

  getAllAthletes(): Observable<AthleteSummary[]> {
    return of(this.getMockAllAthletes());
  }

  getAthleteDetail(id: number): Observable<AthleteDetail | null> {
    return of(this.getMockAthleteDetail(id));
  }

  getAdministration(): Observable<Administration[]> {
    return of(this.getMockAdministration());
  }

  // Mock data for competitions
  private getMockCompetitions(): FuturEvent[] {
    return [
      {
        id: 1,
        name: 'Coupe Louis Deschênes',
        date: new Date('2025-09-15'),
        link: 'https://example.com/competition1',
        location: 'Centre Pierre-Charbonneau, Montréal'
      },
      {
        id: 2,
        name: 'Championnat provincial',
        date: new Date('2025-10-05'),
        link: 'https://example.com/competition2',
        location: 'Centre Claude-Robillard, Montréal'
      },
      {
        id: 3,
        name: 'Tournoi Ne-waza',
        date: new Date('2025-10-25'),
        location: 'Complexe sportif Claude-Robillard'
      }
    ];
  }

  // Mock data for other events
  private getMockEvents(): FuturEvent[] {
    return [
      {
        id: 1,
        name: 'Journée portes ouvertes',
        date: new Date('2025-09-05'),
        location: 'Dojo de Boucherville'
      },
      {
        id: 2,
        name: 'Remise de ceintures',
        date: new Date('2025-11-15'),
        location: 'Dojo de Boucherville'
      },
      {
        id: 3,
        name: 'Camp d\'entraînement',
        date: new Date('2025-12-05'),
        link: 'https://example.com/event3',
        location: 'Centre sportif'
      }
    ];
  }

  private getMockAnnoucements(): string[] {
    return [
      'Le dojo sera fermé le 1er janvier pour le Nouvel An.'
    ];
  }

  // Mock data for competition summaries
  private getMockCompetitionsSummary(): CompetitionSummary[] {
    return [
      {
        id: 1,
        name: 'Championnat provincial de judo 2024',
        date: new Date('2024-11-15'),
        location: 'Centre Claude-Robillard, Montréal',
        image: '/assets/images/forTesting/comp1-V.jpg',
        participantCount: 8,
        medals: {
          gold: 3,
          silver: 2,
          bronze: 4
        }
      },
      {
        id: 2,
        name: 'Coupe Louis Deschênes 2024',
        date: new Date('2024-09-20'),
        location: 'Centre Pierre-Charbonneau, Montréal',
        image: '/assets/images/forTesting/comp2-H.jpg',
        participantCount: 12,
        medals: {
          gold: 5,
          silver: 3,
          bronze: 2
        }
      },
      {
        id: 3,
        name: 'Tournoi régional de Boucherville',
        date: new Date('2024-06-10'),
        location: 'Complexe sportif de Boucherville',
        image: '/assets/images/forTesting/comp3-H.jpg',
        participantCount: 15,
        medals: {
          gold: 2,
          silver: 4,
          bronze: 6
        }
      },
      {
        id: 4,
        name: 'Championnats du Québec 2024',
        date: new Date('2024-03-22'),
        location: 'Université Laval, Québec',
        image: '/assets/images/forTesting/comp4-V.jpg',
        participantCount: 6,
        medals: {
          gold: 1,
          silver: 2,
          bronze: 1
        }
      },
      {
        id: 5,
        name: 'Tournoi Ne-waza 2024',
        date: new Date('2024-01-18'),
        location: 'Centre sportif Claude-Robillard',
        //No image for this one
        participantCount: 10,
        medals: {
          gold: 4,
          silver: 1,
          bronze: 3
        }
      }
    ];
  }

  // Mock data for actualite summaries
  private getMockActualiteSummary(): ActualiteSummary[] {
    return [
      {
        id: 1,
        title: 'Nouvelle saison de judo : inscriptions ouvertes',
        publishedDate: new Date('2024-12-10'),
        image: '/assets/images/forTesting/act1-H.jpg'
      },
      {
        id: 2,
        title: 'Excellent résultats au championnat provincial',
        publishedDate: new Date('2024-11-28'),
        image: '/assets/images/forTesting/act2-V.jpg'
      },
      {
        id: 3,
        title: 'Stage d\'été avec maître Yamamoto',
        publishedDate: new Date('2024-11-15'),
        image: '/assets/images/forTesting/act3-H.jpg'
      },
      {
        id: 4,
        title: 'Nouveaux horaires pour les cours adultes',
        publishedDate: new Date('2024-10-30')
        // No image for this one
      },
      {
        id: 5,
        title: 'Démonstration de judo à l\'école primaire',
        publishedDate: new Date('2024-10-15'),
        image: '/assets/images/forTesting/act4-V.jpg'
      },
      {
        id: 6,
        title: 'Remise des ceintures de fin d\'année',
        publishedDate: new Date('2024-09-20')
        // No image for this one
      }
    ];
  }

  // Mock data for athletes
  private getMockAllAthletes(): AthleteSummary[] {
    return [
      // Recreation team
      {
        id: 1,
        name: 'Vincent-Claude Roberge-Poitras',
        categorieAge: 'U16',
        profilePicture: '/assets/images/forTesting/ana.jpg'
      },
      {
        id: 2,
        name: 'Marc Dubois',
        categorieAge: 'U18',
        profilePicture: '/assets/images/forTesting/ana.jpg'
      },
      {
        id: 3,
        name: 'Émilie Bouchard',
        categorieAge: 'Senior'
      },
      {
        id: 4,
        name: 'Lucas Martin',
        categorieAge: 'U16',
        profilePicture: '/assets/images/forTesting/ana.jpg'
      },
      {
        id: 5,
        name: 'Camille Lavoie',
        categorieAge: 'U18'
      },

      // Competition team
      {
        id: 6,
        name: 'Alexandre Côté',
        categorieAge: 'Senior',
        profilePicture: '/assets/images/forTesting/ana.jpg'
      },
      {
        id: 7,
        name: 'Gabrielle Roy',
        categorieAge: 'U18',
        profilePicture: '/assets/images/forTesting/ana.jpg'
      },
      {
        id: 8,
        name: 'Thomas Leblanc',
        categorieAge: 'U16',
      },
      {
        id: 9,
        name: 'Sarah Gagnon',
        categorieAge: 'Senior'
      },
      {
        id: 10,
        name: 'Antoine Moreau',
        categorieAge: 'U18',
        profilePicture: '/assets/images/forTesting/ana.jpg'
      },
      {
        id: 11,
        name: 'Maxime Girard',
        categorieAge: 'Senior',
        profilePicture: '/assets/images/forTesting/ana.jpg'
      },
      {
        id: 12,
        name: 'Jade Pelletier',
        categorieAge: 'U16'
      }
    ];
  }

  // Mock data for athlete detail
  private getMockAthleteDetail(id: number): AthleteDetail | null {
    // For testing, return detailed data for athlete with id 1
    if (id === 1) {
      return {
        nom: 'Vincent-Claude Roberge-Poitras',
        dateDeNaissance: new Date('2008-03-15'),
        debutJudo: 2018,
        grade: 'Ceinture orange',
        objectifCourtTerme: 'Obtenir ma ceinture verte et participer au championnat provincial',
        objectifLongTerme: 'Faire partie de l\'équipe du Québec et représenter le Canada aux championnats internationaux',
        listePhoto: [
          '/assets/images/forTesting/ana.jpg',
          '/assets/images/forTesting/comp1-V.jpg',
          '/assets/images/forTesting/comp2-H.jpg'
        ],
        listeShowcasePictures: [
          '/assets/images/forTesting/ana.jpg',
          '/assets/images/forTesting/comp1-V.jpg'
        ],
        listeResultats: [
          {
            nbVictoire: 4,
            nbDefaites: 1,
            position: 1,
            categorieAge: 'U16',
            categoriePoids: '-55kg',
            estInteressant: true,
            athleteId: 1,
            athleteNom: 'Vincent-Claude Roberge-Poitras',
            competitionId: 1,
            competitionNom: 'Championnat provincial de judo 2024'
          },
          {
            nbVictoire: 3,
            nbDefaites: 2,
            position: 2,
            categorieAge: 'U16',
            categoriePoids: '-55kg',
            estInteressant: true,
            athleteId: 1,
            athleteNom: 'Vincent-Claude Roberge-Poitras',
            competitionId: 2,
            competitionNom: 'Coupe Louis Deschênes 2024'
          },
          {
            nbVictoire: 2,
            nbDefaites: 1,
            position: 3,
            categorieAge: 'U16',
            categoriePoids: '-55kg',
            estInteressant: false,
            athleteId: 1,
            athleteNom: 'Vincent-Claude Roberge-Poitras',
            competitionId: 3,
            competitionNom: 'Tournoi régional de Boucherville'
          },
          {
            nbVictoire: 1,
            nbDefaites: 3,
            position: 7,
            categorieAge: 'U16',
            categoriePoids: '-55kg',
            estInteressant: false,
            athleteId: 1,
            athleteNom: 'Vincent-Claude Roberge-Poitras',
            competitionId: 4,
            competitionNom: 'Championnats du Québec 2024'
          },
          {
            nbVictoire: 5,
            nbDefaites: 0,
            position: 1,
            categorieAge: 'U16',
            categoriePoids: '-55kg',
            estInteressant: true,
            athleteId: 1,
            athleteNom: 'Vincent-Claude Roberge-Poitras',
            competitionId: 5,
            competitionNom: 'Tournoi Ne-waza 2024'
          },
          {
            nbVictoire: 2,
            nbDefaites: 2,
            categorieAge: 'U16',
            categoriePoids: '-55kg',
            estInteressant: false,
            athleteId: 1,
            athleteNom: 'Vincent-Claude Roberge-Poitras',
            competitionId: 6,
            competitionNom: 'Tournoi local de Longueuil'
          }
        ]
      };
    }

    // Return null for other athlete IDs (not implemented yet)
    return null;
  }

  // Mock data for administration
  private getMockAdministration(): Administration[] {
    return [
      {
        id: 1,
        nom: 'Marie-Claire Dupont',
        role: 'Présidente',
        email: 'president@judoboucherville.ca',
        photo: '/assets/images/forTesting/ana.jpg'
      },
      {
        id: 2,
        nom: 'Jean-François Tremblay',
        role: 'Vice-président',
        email: 'vicepresident@judoboucherville.ca'
        // No photo - will use default
      },
      {
        id: 3,
        nom: 'Sophie Bergeron',
        role: 'Secrétaire-trésorière',
        email: 'secretaire@judoboucherville.ca',
        photo: '/assets/images/forTesting/ana.jpg'
      },
      {
        id: 4,
        nom: 'Marc-André Gagnon',
        role: 'Directeur technique',
        email: 'technique@judoboucherville.ca'
        // No photo - will use default
      },
      {
        id: 5,
        nom: 'Catherine Rousseau',
        role: 'Responsable communications',
        email: 'communications@judoboucherville.ca',
        photo: '/assets/images/forTesting/ana.jpg'
      }
    ];
  }
}
