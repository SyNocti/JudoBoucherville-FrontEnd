import { Resultat } from './Resultat';

export interface AthleteDetail {
    nom: string;
    dateDeNaissance: Date;
    equipe: string;
    niveau?: string;
    debutJudo?: number;
    finJudo?: number;
    grade?: string;
    objectifCourtTerme?: string;
    objectifLongTerme?: string;
    profilePicture?: string;
    backPicture?: string;
    listePhoto?: string[];
    listeResultats?: Resultat[];
}