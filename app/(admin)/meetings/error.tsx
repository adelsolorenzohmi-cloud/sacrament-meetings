'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MeetingsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div
            role="alert"
            className="bg-white border rounded-xl shadow-sm p-6 sm:p-10 max-w-3xl mx-auto text-center"
        >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-6">
                We couldn&apos;t complete that request. Please try again, or go back to the
                list of meetings.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                >
                    Try Again
                </button>
                <Link
                    href="/meetings"
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Back to all meetings
                </Link>
            </div>
        </div>
    );
}