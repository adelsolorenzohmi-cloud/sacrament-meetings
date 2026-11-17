import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

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

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between print:hidden">
                <Link
                    href="/meetings"
                    className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                    &larr; All meetings
                </Link>
                <Link
                    href={`/meetings/${meeting.id}/edit`}
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                    Edit meeting
                </Link>
            </div>
            <MeetingDetail meeting={meeting} />
        </div>
    );
}