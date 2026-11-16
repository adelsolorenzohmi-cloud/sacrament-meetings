'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className="flex justify-between items-center mt-8 pt-4 border-t">
            {currentPage > 1 ? (
                <Link
                    href={createPageURL(currentPage - 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Previous
                </Link>
            ) : (
                <span className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-50 border border-gray-200 rounded-md cursor-not-allowed">
                    Previous
                </span>
            )}

            <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link
                    href={createPageURL(currentPage + 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Next
                </Link>
            ) : (
                <span className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-50 border border-gray-200 rounded-md cursor-not-allowed">
                    Next
                </span>
            )}
        </nav>
    );
}