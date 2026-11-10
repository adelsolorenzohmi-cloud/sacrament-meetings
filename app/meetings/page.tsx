import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetingsData(): Promise<SacramentMeeting[]> {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch meetings');
    }
    return res.json();
}

export default async function MeetingsPage() {
    const meetings = await getMeetingsData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
        </div>
    );
}