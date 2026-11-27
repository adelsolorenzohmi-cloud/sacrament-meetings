import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!Number.isInteger(id) || id < 1 || id > 2147483647) {
        return { title: 'Meeting Not Found' };
    }

    const meeting = await getMeetingById(id);

    if (!meeting) {
        return { title: 'Meeting Not Found' };
    }

    const title = `Meeting on ${meeting.date}`;
    const description = `${meeting.meetingType} program for ${meeting.date} in Central Ward.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    };
}

export default async function MeetingDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!Number.isInteger(id) || id < 1 || id > 2147483647) {
        notFound();
    }

    const meeting = await getMeetingById(id);

    if (!meeting) {
        notFound();
    }

    // Only signed-in bishopric members see the edit link
    const session = await auth();
    const isAdmin = Boolean(session?.user);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between print:hidden">
                <Link
                    href="/meetings"
                    className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                    &larr; All meetings
                </Link>
                {isAdmin && (
                    <Link
                        href={`/dashboard/meetings/${meeting.id}/edit`}
                        className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                    >
                        Edit meeting
                    </Link>
                )}
            </div>
            <MeetingDetail meeting={meeting} />
        </div>
    );
}