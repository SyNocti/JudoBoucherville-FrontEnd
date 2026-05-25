import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FuturEvent } from '../models/FuturEvent';
import { CompetitionSummary } from '../models/CompetitionSummary';
import { CompetitionDetail } from '../models/CompetitionDetail';
import { ActualiteSummary } from '../models/ActualiteSummary';
import { ActualiteDetail } from '../models/ActualiteDetail';
import { AthleteSummary } from '../models/AthleteSummary';
import { AthleteDetail } from '../models/AthleteDetail';
import { Resultat } from '../models/Resultat';
import { MessagesImportant } from '../models/MessagesImportant';
import { Administration } from '../models/Administration';
import { Professeur } from '../models/Professeur';
import { CeintureNoire } from '../models/CeintureNoire';
import { President } from '../models/President';
import { Telechargement } from '../models/Telechargement';
import { Question } from '../models/Question';
import { Journal } from '../models/Journal';
import { CoursDetail } from '../models/CoursDetail';
import { CoursSummary } from '../models/CoursSummary';
import { SportEtude } from '../models/SportEtude';
import { CampsDeJour } from '../models/CampsDeJour';
import { ParaScolaire } from '../models/ParaScolaire';
import { ChallengeInfo } from '../models/ChallengeInfo';
import { CacheService } from './cache.service';
import { ChallengeInscription } from '../models/ChallengeInscription';
import { ConfigService } from './config.service';
import { ChallengeResultat, ChallengeResultatYear } from '../models/ChallengeResultat';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private domain: string;

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private configService: ConfigService
  ) {
    this.domain = this.configService.getDomain();
  }

  // Utility functions for file paths
  getImageUrl(fileName: string): string {
    return this.configService.getImageUrl(fileName);
  }

  getFileUrl(fileName: string): string {
    return this.configService.getFileUrl(fileName);
  }

  getCompetitions(): Observable<FuturEvent[]> {
    const cacheKey = 'competitions';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<FuturEvent[]>(`${this.domain}api/CompetitionsAPI`)
    );
  }

  getEvents(): Observable<FuturEvent[]> {
    const cacheKey = 'events';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<FuturEvent[]>(`${this.domain}api/ActualitesAPI`)
    );
  }

  getAnnouncements(): Observable<MessagesImportant[]> {
    return this.http.get<MessagesImportant[]>(`${this.domain}api/MessagesImportantAPI`);
  }

  getCompetitionsSummary(): Observable<CompetitionSummary[]> {
    const cacheKey = 'competitions-summary';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<CompetitionSummary[]>(`${this.domain}api/CompetitionsAPI/Summary`)
    );
  }

  getActualiteSummary(): Observable<ActualiteSummary[]> {
    const cacheKey = 'actualite-summary';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ActualiteSummary[]>(`${this.domain}api/ActualitesAPI/Summary`)
    );
  }

  getAllAthletes(team?: string): Observable<AthleteSummary[]> {
    if (team) {
      const teamId = this.getTeamId(team);
      const cacheKey = `athletes-team-${teamId}`;
      return this.cacheService.cacheObservable(
        cacheKey,
        this.http.get<AthleteSummary[]>(`${this.domain}api/AthletesAPI/Team/${teamId}`)
      );
    }
    const cacheKey = 'athletes-all';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<AthleteSummary[]>(`${this.domain}api/AthletesAPI/List`)
    );
  }

  getAthletesByNiveau(niveau: string): Observable<AthleteSummary[]> {
    const cacheKey = `athletes-niveau-${niveau}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<AthleteSummary[]>(`${this.domain}api/AthletesAPI/Niveau/${niveau}`)
    );
  }

  getAthleteDetail(id: number): Observable<AthleteDetail | null> {
    const cacheKey = `athlete-detail-${id}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<AthleteDetail>(`${this.domain}api/AthletesAPI/${id}`)
    );
  }

  getAdministration(): Observable<Administration[]> {
    const cacheKey = 'administration';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<Administration[]>(`${this.domain}api/AdministrationMembresAPI`)
    );
  }

  getCeinturesNoires(): Observable<CeintureNoire[]> {
    const cacheKey = 'ceintures-noires';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<CeintureNoire[]>(`${this.domain}api/CeintureNoireMembresAPI`)
    );
  }

  getProfesseurs(): Observable<Professeur[]> {
    const cacheKey = 'professeurs';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<Professeur[]>(`${this.domain}api/ProfesseurAPI`)
    );
  }

  getCompetitionDetail(id: number): Observable<CompetitionDetail> {
    const cacheKey = `competition-detail-${id}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<CompetitionDetail>(`${this.domain}api/CompetitionsAPI/Detail/${id}`)
    );
  }

  getActualiteDetail(id: number): Observable<ActualiteDetail> {
    const cacheKey = `actualite-detail-${id}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ActualiteDetail>(`${this.domain}api/ActualitesAPI/Detail/${id}`)
    );
  }

  getPresidents(): Observable<President[]> {
    const cacheKey = 'presidents';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<President[]>(`${this.domain}api/PresidentsAPI`)
    );
  }

  getTelechargements(): Observable<Telechargement[]> {
    const cacheKey = 'telechargements';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<Telechargement[]>(`${this.domain}api/TelechargementsAPI`)
    );
  }

  getQuestions(): Observable<Question[]> {
    const cacheKey = 'questions';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<Question[]>(`${this.domain}api/QuestionsAPI`)
    );
  }

  getArchiveYears(type: string): Observable<number[]> {
    const cacheKey = `archive-years-${type}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<number[]>(`${this.domain}api/ArchivesAPI/Years/${type}`)
    );
  }

  getArchiveJournals(year: number): Observable<Journal[]> {
    const cacheKey = `archive-journals-${year}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<Journal[]>(`${this.domain}api/ArchivesAPI/journaux/${year}`)
    );
  }

  getArchiveCompetitions(year: number): Observable<CompetitionSummary[]> {
    const cacheKey = `archive-competitions-${year}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<CompetitionSummary[]>(`${this.domain}api/ArchivesAPI/resultats/${year}`)
    );
  }

  getArchiveActualites(year: number): Observable<ActualiteSummary[]> {
    const cacheKey = `archive-actualites-${year}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ActualiteSummary[]>(`${this.domain}api/ArchivesAPI/actualites/${year}`)
    );
  }

  // GET: api/CoursAPI
  getCours(): Observable<CoursSummary[]> {
    const cacheKey = 'cours';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<CoursSummary[]>(`${this.domain}api/CoursAPI`)
    );
  }

  // GET: api/CoursAPI/{id}
  getCoursDetail(id: number): Observable<CoursDetail> {
    const cacheKey = `cours-detail-${id}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<CoursDetail>(`${this.domain}api/CoursAPI/${id}`)
    );
  }

  // GET: api/SportEtudeAPI
  getSportEtude(): Observable<SportEtude> {
    const cacheKey = 'sport-etude';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<SportEtude[]>(`${this.domain}api/SportEtudeAPI`).pipe(
        map(array => array && array.length > 0 ? array[0] : {} as SportEtude)
      )
    );
  }

  // GET: api/CampsDeJourAPI
  getCampsDeJour(): Observable<CampsDeJour> {
    const cacheKey = 'camps-de-jour';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<CampsDeJour[]>(`${this.domain}api/CampsDeJourAPI`).pipe(
        map(array => array && array.length > 0 ? array[0] : {} as CampsDeJour)
      )
    );
  }

  // GET: api/ParaScolaireAPI
  getParaScolaire(): Observable<ParaScolaire> {
    const cacheKey = 'para-scolaire';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ParaScolaire[]>(`${this.domain}api/ParaScolaireAPI`).pipe(
        map(array => array && array.length > 0 ? array[0] : {} as ParaScolaire)
      )
    );
  }

  // GET: api/ChallengeAPI/info
  getChallengeInfo(): Observable<ChallengeInfo> {
    const cacheKey = 'challenge-info';
    
    // Check if we have cached data first
    const cachedData = this.cacheService.get<ChallengeInfo>(cacheKey);
    if (cachedData) {
      const challengeDate = new Date(cachedData.date);
      const now = new Date();
      const timeDiffHours = (challengeDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      // If challenge is within 24 hours, bypass cache for real-time updates
      if (timeDiffHours >= 0 && timeDiffHours <= 24) {
        console.log('Challenge within 24 hours - bypassing cache for real-time updates');
        return this.http.get<ChallengeInfo>(`${this.domain}api/ChallengeAPI/info`);
      }
    }
    
    // Use normal caching for challenges more than 24 hours away
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ChallengeInfo>(`${this.domain}api/ChallengeAPI/info`)
    );
  }

  // GET: api/ChallengeAPI/inscriptions
  getChallengeInscriptions(): Observable<ChallengeInscription[]> {
    const cacheKey = 'challenge-inscriptions';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ChallengeInscription[]>(`${this.domain}api/ChallengeAPI/inscriptions`)
    );
  }

  // Helper method to convert team names to IDs
  private getTeamId(team: string): number {
    switch (team.toLowerCase()) {
      case 'canada':
        return 0;
      case 'quebec':
        return 1;
      case 'sportetude':
      case 'sport-etude':
      case 'sport-études':
        return 2;
      case 'boucherville':
        return 3;
      case 'kata':
        return 4;
      case 'ancien':
      case 'anciens':
        return 5;
      case 'veterans':
        return 6;
      default:
        return 3; // Default to Boucherville if unknown team
    }
  }

  // Cache management methods
  clearCache(): void {
    this.cacheService.clearAll();
  }

  clearCacheForKey(key: string): void {
    this.cacheService.clear(key);
  }

  getCacheStats(): { size: number; keys: string[] } {
    return this.cacheService.getStats();
  }

  // Challenge Resultats API methods
  
  /**
   * Get all Challenge results sorted by year (descending), category and placement
   */
  getAllChallengeResults(): Observable<ChallengeResultat[]> {
    const cacheKey = 'challenge-results-all';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ChallengeResultat[]>(`${this.domain}api/ChallengeResultatsAPI`)
    );
  }

  /**
   * Get Challenge result by ID
   */
  getChallengeResultById(id: number): Observable<ChallengeResultat> {
    return this.http.get<ChallengeResultat>(`${this.domain}api/ChallengeResultatsAPI/${id}`);
  }

  /**
   * Get Challenge results by year
   */
  getChallengeResultsByYear(year: number): Observable<ChallengeResultat[]> {
    const cacheKey = `challenge-results-year-${year}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ChallengeResultat[]>(`${this.domain}api/ChallengeResultatsAPI/year/${year}`)
    );
  }

  /**
   * Get Challenge results by category age value
   */
  getChallengeResultsByCategory(categoryAge: number): Observable<ChallengeResultat[]> {
    const cacheKey = `challenge-results-category-${categoryAge}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ChallengeResultat[]>(`${this.domain}api/ChallengeResultatsAPI/category/${categoryAge}`)
    );
  }

  /**
   * Get available years with Challenge results
   */
  getChallengeAvailableYears(): Observable<number[]> {
    const cacheKey = 'challenge-available-years';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<number[]>(`${this.domain}api/ChallengeResultatsAPI/years`)
    );
  }

  /**
   * Get latest Challenge results (most recent year)
   */
  getLatestChallengeResults(): Observable<ChallengeResultat[]> {
    const cacheKey = 'challenge-results-latest';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ChallengeResultat[]>(`${this.domain}api/ChallengeResultatsAPI/latest`)
    );
  }

  /**
   * Get all Challenge results grouped by year and category
   */
  getGroupedChallengeResults(): Observable<ChallengeResultatYear[]> {
    const cacheKey = 'challenge-results-grouped';
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ChallengeResultatYear[]>(`${this.domain}api/ChallengeResultatsAPI/grouped`)
    );
  }

  /**
   * Get Challenge results for a specific year, grouped by category
   */
  getGroupedChallengeResultsByYear(year: number): Observable<ChallengeResultatYear> {
    const cacheKey = `challenge-results-grouped-${year}`;
    return this.cacheService.cacheObservable(
      cacheKey,
      this.http.get<ChallengeResultatYear>(`${this.domain}api/ChallengeResultatsAPI/grouped/${year}`)
    );
  }
}
