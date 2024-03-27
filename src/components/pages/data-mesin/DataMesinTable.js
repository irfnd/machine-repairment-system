'use client';

import * as React from 'react';
import { useStore } from '@/states';
import { parseTableFilter } from '@/utils/parse';
import { filterArray } from '@/utils/array';
import { ColumnProps } from '@/components/table';

import { Table } from 'antd';

export default function DataMesinTable() {
	const [data, setData] = React.useState([]);
	const [dataDefault, setDataDefault] = React.useState([]);
	const { table, setTable } = useStore();
	const { pagination } = table;

	React.useEffect(() => {
		const fetchedData = [
			{ key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
			{ key: '2', name: 'Joe Black', age: 42, address: 'London No. 1 Lake Park' },
			{ key: '3', name: 'Jim Green', age: 32, address: 'Sydney No. 1 Lake Park' },
			{ key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
		];
		setData(fetchedData);
		setDataDefault(fetchedData);
	}, []);

	const handleTableChange = (_, filter, sorter) => {
		console.log(sorter);
		const filters = parseTableFilter(filter);
		if (Object.keys(filters).length > 0) setData(filterArray(dataDefault, filters));
		else setData(dataDefault);
	};

	const getColumnProps = (dataIndex) => {
		return ColumnProps({
			dataIndex,
			numericFields: ['age'],
			sorterFields: ['name'],
		});
	};

	const columns = React.useMemo(
		() => [
			{ title: 'Name', ...getColumnProps('name') },
			{ title: 'Age', ...getColumnProps('age') },
			{ title: 'Address', ...getColumnProps('address') },
		],
		[]
	);

	const paginationOptions = React.useMemo(
		() => ({ ...pagination, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }),
		[pagination]
	);

	return (
		<Table
			columns={columns}
			dataSource={data}
			onChange={handleTableChange}
			pagination={paginationOptions}
			scroll={{ x: 'max-content' }}
		/>
	);
}
