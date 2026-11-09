'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();

    const links = [
        { name: 'Home', href: '/' },
        { name: 'All Meetings', href: '/meetings' },
        { name: 'Current Meeting', href: '/meetings/current' },
    ];

    return (
        <nav className="flex space-x-6">
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
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