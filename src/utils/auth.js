import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { api } from '@/utils/api';
import { jwtDecode } from 'jwt-decode';
import { omitObject } from '@/utils/object';

const authConfig = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {},
			async authorize(credentials) {
				try {
					const results = await api.post('/auth/login', credentials);
					if (!results.data.data) return null;
					return results.data.data;
				} catch (err) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, session, trigger }) {
			if (trigger === 'signIn' && user?.token) {
				const decodedToken = omitObject(jwtDecode(user.token), ['exp', 'iat', 'iss']);
				const tokens = { token: user.token, refreshToken: user.refreshToken };
				Object.assign(token, { ...decodedToken, ...tokens });
			} else if (trigger === 'update' && session.user?.token) {
				const decodedToken = omitObject(jwtDecode(session.user.token), ['exp', 'iat', 'iss']);
				const tokens = { token: session.user.token, refreshToken: session.user.refreshToken };
				Object.assign(token, { ...decodedToken, ...tokens });
			}
			return token;
		},
		async session({ session, token }) {
			if (token) Object.assign(session.user, omitObject(token, ['sub', 'exp', 'iat', 'jti']));
			return session;
		},
		authorized({ auth, request }) {
			const { nextUrl } = request;
			const isLoggedIn = !!auth?.user;
			const isOnLogin = nextUrl.pathname === '/login';

			if (isOnLogin) {
				if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
				return true;
			} else {
				if (isLoggedIn) return true;
				return false;
			}
		},
	},
	session: { strategy: 'jwt' },
	pages: { signIn: '/login' },
};

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth(authConfig);
