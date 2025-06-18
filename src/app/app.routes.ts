import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AthleteIndexComponent } from './athlete-index/athlete-index.component';

export const routes: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Default route redirects to accueil
    { path: 'accueil', component: AccueilComponent },
    { path: 'athletes/:team', component: AthleteIndexComponent },
    { path: 'athletes', component: AthleteIndexComponent },

    { path: '**', redirectTo: '/accueil' } // Wildcard route for 404 place at the end
];
