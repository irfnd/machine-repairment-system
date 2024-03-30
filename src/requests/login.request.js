'use server';

import { signIn } from '@/utils/auth';
import { AuthError } from 'next-auth';

export async function reqLogin(credentials) {
	try {
		await signIn('credentials', { ...credentials, redirect: false });
	} catch (err) {
		if (err instanceof AuthError) {
			switch (err.type) {
				case 'CredentialsSignin':
					throw new Error('Email/Username atau Password salah!');
				default:
					throw new Error('Terjadi kesalahan saat masuk');
			}
		}
	}
}
