import Link from 'next/link';

export default function MeetingNotFound() {
    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 sm:p-10 max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meeting not found</h1>
            <p className="text-gray-600 mb-6">
                We couldn&apos;t find that meeting. It may have been deleted, or the link may be incorrect.
            </p>
            <Link
                href="/meetings"
                className="inline-block rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
                Back to all meetings
            </Link>
        </div>
    );
}