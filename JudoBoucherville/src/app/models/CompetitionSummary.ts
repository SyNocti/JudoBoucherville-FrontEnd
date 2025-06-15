export interface CompetitionSummary {
    id: number;
    name: string;
    date: Date;
    location: string;
    image?: string;
    participantCount: number;
    medals: {
        gold: number;
        silver: number;
        bronze: number;
    };
}