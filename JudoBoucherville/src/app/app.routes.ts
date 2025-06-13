import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
    { path: 'accueil', component: AccueilComponent },
    { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Default route redirects to accueil

    { path: '**', redirectTo: '/accueil' } // Wildcard route for 404 place at the end
];
