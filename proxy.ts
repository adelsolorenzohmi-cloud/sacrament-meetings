import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function proxy(request: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = secret ? await getToken({ req: request, secret }) : null;
    const isLoggedIn = Boolean(token);
    const isProtected = request.nextUrl.pathname.startsWith('/dashboard');

    if (isProtected && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (isLoggedIn && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};