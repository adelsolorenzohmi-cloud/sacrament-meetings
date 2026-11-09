import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
    return (
        <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {meeting.meetingType}
                    </span>
                    <span className="text-sm font-medium text-gray-600">{meeting.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mt-2">Sacrament Meeting</h3>
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Presiding:</span> {meeting.presiding}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Conducting:</span> {meeting.conducting}
                </p>
            </div>
            <div className="mt-4 pt-3 border-t flex justify-end">
                <Link
                    href={`/meetings/${meeting.id}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                    View Program &rarr;
                </Link>
            </div>
        </div>
    );
}