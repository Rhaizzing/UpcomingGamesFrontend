export enum EsrbRating {
    E = 'E',
    E10 = 'E10',
    M = 'M',
    Rp = 'RP',
    T = 'T',
}

export enum PegiRating {
    Eighteen = 'Eighteen',
    Seven = 'Seven',
    Sixteen = 'Sixteen',
    Three = 'Three',
    Twelve = 'Twelve',
}

export interface ReleaseDate {
    firstReleaseDate: string | null;
    worldwide: Record<string, string>;
    northAmerica: Record<string, string>;
    europe: Record<string, string>;
    australia: Record<string, string>;
    newZealand: Record<string, string>;
    japan: Record<string, string>;
    china: Record<string, string>;
    asia: Record<string, string>;
}

export interface UpcomingGame {
    id: number;
    name: string;
    releaseDate: ReleaseDate;
    fullReleaseDate: ReleaseDate;
    coverUrl: null | string;
    score: null;
    esrbRating: EsrbRating | null;
    pegiRating: PegiRating | null;
    isReleased: boolean;
    urls: { [key: string]: null | string };
    igdbId: number;
}
