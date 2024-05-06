import { ColumnProps } from '@/components/table';
import { browseKategori, browseKerusakan } from '@/requests';
import { useStore } from '@/states';
import { parseTableFilter } from '@/utils/parse';
import { useQueries } from '@tanstack/react-query';

import KategoriMesinTags from '@/components/flags/KategoriMesinTags';
import StatusPerbaikanTags from '@/components/flags/StatusPerbaikanTags';
import { EyeOutlined, DeleteOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons';
import { Button, Flex, Table } from 'antd';

export default function KerusakanTable() {
	const { table, setTable, setKerusakan } = useStore();

	const [kategori, kerusakan] = useQueries({
		queries: [
			{ queryKey: ['kategori'], queryFn: browseKategori },
			{ queryKey: ['kerusakan', table.filter], queryFn: browseKerusakan },
		],
	});

	const handleTableChange = (pagination, filter) => {
		const { current: page, pageSize: limit } = pagination;
		const parsedFilter = parseTableFilter(filter);
		const filters = { page, limit, ...parsedFilter };
		setTable({ filter: filters });
	};

	const handleSizeChange = (_curr, pageSize) => {
		setTable({ pagination: { ...table.pagination, pageSize } });
	};

	const onSetForm = (data, type) => {
		setKerusakan({
			formType: type,
			selectedData: data,
			modalShowVisible: type === 'show',
			modalUpdateVisible: type === 'update',
			modalDeleteVisible: type === 'delete',
		});
	};

	const getColumnProps = (dataIndex) => {
		return ColumnProps({
			dataIndex,
			centerFields: ['categoryId', 'repairmentDate', 'status'],
			dateFields: ['repairmentDate'],
			flagFields: {
				categoryId: {
					detail: kategori.data?.map(({ id, categoryName }) => ({ text: categoryName, value: id })),
					component: <KategoriMesinTags kategoriList={kategori.data} />,
					placeholder: 'Pilih kategori mesin',
				},
				status: {
					detail: [
						'Menunggu Konfirmasi',
						'Proses Perbaikan',
						'Indent Sparepart',
						'Tidak Bisa Diperbaiki',
						'Selesai Diperbaiki',
					].map((opt) => ({ text: opt, value: opt })),
					component: <StatusPerbaikanTags />,
					placeholder: 'Pilih status perbaikan',
				},
			},
		});
	};

	const columns = [
		{
			title: 'Aksi',
			key: 'aksi',
			align: 'center',
			render: (_text, data) => (
				<Flex justify='center' gap={5}>
					<Button type='primary' icon={<EyeOutlined />} onClick={() => onSetForm(data, 'show')} />
					<Button
						type='primary'
						icon={<EditOutlined />}
						onClick={() => onSetForm(data, 'update')}
						disabled={data.status !== 'Menunggu Konfirmasi'}
					/>
					<Button
						type='primary'
						icon={<DeleteOutlined />}
						onClick={() => onSetForm(data, 'delete')}
						disabled={data.status !== 'Menunggu Konfirmasi'}
						danger
					/>
				</Flex>
			),
		},
		{ title: 'Mesin', ...getColumnProps('machineName') },
		{ title: 'Kategori', ...getColumnProps('categoryId') },
		{ title: 'Tanggal Kerusakan', ...getColumnProps('repairmentDate') },
		{ title: 'Status', ...getColumnProps('status') },
	];

	const paginationOptions = {
		...table.pagination,
		showSizeChanger: true,
		pageSizeOptions: ['10', '20', '50', '100'],
		onShowSizeChange: handleSizeChange,
	};

	return (
		<Flex vertical gap={25} style={{ width: '100%', height: '100%' }}>
			<Flex>
				<Button
					type='primary'
					size='large'
					icon={<FileAddOutlined />}
					onClick={() => setKerusakan({ modalAddVisible: true })}
				>
					Tambah Laporan
				</Button>
			</Flex>

			<Table
				loading={kerusakan.isLoading || kategori.isLoading}
				columns={columns}
				dataSource={kerusakan.data?.repairments}
				onChange={handleTableChange}
				pagination={paginationOptions}
				scroll={{ x: 'max-content' }}
				rowKey={'id'}
			/>
		</Flex>
	);
}
