'use client';

import type { SacramentMeeting } from '@/lib/types';

function hasContent(value: string | null): value is string {
    if (!value) return false;
    const text = value.trim().toLowerCase();
    return text !== '' && text !== 'none';
}

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
    const speakers = meeting.speakers ?? [];

    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 sm:p-10 max-w-3xl mx-auto print:shadow-none print:border-none">
            <div className="text-center border-b pb-6 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Central Ward Sacrament Meeting</h1>
                <p className="text-gray-600 mt-1 font-medium">{meeting.date}</p>
                <span className="inline-block mt-3 text-xs uppercase tracking-wider font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                    {meeting.meetingType}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm bg-gray-50 p-4 rounded-lg">
                <div>
                    <span className="font-semibold text-gray-700">Presiding:</span> {meeting.presiding}
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Conducting:</span> {meeting.conducting}
                </div>
            </div>

            <div className="space-y-6 text-gray-800">
                <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold">Opening Hymn</span>
                    <span className="text-right">Hymn #{meeting.openingHymn}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold">Invocation (Opening Prayer)</span>
                    <span>{meeting.openingPrayer}</span>
                </div>

                {hasContent(meeting.wardBusiness) && (
                    <div className="border-b pb-3">
                        <h2 className="font-semibold mb-2">Ward Business</h2>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{meeting.wardBusiness}</p>
                    </div>
                )}

                {hasContent(meeting.stakeBusiness) && (
                    <div className="border-b pb-3">
                        <h2 className="font-semibold mb-2">Stake Business</h2>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{meeting.stakeBusiness}</p>
                    </div>
                )}

                <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold">Sacrament Hymn</span>
                    <span className="text-right">Hymn #{meeting.sacramentHymn}</span>
                </div>

                <div className="text-center py-2 text-xs uppercase tracking-widest text-gray-600 font-semibold">
                    Administration of the Sacrament
                </div>

                <div className="border-b pb-3">
                    <h2 className="font-semibold mb-3">Speakers</h2>
                    {speakers.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {speakers.map((name, index) => (
                                <li key={`${name}-${index}`}>{name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-600 italic">No speakers scheduled.</p>
                    )}
                </div>

                <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold">Closing Hymn</span>
                    <span className="text-right">Hymn #{meeting.closingHymn}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold">Benediction (Closing Prayer)</span>
                    <span>{meeting.closingPrayer}</span>
                </div>

                {hasContent(meeting.announcements) && (
                    <div className="mt-6 bg-blue-50/50 border border-blue-100 p-4 rounded-lg">
                        <h2 className="font-semibold text-blue-900 mb-2">Announcements</h2>
                        <p className="text-sm text-blue-900 whitespace-pre-line">{meeting.announcements}</p>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t flex justify-end print:hidden">
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
                >
                    Print Program
                </button>
            </div>
        </div>
    );
}