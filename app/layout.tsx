import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Central Ward Sacrament Meeting Planner',
    default: 'Central Ward Sacrament Meeting Planner',
  },
  description:
    'View weekly sacrament meeting schedules, hymns, speakers, and ward business for Central Ward.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50 text-gray-900`}
      >
        <header className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-gray-900 hover:text-blue-700"
            >
              Central Ward Planner
            </Link>
            <nav aria-label="Primary navigation" className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-700"
              >
                Home
              </Link>
              <Link
                href="/meetings"
                className="text-gray-700 hover:text-blue-700"
              >
                Meetings
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-700"
              >
                Dashboard
              </Link>
              <Link
                href="/login"
                className="rounded-lg bg-blue-700 px-3 py-1.5 text-white hover:bg-blue-800"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            Central Ward Sacrament Meeting Planner
          </div>
        </footer>
      </body>
    </html>
  );
}