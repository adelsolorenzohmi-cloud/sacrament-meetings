import { signOut } from '@/auth';

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
        >
            <button
                type="submit"
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Sign Out
            </button>
        </form>
    );
}