import { Resultat } from './Resultat';

export interface AthleteDetail {
    nom: string;
    dateDeNaissance: Date;
    debutJudo?: number;
    grade?: string;
    objectifCourtTerme?: string;
    objectifLongTerme?: string;
    listePhoto?: string[];
    listeShowcasePictures?: string[];
    listeResultats?: Resultat[];
}