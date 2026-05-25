import { Resultat } from './Resultat';

export interface CompetitionDetail {
    id: number;
    nom: string;
    date: Date;
    lieu: string;
    listeResultats?: Resultat[];
    photo?: string;
}