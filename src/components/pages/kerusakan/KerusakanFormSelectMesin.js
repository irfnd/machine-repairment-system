import { browseMesin } from '@/requests';
import { useStore } from '@/states';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import MesinGridPagination from '@/components/pages/mesin/MesinGridPagination';
import MesinGridSearch from '@/components/pages/mesin/MesinGridSearch';
import { Divider, Flex, Form, Select, Skeleton } from 'antd';

export default function KerusakanFormSelectMesin({ loading, disabled }) {
	const [selectMesin, setSelectMesin] = React.useState(false);
	const [selectedMesin, setSelectedMesin] = React.useState([]);

	const { table, mesin: mesinState, kerusakan } = useStore();
	const { filter, pagination } = table;

	const reshapedFilter = React.useMemo(() => {
		const { current: page, pageSize: limit } = pagination;
		return { page, limit, ...filter };
	}, [filter, pagination]);

	const mesin = useQuery({ queryKey: ['mesin', reshapedFilter], queryFn: browseMesin });

	React.useEffect(() => {
		const checkStatus = mesin.status === 'success';
		const checkFilter = Object.keys(reshapedFilter).length > 2;
		if (checkFilter && checkStatus) mesinState.searchRef?.current?.focus();
	}, [mesin, mesinState, reshapedFilter]);

	React.useEffect(() => {
		if (kerusakan?.selectedData?.machine) {
			const { machineId, machineName } = kerusakan.selectedData;
			setSelectedMesin([{ value: machineId, label: machineName }]);
		}
	}, [kerusakan, setSelectedMesin]);

	return (
		<Form.Item
			name='machineId'
			label='Mesin'
			rules={[{ required: true, message: 'Harap pilih mesin' }]}
			validateStatus={loading ? 'validating' : ''}
			hasFeedback
		>
			<Select
				open={selectMesin}
				onDropdownVisibleChange={(open) => setSelectMesin(open)}
				placeholder='Pilih mesin'
				dropdownRender={(options) => (
					<Flex style={{ padding: 5 }} vertical>
						<MesinGridSearch loading={mesin.isLoading} selectBox />
						<Divider style={{ margin: '8px 0' }} />
						<Skeleton loading={mesin.isLoading} title={null} paragraph={{ rows: 4 }} active>
							{options}
						</Skeleton>
						<Divider style={{ margin: '8px 0' }} />
						<MesinGridPagination loading={mesin.isLoading} selectBox />
					</Flex>
				)}
				options={
					mesin.data?.machines?.map((machine) => ({ value: machine.id, label: machine.machineName })) || selectedMesin
				}
				disabled={disabled}
				allowClear
			/>
		</Form.Item>
	);
}
