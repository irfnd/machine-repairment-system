import { getKerusakanById } from '@/requests';
import { useStore } from '@/states';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import KerusakanDetail from '@/components/pages/kerusakan/KerusakanDetail';
import { Flex, Modal, Skeleton, notification } from 'antd';

export default function KerusakanDetailModal() {
	const [notif, notifContext] = notification.useNotification();
	const { kerusakan, setKerusakan } = useStore();

	const isGetKerusakanById = React.useMemo(() => {
		const { formType, selectedData } = kerusakan;
		return formType === 'show' && selectedData && !selectedData.machine;
	}, [kerusakan]);

	const kerusakanById = useQuery({
		queryKey: ['kerusakan', kerusakan?.selectedData?.id],
		queryFn: async () => {
			try {
				const { selectedData } = kerusakan;
				const data = await getKerusakanById(selectedData?.id);
				setKerusakan({ selectedData: data });
				return data;
			} catch (err) {
				notif.error({ message: `Gagal Mengambil Data`, description: err.message });
				throw new Error(err);
			}
		},
		enabled: !!isGetKerusakanById,
	});

	const onCancel = () => {
		setKerusakan({
			modalShowVisible: false,
			modalAddVisible: false,
			modalUpdateVisible: false,
			modalDeleteVisible: false,
			selectedData: null,
			formType: 'add',
		});
	};

	return (
		<Modal
			title='Detail Laporan Kerusakan'
			open={kerusakan.modalShowVisible}
			onCancel={onCancel}
			width={400}
			footer={null}
			centered
		>
			<Flex style={{ padding: '10px 0' }} gap={20} vertical>
				<Skeleton loading={kerusakanById.isLoading} title={null} paragraph={{ rows: 6 }} active>
					<KerusakanDetail loading={kerusakanById.isLoading} />
				</Skeleton>
			</Flex>

			{notifContext}
		</Modal>
	);
}
