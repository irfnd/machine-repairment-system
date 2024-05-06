import { deleteKerusakan, getKerusakanById } from '@/requests';
import { useStore } from '@/states';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

import KerusakanDetail from '@/components/pages/kerusakan/KerusakanDetail';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Skeleton, notification } from 'antd';

export default function KerusakanDeleteModal() {
	const [deleteLoading, setDeleteLoading] = React.useState(false);

	const [notif, notifContext] = notification.useNotification();
	const { kerusakan, setKerusakan } = useStore();
	const queryClient = useQueryClient();

	const isGetKerusakanById = React.useMemo(() => {
		const { formType, selectedData } = kerusakan;
		return formType === 'delete' && selectedData && !selectedData.machine;
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

	const queryMutation = useMutation({
		mutationFn: deleteKerusakan,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['kerusakan'] });
			notif.success({ message: 'Berhasil Dihapus', description: 'Data Laporan Kerusakan Berhasil Dihapus' });
			setDeleteLoading(false);
			onCancel();
		},
		onError: (err) => {
			notif.error({ message: 'Gagal Dihapus', description: err.message });
			setDeleteLoading(false);
		},
	});

	const onDelete = () => {
		setDeleteLoading(true);
		queryMutation.mutate(kerusakan.selectedData?.id);
	};

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
			title='Hapus Laporan Kerusakan'
			open={kerusakan.modalDeleteVisible}
			onOk={onDelete}
			onCancel={onCancel}
			width={400}
			footer={[
				<Button
					type='primary'
					size='large'
					icon={<DeleteOutlined />}
					onClick={onDelete}
					loading={deleteLoading || kerusakanById.isLoading}
					key='hapus'
					danger
				>
					Hapus
				</Button>,
				<Button
					size='large'
					icon={<CloseOutlined />}
					onClick={onCancel}
					key='batal'
					loading={deleteLoading || kerusakanById.isLoading}
				>
					Batal
				</Button>,
			]}
			centered
		>
			<Flex style={{ padding: '10px 0' }} gap={20} vertical>
				<Skeleton loading={kerusakanById.isLoading} title={null} paragraph={{ rows: 8 }} active>
					<p style={{ margin: 0 }}>Apakah anda yakin ingin menghapus laporan kerusakan ini?</p>
					<KerusakanDetail loading={kerusakanById.isLoading} />
				</Skeleton>
			</Flex>

			{notifContext}
		</Modal>
	);
}
