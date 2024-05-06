import { api } from '@/utils/api';
import { useStore } from '@/states';

export const browseMesin = async ({ queryKey }) => {
	const [_key, params] = queryKey;
	const { table, setTable } = useStore.getState();

	try {
		const { data } = await api.get('/machine/all', { params });
		setTable({
			pagination: {
				...table.pagination,
				current: data?.data.pagination.currentPage || 1,
				total: data?.data.pagination.totalData || 0,
			},
		});
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};

export const addMesin = async (newData) => {
	try {
		const { data } = await api.post('/machine/create', newData);
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};

export const updateMesin = async ({ id, newData }) => {
	try {
		const { data } = await api.patch(`/machine/edit/${id}`, newData);
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};

export const deleteMesin = async (id) => {
	try {
		const { data } = await api.delete(`/machine/${id}`);
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};