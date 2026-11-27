import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    template: '%s | Central Ward Sacrament Meeting Planner',
    default: 'Central Ward Sacrament Meeting Planner',
  },
  description:
    'View weekly sacrament meeting schedules, hymns, speakers, and ward business for Central Ward.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Central Ward Sacrament Meeting Planner',
    description:
      'View weekly sacrament meeting schedules, hymns, speakers, and ward business for Central Ward.',
    siteName: 'Central Ward Sacrament Meeting Planner',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-blue-700"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}