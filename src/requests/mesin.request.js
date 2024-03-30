import { api } from '@/utils/api';
import { useStore } from '@/states';

export const browseMesin = async ({ queryKey }) => {
	const [_key, params] = queryKey;
	const { table, setTable } = useStore.getState();

	try {
		const { data } = await api.get('/machine/all', { params });
		setTable({ pagination: { ...table.pagination, current: data?.data.pagination.currentPage || 1 } });
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};
