import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AthleteIndexComponent } from './athlete-index/athlete-index.component';
import { AthleteDetailComponent } from './athlete-detail/athlete-detail.component';
import { CeintureNoiresComponent } from './ceinture-noires/ceinture-noires.component';
import { HistoireComponent } from './histoire/histoire.component';
import { AdministrationComponent } from './administration/administration.component';
import { ProfesseursComponent } from './professeurs/professeurs.component';
import { PresidentsComponent } from './presidents/presidents.component';

export const routes: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: 'accueil', component: AccueilComponent },

    { path: 'athletes', component: AthleteIndexComponent },
    { path: 'athletes/:team', component: AthleteIndexComponent },
    { path: 'athletes/profile/:id', component: AthleteDetailComponent },

    { path: 'club', component: HistoireComponent },
    { path: 'club/histoire', component: HistoireComponent },
    { path: 'club/ceintures', component: CeintureNoiresComponent },
    { path: 'club/administration', component: AdministrationComponent },
    { path: 'club/professeurs', component: ProfesseursComponent },
    { path: 'club/presidents', component: PresidentsComponent },

    { path: '**', redirectTo: '/accueil' } //Always at the end
];
