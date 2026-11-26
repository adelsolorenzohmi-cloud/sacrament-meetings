import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';
import SignOutButton from '@/components/SignOutButton';

export const metadata: Metadata = {
    title: 'Manage Meetings',
    description: 'Create, edit, and delete sacrament meeting programs.',
};

export default async function DashboardMeetingsPage(props: {
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
        redirect(`/dashboard/meetings?${params.toString()}`);
    }

    const meetings = await getMeetings(query, currentPage);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Manage Meetings
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        <Link href="/dashboard" className="text-blue-700 hover:underline">
                            &larr; Back to Dashboard
                        </Link>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/meetings/new"
                        className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                    >
                        New Meeting
                    </Link>
                    <SignOutButton />
                </div>
            </div>

            <MeetingSearch />

            {meetings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                    <p className="text-gray-600">No meetings found matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} showAdminActions />
                    ))}
                </div>
            )}

            <Pagination totalPages={totalPages} />
        </div>
    );
}