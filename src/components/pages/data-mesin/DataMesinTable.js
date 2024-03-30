'use client';

import * as React from 'react';
import { useStore } from '@/states';
import { parseTableFilter } from '@/utils/parse';
import { ColumnProps } from '@/components/table';
import { browseKategori, browseMesin } from '@/requests';
import { useQuery } from '@tanstack/react-query';

import { Table } from 'antd';
import KategoriMesinTags from '@/components/flags/KategoriMesinTags';
import StatusMesinTags from '@/components/flags/StatusMesinTags';

export default function DataMesinTable() {
	const { table, setTable } = useStore();

	const kategori = useQuery({ queryKey: ['kategori'], queryFn: browseKategori });
	const mesin = useQuery({ queryKey: ['mesin', table.filter], queryFn: browseMesin });

	const handleTableChange = (pagination, filter) => {
		const { current: page, pageSize: limit } = pagination;
		const parsedFilter = parseTableFilter(filter);
		const filters = { page, limit, ...parsedFilter };
		setTable({ filter: filters });
	};
	const handleSizeChange = (_curr, pageSize) => setTable({ pagination: { ...table.pagination, pageSize } });

	const getColumnProps = (dataIndex) => {
		return ColumnProps({
			dataIndex,
			centerFields: ['categoryId', 'buyDate', 'status'],
			dateFields: ['buyDate'],
			flagFields: {
				categoryId: {
					detail: kategori.data?.map(({ id, categoryName }) => ({ text: categoryName, value: id })),
					component: <KategoriMesinTags kategoriList={kategori.data} />,
					placeholder: 'Pilih kategori mesin',
				},
				status: {
					detail: [
						{ text: 'Ready', value: 'ready' },
						{ text: 'Perbaikan', value: 'perbaikan' },
						{ text: 'Rusak', value: 'rusak' },
					],
					component: <StatusMesinTags />,
					placeholder: 'Pilih status mesin',
				},
			},
		});
	};
	const columns = [
		{ title: 'Nama Mesin', ...getColumnProps('machineName') },
		{ title: 'Tanggal Beli', ...getColumnProps('buyDate') },
		{ title: 'Kategori', ...getColumnProps('categoryId') },
		{ title: 'Status', ...getColumnProps('status') },
	];
	const paginationOptions = {
		...table.pagination,
		showSizeChanger: true,
		pageSizeOptions: ['10', '20', '50', '100'],
		onShowSizeChange: handleSizeChange,
	};

	return (
		<Table
			loading={mesin.isLoading || kategori.isLoading}
			columns={columns}
			dataSource={mesin.data?.machines}
			onChange={handleTableChange}
			pagination={paginationOptions}
			scroll={{ x: 'max-content' }}
		/>
	);
}
