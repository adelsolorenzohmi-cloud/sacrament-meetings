import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetingsData(): Promise<SacramentMeeting[]> {
    // Fetching from our local API route
    const res = await fetch('http://localhost:3000/api/meetings', { cache: 'no-store' });
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