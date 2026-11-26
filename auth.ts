import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (
                    typeof email === 'string' &&
                    typeof password === 'string' &&
                    email === process.env.AUTH_ADMIN_EMAIL &&
                    password === process.env.AUTH_ADMIN_PASSWORD
                ) {
                    return {
                        id: '1',
                        name: 'Bishopric Admin',
                        email: process.env.AUTH_ADMIN_EMAIL,
                    };
                }

                return null;
            },
        }),
    ],
});