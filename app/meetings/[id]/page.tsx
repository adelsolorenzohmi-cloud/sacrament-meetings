import { notFound } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';

async function getMeeting(id: string): Promise<SacramentMeeting | null> {
    const res = await fetch(`http://localhost:3000/api/meetings`, { cache: 'no-store' });
    if (!res.ok) return null;
    const meetings: SacramentMeeting[] = await res.json();
    return meetings.find((m) => String(m.id) === String(id) || String((m as any)._id) === String(id)) || meetings[0] || null;
}

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const meeting = await getMeeting(id);

    if (!meeting) {
        notFound();
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Sacrament Meeting Program</h1>
            <p className="text-gray-600 mb-6">{meeting.date} • {meeting.meetingType}</p>
            <div className="bg-white shadow rounded-lg p-6 space-y-4">
                <div><strong>Presiding:</strong> {meeting.presiding}</div>
                <div><strong>Conducting:</strong> {meeting.conducting}</div>
            </div>
        </main>
    );
}