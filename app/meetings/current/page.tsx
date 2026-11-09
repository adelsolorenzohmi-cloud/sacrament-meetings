import { redirect } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';

export default async function CurrentMeetingPage() {
    const res = await fetch('/api/meetings', { cache: 'no-store' });
    if (!res.ok) redirect('/meetings');
    const meetings: SacramentMeeting[] = await res.json();

    if (!meetings || meetings.length === 0) {
        redirect('/meetings');
    }

    // Grab the first meeting's identifier (supporting both 'id' and '_id')
    const target = meetings[0];
    const meetingId = (target as any).id || (target as any)._id;

    if (meetingId) {
        redirect(`/meetings/${meetingId}`);
    }

    redirect('/meetings');
}