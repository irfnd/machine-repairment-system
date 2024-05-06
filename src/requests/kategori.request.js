import { api } from '@/utils/api';
import { useStore } from '@/states';

export const browseKategori = async () => {
	const { setKategori } = useStore.getState();

	try {
		const { data } = await api.get('/category/all');
		setKategori({ kategori: data?.data || [] });
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};
