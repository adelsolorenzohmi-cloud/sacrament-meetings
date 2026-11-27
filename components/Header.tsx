import { auth } from '@/auth';
import NavLinks from './NavLinks';

export default async function Header() {
    const session = await auth();
    const isLoggedIn = Boolean(session?.user);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header className="border-b bg-white shadow-sm sticky top-0 z-50 print:hidden">
            <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <p className="text-xl font-bold text-gray-900">Central Ward</p>
                    {/* Server and browser may be on different calendar days */}
                    <p className="text-xs text-gray-600" suppressHydrationWarning>
                        {currentDate}
                    </p>
                </div>
                <NavLinks isLoggedIn={isLoggedIn} />
            </div>
        </header>
    );
}