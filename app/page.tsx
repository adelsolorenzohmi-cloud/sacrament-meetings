import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Weekly sacrament meeting schedule, hymns, speakers, and announcements for Central Ward.',
};

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border bg-white p-6 sm:p-10 shadow-sm space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Central Ward Sacrament Meeting Planner
        </h1>
        <p className="text-gray-600 max-w-2xl">
          View upcoming sacrament meeting programs, hymns, speakers, and ward announcements,
          or sign in to manage weekly schedules.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/meetings"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Browse Meetings
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Bishopric Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}