import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard');

            if (isProtectedRoute) {
                if (isLoggedIn) return true;
                return false;
            }

            if (isLoggedIn && nextUrl.pathname === '/login') {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;