import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-12 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
            Central Ward
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Sacrament Meeting Program Planner
          </h1>
          <p className="text-lg text-gray-600">
            Access weekly sacrament meeting programs, hymns, speaker assignments, and ward business conveniently in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/meetings/current"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              View Current Meeting
            </Link>
            <Link
              href="/meetings"
              className="bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Browse All Meetings
            </Link>
          </div>
        </div>
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80"
            alt="LDS Chapel building exterior"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}