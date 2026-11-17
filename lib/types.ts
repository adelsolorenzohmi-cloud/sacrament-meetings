export const MEETING_TYPES = [
    'Sacrament Meeting',
    'Fast and Testimony Meeting',
] as const;

export interface SacramentMeeting {
    id: number;
    date: string; // 'YYYY-MM-DD'
    meetingType: string;
    presiding: string;
    conducting: string;
    announcements: string | null;
    openingHymn: number;
    openingPrayer: string;
    wardBusiness: string | null;
    stakeBusiness: string | null;
    sacramentHymn: number;
    speakers: string[] | null;
    closingHymn: number;
    closingPrayer: string;
}