import { useStore } from '@/states';

import { Flex, Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import RenderFilterInput from '@/components/table/RenderFilterInput';
import RenderFilterExist from '@/components/table/RenderFilterNotExist';
import RenderFilterNotExist from '@/components/table/RenderFilterExist';

export function ColumnProps(props) {
	const {
		dataIndex,
		centerFields = [],
		rightFields = [],
		sorterFields = [],
		dateFields = [],
		numericFields = [],
		currencyFields = [],
		flagFields = {},
	} = props;
	const { table, setTable } = useStore.getState();
	const { inputRef } = table;

	const setFilter = ({ setSelectedKeys, selectedKey, key, isDate = false }) => {
		const value = isDate ? selectedKey?.format('YYYY-MM-DD') : selectedKey;
		setTable({ filter: { ...table.filter, [key]: value } });
		setSelectedKeys(selectedKey ? [value] : []);
	};

	const resetFilter = ({ key, clearFilters, confirm }) => {
		const resetPagination = { ...table.pagination, current: 1 };
		const getFilter = { ...table.filter };
		delete getFilter[key];
		setTable({ filter: getFilter, pagination: resetPagination });
		clearFilters();
		confirm();
	};

	const setAlign = (getDataIndex) => {
		if (centerFields.includes(getDataIndex)) return 'center';
		if (rightFields.includes(getDataIndex)) return 'right';
		return 'left';
	};

	function checkFieldType() {
		if (dateFields.includes(dataIndex)) return 'date';
		if (currencyFields.includes(dataIndex)) return 'currency';
		if (numericFields.includes(dataIndex)) return 'numeric';
		if (Object.keys(flagFields).includes(dataIndex)) return 'flag';
		return null;
	}

	return {
		dataIndex,
		key: dataIndex,
		align: setAlign(dataIndex),
		sorter: sorterFields.includes(dataIndex),
		filterDropdown: (filterProps) => {
			const { confirm, clearFilters } = filterProps;
			const fieldType = checkFieldType();
			const inputProps = { dataIndex, fieldType, filterProps, flagFields, setFilter };

			return (
				<Flex gap={8} style={{ padding: 8, width: 250 }} onKeyDown={(e) => e.stopPropagation()} vertical>
					<RenderFilterInput {...inputProps} />
					<Flex gap={8}>
						<Button type='primary' onClick={() => confirm()} icon={<SearchOutlined />} size='small' block>
							Search
						</Button>
						<Button
							onClick={() => resetFilter({ key: dataIndex, clearFilters, confirm })}
							icon={<CloseOutlined />}
							size='small'
							block
						>
							Reset
						</Button>
					</Flex>
				</Flex>
			);
		},
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#389e0d' : undefined }} />,
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => {
					if (inputRef.current?.name === 'inputText') inputRef.current?.select();
					else inputRef.current?.focus();
				});
			}
		},
		render: (value) => {
			const fieldType = checkFieldType();
			const commonProps = { fieldType, flagFields, dataIndex, value };

			if (Object.keys(table.filter).includes(dataIndex)) return <RenderFilterExist {...commonProps} />;
			return <RenderFilterNotExist {...commonProps} />;
		},
	};
}
