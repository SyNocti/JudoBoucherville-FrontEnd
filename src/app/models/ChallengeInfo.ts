// Challenge Info interfaces for Angular
export interface ChallengeInfo {
    id: number;
    title: string;
    introduction: string;
    date: Date;
    competitionDate: string;
    location: string;
    honoraryPresident: string;
    categories: string;
    rewards: string;
    registrationCost: string;
    deadlineNA: string;
    deadlineWorld: string;
    otherInfo?: string | null;
    livestreamActive: boolean;
    livestreamUrl?: string | null;
    images: string[];
    infoFiles: InfoFile[];
    sponsors: ChallengeSponsor[];
}

export interface InfoFile {
    title: string;
    fileName: string;
}

export interface ChallengeSponsor {
    id: number;
    name: string;
    logoFileName: string;
    url?: string | null;
}