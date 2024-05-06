import { useStore } from '@/states';
import * as React from 'react';

import KerusakanForm from '@/components/pages/kerusakan/KerusakanForm';
import { Form, Modal } from 'antd';

export default function KerusakanFormModal() {
	const { kerusakan, setKerusakan } = useStore();
	const [form] = Form.useForm();

	const checkFormType = React.useMemo(() => {
		if (kerusakan.formType === 'add') return { visible: kerusakan.modalAddVisible, title: 'Tambah Laporan Kerusakan' };
		if (kerusakan.formType === 'update') return { visible: kerusakan.modalUpdateVisible, title: 'Edit Laporan kerusakan' };
		return { visible: false, title: null };
	}, [kerusakan]);

	React.useEffect(() => {
		if (!['show', 'delete'].includes(kerusakan.formType) && kerusakan.selectedData) {
			form.setFieldsValue(kerusakan.selectedData);
		}
	}, [form, kerusakan]);

	const onCancel = () => {
		setKerusakan({
			modalShowVisible: false,
			modalAddVisible: false,
			modalUpdateVisible: false,
			modalDeleteVisible: false,
			selectedData: null,
			formType: 'add',
		});
		form.resetFields();
	};

	return (
		<Modal title={checkFormType.title} open={checkFormType.visible} onCancel={onCancel} width={450} footer={null} centered>
			<div style={{ paddingTop: 10 }}>
				<KerusakanForm form={form} onCancel={onCancel} />
			</div>
		</Modal>
	);
}
