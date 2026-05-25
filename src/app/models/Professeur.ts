export interface Professeur {
    id: number;
    nom: string;
    titre?: string;
    grade: string;
    certification: string;
    affiliation: string;
    estAncien: boolean;
    photo?: string;
}