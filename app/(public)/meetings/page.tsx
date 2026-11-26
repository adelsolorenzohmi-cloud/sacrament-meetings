import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';

export const metadata: Metadata = {
    title: 'Meetings',
    description: 'Browse upcoming and past sacrament meeting programs for Central Ward.',
};

export default async function MeetingsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const rawPage = Number(searchParams?.page);
    const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

    const totalPages = await getMeetingsTotalPages(query);

    if (totalPages > 0 && currentPage > totalPages) {
        const params = new URLSearchParams({ page: String(totalPages) });
        if (query) params.set('query', query);
        redirect(`/meetings?${params.toString()}`);
    }

    const meetings = await getMeetings(query, currentPage);

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Sacrament Meetings
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                    Weekly meeting schedules, hymns, speakers, and announcements.
                </p>
            </div>

            <MeetingSearch />

            {meetings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                    <p className="text-gray-600">No meetings found matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            )}

            <Pagination totalPages={totalPages} />
        </div>
    );
}