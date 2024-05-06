import { api } from '@/utils/api';
import { useStore } from '@/states';

export const browseKerusakan = async ({ queryKey }) => {
	const [_key, params] = queryKey;
	const { table, setTable } = useStore.getState();

	try {
		const { data } = await api.get('/repairment', { params });
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

export const getKerusakanById = async (id) => {
	try {
		const { data } = await api.get(`/repairment/${id}`);
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};

export const addKerusakan = async (newData) => {
	try {
		const { data } = await api.post('/repairment/create', newData);
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};

export const updateKerusakan = async ({ id, newData }) => {
	try {
		const { data } = await api.patch(`/repairment/edit/${id}`, newData);
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};

export const deleteKerusakan = async (id) => {
	try {
		const { data } = await api.delete(`/repairment/${id}`);
		return data?.data;
	} catch (err) {
		throw new Error(err.response?.data?.message || 'Terjadi kesalahan!');
	}
};
