import type { SacramentMeeting } from '@/lib/types';

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 sm:p-10 max-w-3xl mx-auto print:shadow-none print:border-none">
            <div className="text-center border-b pb-6 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Central Ward Sacrament Meeting</h1>
                <p className="text-gray-600 mt-1 font-medium">{meeting.date}</p>
                <span className="inline-block mt-3 text-xs uppercase tracking-wider font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                    {meeting.meetingType} meeting
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
                    <span className="text-right">#{meeting.openingHymn.number} &ndash; {meeting.openingHymn.title}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold">Invocation (Opening Prayer)</span>
                    <span>{meeting.openingPrayer}</span>
                </div>

                {meeting.wardBusiness.length > 0 && (
                    <div className="border-b pb-3">
                        <h3 className="font-semibold mb-2">Ward Business</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {meeting.wardBusiness.map((item, index) => (
                                <li key={index}>{item.description}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold">Sacrament Hymn</span>
                    <span className="text-right">#{meeting.sacramentHymn.number} &ndash; {meeting.sacramentHymn.title}</span>
                </div>

                <div className="text-center py-2 text-xs uppercase tracking-widest text-gray-400 font-semibold">
                    Administration of the Sacrament
                </div>

                {meeting.speakers.length > 0 ? (
                    <div className="border-b pb-3">
                        <h3 className="font-semibold mb-3">Speakers</h3>
                        <div className="space-y-3">
                            {meeting.speakers.map((speaker, index) => (
                                <div key={index} className="flex justify-between items-start text-sm">
                                    <div>
                                        <p className="font-medium">{speaker.name}</p>
                                        {speaker.topic && <p className="text-xs text-gray-500">{speaker.topic}</p>}
                                    </div>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                        {speaker.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="border-b pb-3 text-center text-sm text-gray-500 italic">
                        Testimony Meeting &ndash; Open Microphone for Congregation
                    </div>
                )}

                <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold">Closing Hymn</span>
                    <span className="text-right">#{meeting.closingHymn.number} &ndash; {meeting.closingHymn.title}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold">Benediction (Closing Prayer)</span>
                    <span>{meeting.closingPrayer}</span>
                </div>

                {meeting.announcements && meeting.announcements.length > 0 && (
                    <div className="mt-6 bg-blue-50/50 border border-blue-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">Announcements</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                            {meeting.announcements.map((ann, idx) => (
                                <li key={idx}>{ann}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t flex justify-end print:hidden">
                <button
                    onClick={() => window.print()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                    Print Program
                </button>
            </div>
        </div>
    );
}