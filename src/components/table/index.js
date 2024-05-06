import { useStore } from '@/states';
import { omitObject } from '@/utils/object';
import _ from 'lodash';

import { Flex, Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { RenderFilterExist, RenderFilterNotExist } from '@/components/table/RenderFilterHighlighter';
import RenderFilterInput from '@/components/table/RenderFilterInput';

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

	const debounceFilter = _.debounce(({ value, key }) => {
		setTable({ filter: { ...table.filter, [key]: value } });
	}, 500);

	const setFilter = ({ setSelectedKeys, value, key, isDate = false }) => {
		if (value || value.length > 0) {
			const checkValue = isDate ? value?.format('YYYY-MM-DD') : value;
			setSelectedKeys([checkValue]);
			debounceFilter({ value: checkValue, key });
		} else {
			setSelectedKeys([]);
			const unsetFilter = omitObject(table.filter, [key]);
			setTable({ filter: unsetFilter });
		}
	};

	const resetFilter = ({ key, clearFilters, confirm }) => {
		const resetPagination = { ...table.pagination, current: 1 };
		const unsetFilter = omitObject(table.filter, [key]);
		setTable({ filter: unsetFilter, pagination: resetPagination });
		clearFilters();
		confirm();
	};

	const setAlign = (getDataIndex) => {
		if (centerFields.includes(getDataIndex)) return 'center';
		if (rightFields.includes(getDataIndex)) return 'right';
		return 'left';
	};

	const checkFieldType = () => {
		if (dateFields.includes(dataIndex)) return 'date';
		else if (currencyFields.includes(dataIndex)) return 'currency';
		else if (numericFields.includes(dataIndex)) return 'numeric';
		else if (Object.keys(flagFields).includes(dataIndex)) return 'flag';
		else return null;
	};

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
				<Flex gap={8} style={{ padding: 8, width: 250 }} onKeyDown={(e) => e.stopPropagation()}>
					<RenderFilterInput {...inputProps} />
					<Button
						onClick={() => resetFilter({ key: dataIndex, clearFilters, confirm })}
						icon={<CloseOutlined />}
						type='primary'
						size='small'
						style={{ height: 'unset', width: 34 }}
						danger
					/>
				</Flex>
			);
		},
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered || table.filter[dataIndex] ? '#389e0d' : undefined }} />
		),
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
			const fieldDetails = { dateFields, currencyFields, numericFields, flagFields };
			const commonProps = { fieldDetails, fieldType, dataIndex, value };
			const filter = table.filter;

			if (Object.keys(filter).includes(dataIndex)) return <RenderFilterExist {...{ filter, ...commonProps }} />;
			else return <RenderFilterNotExist {...commonProps} />;
		},
	};
}
