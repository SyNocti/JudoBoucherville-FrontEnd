export interface Resultat {
    nbVictoire: number;
    nbDefaites: number;
    position?: number;
    categorieAge: string;
    categoriePoids: string;
    estInteressant: boolean;
    athleteId: number;
    athleteNom: string;
    competitionId: number;
    competitionNom: string;
}