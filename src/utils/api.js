import { auth, unstable_update } from '@/utils/auth';
import { getCsrfToken, getSession } from 'next-auth/react';
import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({ baseURL: BASE_API_URL });

const isServer = typeof window === 'undefined';
let isFetchedToken = false;
let subscribers = [];

const onAccessTokenFetched = (token) => {
	subscribers.forEach((callback) => callback(token));
	subscribers = [];
};
const addSubscriber = (callback) => subscribers.push(callback);

api.interceptors.request.use(
	async (request) => {
		const session = isServer ? await auth() : await getSession();
		if (session) request.headers.Authorization = `Bearer ${session.user.token}`;
		return request;
	},
	(err) => {
		return Promise.reject(err);
	}
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (
			(error.response.status === 401 || error.response.status === 403) &&
			!error.response.config.url.includes('/refresh-token') &&
			!error.response.config.url.includes('/login')
		) {
			try {
				const { response } = error;

				const retryOriginalRequest = new Promise((resolve) => {
					addSubscriber((token) => {
						response.config.headers.Authorization = `Bearer ${token}`;
						resolve(axios(response.config));
					});
				});

				if (!isFetchedToken) {
					isFetchedToken = true;
					const session = isServer ? await auth() : await getSession();
					const { token, refreshToken } = session.user;

					const headers = { 'refresh-token': refreshToken, Authorization: `Bearer ${token}` };
					const { data: user } = await api.get('/auth/refresh-token', { headers });

					const newUserData = { token: user.data.token, refreshToken: user.data.refreshToken };
					if (isServer) await unstable_update({ user: newUserData });

					const csrfToken = await getCsrfToken();
					await axios.post('/api/auth/session', { csrfToken, data: { user: newUserData } });
					onAccessTokenFetched(data.data.token);
				}
				return retryOriginalRequest;
			} catch (error) {
				return Promise.reject(error);
			} finally {
				isFetchedToken = false;
			}
		}
		return Promise.reject(error);
	}
);
