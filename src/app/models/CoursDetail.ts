export interface CoursDetail {
    id: number;
    nom: string;
    description: string;
    horaire: string;
    inscriptionUrl: string;
    prealable?: string;
    infoSupplementaire?: string;
    categorie: string;
    clientele?: string;
    imageUrl?: string;
    optionsPaiement: OptionPaiementCours[];
    professeurs: ProfesseurSummary[];
}

export interface OptionPaiementCours {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    dateLimiteTarifPreferentiel: Date;
    prixAvantDateLimite: number;
    prixApresDateLimite: number;
}

export interface ProfesseurSummary {
    id: number;
    nom: string;
    titre?: string;
    grade: string;
    certification: string;
}