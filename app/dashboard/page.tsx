import Link from 'next/link';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import SignOutButton from '@/components/SignOutButton';

export const metadata: Metadata = {
    title: 'Bishopric Dashboard',
    description: 'Manage sacrament meeting programs and ward schedules.',
};

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Bishopric Dashboard
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Signed in as {session?.user?.name ?? 'Ward Leadership'} ({session?.user?.email})
                    </p>
                </div>
                <SignOutButton />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-xl border bg-white p-6 shadow-sm space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900">Manage Meetings</h2>
                    <p className="text-sm text-gray-600">
                        Review existing meeting programs, edit details, or remove past entries.
                    </p>
                    <Link
                        href="/dashboard/meetings"
                        className="inline-block rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                    >
                        Go to Meetings Manager
                    </Link>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900">New Meeting Program</h2>
                    <p className="text-sm text-gray-600">
                        Create a new sacrament meeting program with hymns, speakers, and business.
                    </p>
                    <Link
                        href="/dashboard/meetings/new"
                        className="inline-block rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Create Meeting
                    </Link>
                </div>
            </div>
        </div>
    );
}