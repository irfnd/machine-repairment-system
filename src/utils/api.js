import { getCsrfToken, getSession } from 'next-auth/react';
import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});
