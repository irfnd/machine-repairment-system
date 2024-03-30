import { api } from '@/utils/api';

export const browseKategori = async () => {
	try {
		const { data, ...others } = await api.get('/category/all');
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};
