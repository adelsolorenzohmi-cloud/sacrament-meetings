import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
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

    // Signed-in bishopric members see Edit/Delete; everyone else sees a read-only list
    const session = await auth();
    const isAdmin = Boolean(session?.user);

    const totalPages = await getMeetingsTotalPages(query);

    if (totalPages > 0 && currentPage > totalPages) {
        const params = new URLSearchParams({ page: String(totalPages) });
        if (query) params.set('query', query);
        redirect(`/meetings?${params.toString()}`);
    }

    const meetings = await getMeetings(query, currentPage);

    return (
        <div className="space-y-6">
            <h1 className="sr-only">All Meetings</h1>

            {isAdmin && (
                <div className="flex justify-end">
                    <Link
                        href="/dashboard/meetings/new"
                        className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                    >
                        New Meeting
                    </Link>
                </div>
            )}

            <MeetingSearch />

            {meetings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                    <p className="text-gray-600">No meetings found matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {meetings.map((meeting) => (
                        <MeetingCard
                            key={meeting.id}
                            meeting={meeting}
                            showAdminActions={isAdmin}
                        />
                    ))}
                </div>
            )}

            <Pagination totalPages={totalPages} />
        </div>
    );
}