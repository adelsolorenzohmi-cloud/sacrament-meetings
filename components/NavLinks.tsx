'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
    const pathname = usePathname();

    const links = [
        { name: 'Home', href: '/' },
        { name: 'All Meetings', href: '/meetings' },
        { name: 'Current Meeting', href: '/meetings/current' },
        isLoggedIn
            ? { name: 'Dashboard', href: '/dashboard' }
            : { name: 'Sign In', href: '/login' },
    ];

    return (
        <nav aria-label="Main" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) => {
                const isActive =
                    link.href === '/dashboard'
                        ? pathname.startsWith('/dashboard')
                        : pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
}