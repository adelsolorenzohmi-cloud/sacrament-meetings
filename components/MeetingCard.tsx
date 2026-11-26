import Link from 'next/link';
import { deleteMeeting } from '@/lib/actions';
import DeleteMeetingButton from '@/components/DeleteMeetingButton';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingCard({
    meeting,
    showAdminActions = false,
}: {
    meeting: SacramentMeeting;
    showAdminActions?: boolean;
}) {
    return (
        <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {meeting.meetingType}
                    </span>
                    <span className="text-sm font-medium text-gray-600">{meeting.date}</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mt-2">Meeting on {meeting.date}</h2>
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Presiding:</span> {meeting.presiding}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Conducting:</span> {meeting.conducting}
                </p>
            </div>

            <div className="mt-4 pt-3 border-t flex items-center justify-between gap-4">
                {showAdminActions ? (
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/dashboard/meetings/${meeting.id}/edit`}
                            className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                        >
                            Edit<span className="sr-only"> meeting on {meeting.date}</span>
                        </Link>
                        <form action={deleteMeeting.bind(null, meeting.id)}>
                            <DeleteMeetingButton meetingDate={meeting.date} />
                        </form>
                    </div>
                ) : (
                    <span />
                )}
                <Link
                    href={`/meetings/${meeting.id}`}
                    className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                    View Program<span className="sr-only"> for {meeting.date}</span> &rarr;
                </Link>
            </div>
        </div>
    );
}