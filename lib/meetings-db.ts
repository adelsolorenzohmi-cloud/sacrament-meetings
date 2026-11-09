import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-05-03',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Youth Choir', topic: '', type: 'musical-number' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis',
        announcements: ['Ward temple night: May 10']
    },
    {
        id: 2,
        date: '2026-05-10',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Davis',
        openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
        openingPrayer: 'Brother Johnson',
        wardBusiness: [{ description: 'Release of Sunday School teachers' }],
        stakeBusiness: false,
        sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
        speakers: [
            { name: 'Brother Taylor', topic: 'Priesthood Power', type: 'speaker' },
            { name: 'Sister Martinez', topic: 'Temple Covenants', type: 'speaker' }
        ],
        closingHymn: { number: 292, title: 'O Lord, Whose Mercies Numberless' },
        closingPrayer: 'Sister Garcia',
        announcements: ['Mother’s Day celebration next Sunday']
    },
    {
        id: 3,
        date: '2026-05-17',
        meetingType: 'testimony',
        presiding: 'Bishop Smith',
        conducting: 'Bishop Smith',
        openingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
        openingPrayer: 'Brother Lee',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
        speakers: [], // Testimony meeting has open microphone
        closingHymn: { number: 247, title: 'We Meet Again as Sisters' },
        closingPrayer: 'Sister Anderson',
        announcements: []
    },
    {
        id: 4,
        date: '2026-05-24',
        meetingType: 'stake',
        presiding: 'President Vance',
        conducting: 'President Clark',
        openingHymn: { number: 33, title: 'Our Mountain Home so Dear' },
        openingPrayer: 'Brother White',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
        speakers: [
            { name: 'Sister Harris', topic: 'Ministering with Love', type: 'speaker' },
            { name: 'President Vance', topic: 'Strengthening Families', type: 'speaker' }
        ],
        closingHymn: { number: 67, title: 'Glory to God on High' },
        closingPrayer: 'Brother Robinson',
        announcements: ['Stake youth conference: May 29-30']
    },
    {
        id: 5,
        date: '2026-11-08', // Close to current date for testing /meetings/current
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 26, title: 'Joseph Smith’s First Prayer' },
        openingPrayer: 'Sister Clark',
        wardBusiness: [{ description: 'Ward service project announcements' }],
        stakeBusiness: false,
        sacramentHymn: { number: 196, title: 'Jesus, Once of Humble Birth' },
        speakers: [
            { name: 'Brother Evans', topic: 'Gratitude and Prayer', type: 'speaker' }
        ],
        closingHymn: { number: 152, title: 'God Be With You Till We Meet Again' },
        closingPrayer: 'Brother Young',
        announcements: ['Ward Thanksgiving dinner: November 20']
    }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}