export interface ParaScolaire {
    id: number;
    fichierNoms?: string[];
    titre: string;
    years: string;
    season: string;
    inscriptionUrl: string;
    description: string;
    
    // Contact person
    contactName?: string;
    contactPhone?: string;
    contactEmail?: string;
}