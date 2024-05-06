import * as React from 'react';
import { useStore } from '@/states';
import { parseDate } from '@/utils/parse';
import { pickObject } from '@/utils/object';

import { Descriptions, Flex, Tag } from 'antd';
import StatusPerbaikanTags from '@/components/flags/StatusPerbaikanTags';

export default function KerusakanDetail() {
	const { kerusakan: getKerusakan } = useStore();
	const kerusakan = getKerusakan.selectedData;

	const kerusakanItems = React.useMemo(() => {
		if (kerusakan?.machine) {
			const selectedKeys = ['machine', 'repairmentDate', 'status', 'description'];
			const getData = pickObject(kerusakan, selectedKeys);
			const reshapedData = {
				Mesin: getData.machine.machineName,
				Kategori: <Tag>{getData.machine.category.categoryName}</Tag>,
				Status: <StatusPerbaikanTags value={getData.status} />,
				'Tanggal Kerusakan': parseDate(getData.repairmentDate, true)?.format('DD-MM-YYYY'),
				Keterangan: getData.description,
			};
			return Object.entries(reshapedData).map(([key, value], i) => ({ key: i + 1, label: key, children: value || '-' }));
		}
		return [];
	}, [kerusakan]);

	return (
		<Flex gap={20} vertical>
			<Flex>
				<Descriptions items={kerusakanItems} column={1} size='middle' style={{ width: '100%' }} />
			</Flex>
		</Flex>
	);
}
