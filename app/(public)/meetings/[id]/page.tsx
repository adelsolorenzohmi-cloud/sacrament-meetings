import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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

    return {
        title: `Meeting on ${meeting.date}`,
        description: `${meeting.meetingType} program for ${meeting.date} in Central Ward.`,
    };
}

export default async function PublicMeetingDetailPage({
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
        <div className="bg-white border rounded-xl shadow-sm p-6 sm:p-10 max-w-3xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                <div>
                    <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {meeting.meetingType}
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900 mt-2">
                        Sacrament Meeting — {meeting.date}
                    </h1>
                </div>
                <Link
                    href="/meetings"
                    className="text-sm font-semibold text-blue-700 hover:underline"
                >
                    &larr; Back to Meetings
                </Link>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                    <dt className="font-semibold text-gray-700">Presiding</dt>
                    <dd className="text-gray-900 mt-0.5">{meeting.presiding}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-700">Conducting</dt>
                    <dd className="text-gray-900 mt-0.5">{meeting.conducting}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-700">Opening Hymn</dt>
                    <dd className="text-gray-900 mt-0.5">#{meeting.openingHymn}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-700">Opening Prayer</dt>
                    <dd className="text-gray-900 mt-0.5">{meeting.openingPrayer}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-700">Sacrament Hymn</dt>
                    <dd className="text-gray-900 mt-0.5">#{meeting.sacramentHymn}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-700">Closing Hymn</dt>
                    <dd className="text-gray-900 mt-0.5">#{meeting.closingHymn}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-700">Closing Prayer</dt>
                    <dd className="text-gray-900 mt-0.5">{meeting.closingPrayer}</dd>
                </div>
            </dl>

            {meeting.announcements && (
                <div className="border-t pt-4">
                    <h2 className="text-sm font-semibold text-gray-700">Announcements</h2>
                    <p className="text-sm text-gray-900 whitespace-pre-line mt-1">
                        {meeting.announcements}
                    </p>
                </div>
            )}

            {meeting.wardBusiness && (
                <div className="border-t pt-4">
                    <h2 className="text-sm font-semibold text-gray-700">Ward Business</h2>
                    <p className="text-sm text-gray-900 whitespace-pre-line mt-1">
                        {meeting.wardBusiness}
                    </p>
                </div>
            )}

            {meeting.stakeBusiness && (
                <div className="border-t pt-4">
                    <h2 className="text-sm font-semibold text-gray-700">Stake Business</h2>
                    <p className="text-sm text-gray-900 whitespace-pre-line mt-1">
                        {meeting.stakeBusiness}
                    </p>
                </div>
            )}

            {meeting.speakers && meeting.speakers.length > 0 && (
                <div className="border-t pt-4">
                    <h2 className="text-sm font-semibold text-gray-700">Speakers</h2>
                    <ul className="list-disc list-inside text-sm text-gray-900 mt-1 space-y-1">
                        {meeting.speakers.map((speaker, index) => (
                            <li key={index}>{speaker}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}