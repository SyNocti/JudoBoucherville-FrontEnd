export interface ActualiteDetail {
    id: number;
    titre: string;
    contenu?: string;
    dateEvenement?: Date;
    lieu?: string;
    lienWeb?: string;
    dateModification: Date;
    estArchive: boolean;
    imagePrincipale?: string;
    images?: string[];
}