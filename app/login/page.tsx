import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to manage Central Ward sacrament meeting programs.',
};

export default function LoginPage() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center py-8">
            <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Bishopric sign-in for managing sacrament meeting schedules.
                </p>
                <LoginForm />
            </div>
        </div>
    );
}