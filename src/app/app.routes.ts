import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AthleteIndexComponent } from './athlete-index/athlete-index.component';
import { AthleteDetailComponent } from './athlete-detail/athlete-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: 'accueil', component: AccueilComponent },
    { path: 'athletes/:team', component: AthleteIndexComponent },
    { path: 'athletes/profile/:id', component: AthleteDetailComponent },
    { path: 'athletes', component: AthleteIndexComponent },

    { path: '**', redirectTo: '/accueil' } //Always at the end
];
