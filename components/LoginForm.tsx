'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    minLength={6}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                aria-disabled={isPending}
                className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isPending ? 'Signing in...' : 'Sign In'}
            </button>

            <div aria-live="polite">
                {errorMessage && (
                    <p role="alert" className="text-sm text-red-700">
                        {errorMessage}
                    </p>
                )}
            </div>
        </form>
    );
}