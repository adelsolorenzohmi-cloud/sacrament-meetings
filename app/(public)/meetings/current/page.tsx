import { redirect } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';

export default async function CurrentMeetingPage() {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
    if (!res.ok) redirect('/meetings');
    const meetings: SacramentMeeting[] = await res.json();

    if (!meetings || meetings.length === 0) {
        redirect('/meetings');
    }

    const target = meetings[0];
    const meetingId = (target as any).id || (target as any)._id;

    if (meetingId) {
        redirect(`/meetings/${meetingId}`);
    }

    redirect('/meetings');
}