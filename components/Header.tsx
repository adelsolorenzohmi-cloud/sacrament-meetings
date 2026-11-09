'use client';

import NavLinks from './NavLinks';

export default function Header() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header className="border-b bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Central Ward</h1>
                    <p className="text-xs text-gray-500">{currentDate}</p>
                </div>
                <NavLinks />
            </div>
        </header>
    );
}