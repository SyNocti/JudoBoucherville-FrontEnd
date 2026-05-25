import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AthleteIndexComponent } from './sectionAthlete/athlete-index/athlete-index.component';
import { AthleteDetailComponent } from './sectionAthlete/athlete-detail/athlete-detail.component';
import { CeintureNoiresComponent } from './sectionClub/ceinture-noires/ceinture-noires.component';
import { HistoireComponent } from './sectionClub/histoire/histoire.component';
import { AdministrationComponent } from './sectionClub/administration/administration.component';
import { PresidentsComponent } from './sectionClub/presidents/presidents.component';
import { ProfesseursIndexComponent } from './sectionClub/professeurs-index/professeurs-index.component';
import { CompetitionDetailComponent } from './sectionArchive/competition-detail/competition-detail.component';
import { ActualiteDetailComponent } from './sectionArchive/actualite-detail/actualite-detail.component';
import { TelechargementsComponent } from './sectionClub/telechargements/telechargements.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { EquipeIndexComponent } from './sectionAthlete/equipe-index/equipe-index.component';
import { ArchiveAnneeComponent } from './sectionArchive/archive-annee/archive-annee.component';
import { ArchiveItemListComponent } from './sectionArchive/archive-item-list/archive-item-list.component';
import { CoursListComponent } from './sectionCours/cours-list/cours-list.component';
import { CoursDetailComponent } from './sectionCours/cours-detail/cours-detail.component';
import { CoursSportEtudeComponent } from './sectionCours/cours-sport-etude/cours-sport-etude.component';
import { CoursCampsDeJourComponent } from './sectionCours/cours-camps-de-jour/cours-camps-de-jour.component';
import { ChallengeComponent } from './sectionChallenge/challenge/challenge.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { ChallengeLiveComponent } from './sectionChallenge/challenge-live/challenge-live.component';
import { ChallengeInscriptionComponent } from './sectionChallenge/challenge-inscription/challenge-inscription.component';
import { ChallengeHistoryComponent } from './sectionChallenge/challenge-history/challenge-history.component';
import { CoursParascolaireComponent } from './sectionCours/cours-parascolaire/cours-parascolaire.component';

export const routes: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: 'accueil', component: AccueilComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'faq', component: FaqComponent },

    { path: 'athletes', component: AthleteIndexComponent },
    { path: 'athletes/equipes', component: EquipeIndexComponent },
    { path: 'athletes/:group', component: AthleteIndexComponent },
    { path: 'athletes/profile/:id', component: AthleteDetailComponent },

    { path: 'club', component: HistoireComponent },
    { path: 'club/histoire', component: HistoireComponent },
    { path: 'club/ceintures', component: CeintureNoiresComponent },
    { path: 'club/administration', component: AdministrationComponent },
    { path: 'club/professeurs', component: ProfesseursIndexComponent },
    { path: 'club/presidents', component: PresidentsComponent },
    { path: 'club/telechargement', component: TelechargementsComponent },

    { path: 'cours/liste', component: CoursListComponent },
    { path: 'cours/detail/:id', component: CoursDetailComponent },
    { path: 'cours/sport-etude', component: CoursSportEtudeComponent },
    { path: 'cours/camps-de-jour', component: CoursCampsDeJourComponent },
    { path: 'cours/sport-etude', component: CoursSportEtudeComponent },
    { path: 'cours/camps-de-jour', component: CoursCampsDeJourComponent },
    { path: 'cours/parascolaire', component: CoursParascolaireComponent },

    { path: 'challenge', component: ChallengeComponent },
    { path: 'challenge/live', component: ChallengeLiveComponent },
    { path: 'challenge/inscription', component: ChallengeInscriptionComponent },
    { path: 'challenge/historique', component: ChallengeHistoryComponent },

    { path: 'boutique', component: BoutiqueComponent },

    { path: 'competition/detail/:id', component: CompetitionDetailComponent },

    { path: 'actualite/detail/:id', component: ActualiteDetailComponent },

    { path: 'archive/:type', component: ArchiveAnneeComponent },
    { path: 'archive/:type/:year', component: ArchiveItemListComponent },

    { path: '**', redirectTo: '/accueil' } //Always at the end
];
