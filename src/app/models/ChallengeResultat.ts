export interface ChallengeResultat {
  id: number;
  year: number;
  categoryAge: string;
  categoryAgeValue: number;
  teamName: string;
  placement: number;
  sponsorName: string;
  isBestFighter: boolean;
}

export interface ChallengeResultatCategory {
  categoryAge: string;
  categoryAgeValue: number;
  results: ChallengeResultat[];
}

export interface ChallengeResultatYear {
  year: number;
  categories: ChallengeResultatCategory[];
}

export enum CategoryAge {
  U10 = 0,
  U12 = 1,
  U14 = 2,
  U16 = 3,
  U18 = 4,
  U21 = 5,
  U21_Senior = 6,
  Senior = 7,
  Veteran = 8,
  Ne_Waza = 9
}

export function getCategoryAgeLabel(value: number): string {
  switch (value) {
    case CategoryAge.U10: return 'U10';
    case CategoryAge.U12: return 'U12';
    case CategoryAge.U14: return 'U14';
    case CategoryAge.U16: return 'U16';
    case CategoryAge.U18: return 'U18';
    case CategoryAge.U21: return 'U21';
    case CategoryAge.U21_Senior: return 'U21/Senior';
    case CategoryAge.Senior: return 'Senior';
    case CategoryAge.Veteran: return 'Vétéran';
    case CategoryAge.Ne_Waza: return 'Ne-Waza';
    default: return '';
  }
}
