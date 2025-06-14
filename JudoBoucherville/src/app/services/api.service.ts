import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FuturEvent } from '../models/FuturEvent';

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
}
